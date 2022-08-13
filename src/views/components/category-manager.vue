<template>
  <div class="categories-label">
    <ui-select
      :placeholder="!!categoryItems ? 'Выбрать категорию' : 'Загрузка...'"
      :items="categoryItems"
      v-model="valueCategory"
    />
    <ui-select
      :placeholder="subCategoryItems.length > 0 ? 'Выбрать категорию' : '-'"
      :items="subCategoryItems"
      v-model="valueSubCategory"
    />
  </div>
  <!-- Создание начало -->
  <div class="categories-label">
    <div class="categories-label-item">
      <ui-input label="Создание" v-model="nameCreatedCategory" />
    </div>
    <div class="categories-label-item">
      <ui-input
        label="Создание"
        v-model="nameCreatedSubCategory"
        :readonly="!valueCategory"
      />
    </div>
  </div>

  <div class="categories-label">
    <div class="categories-label-item df">
      <ui-preview-image :image="imgCreatedCategory" />
      <ui-input-image @loadImage="loadImageCreateCategory" />
    </div>
    <div class="categories-label-item df">
      <ui-preview-image :image="imgCreatedSubCategory" />
      <ui-input-image
        v-if="valueCategory"
        @loadImage="loadImageCreateSubCategory"
      />
    </div>
  </div>

  <div class="categories-label">
    <div class="categories-label-item">
      <ui-button
        color="green"
        @onClick="CreateCategory"
        :isLoading="isLoadCreateCategory"
      >
        Создать
      </ui-button>
    </div>
    <div class="categories-label-item">
      <ui-button
        color="green"
        @onClick="CreateSubCategory"
        :isLoading="isLoadCreateSubCategory"
        :disabled="!valueCategory"
      >
        Создать
      </ui-button>
    </div>
  </div>
  <!-- Создание конец -->

  <!-- Редактирование начало -->
  <div class="categories-label">
    <div class="categories-label-item">
      <ui-input label="Редактирование" v-model="updatedCategory.Name" />
    </div>
    <div class="categories-label-item">
      <ui-input
        label="Редактирование"
        v-model="updatedSubCategory.Name"
        :readonly="!valueSubCategory"
      />
    </div>
  </div>

  <div class="categories-label">
    <div class="categories-label-item df">
      <ui-preview-image :image="updatedCategory.Image" />
      <ui-input-image
        @loadImage="loadImageUpdatedCategory"
        v-if="valueCategory"
      />
    </div>
    <div class="categories-label-item df">
      <ui-preview-image :image="updatedSubCategory.Image" />
      <ui-input-image
        @loadImage="loadImageUpdatedSubCategory"
        v-if="valueSubCategory"
      />
    </div>
  </div>

  <div class="categories-label">
    <div class="categories-label-item">
      <ui-button
        @onClick="UpdateCategory"
        :isLoading="isLoadUpdatedCategory"
        :disabled="!valueCategory"
        >Редактировать</ui-button
      >
    </div>
    <div class="categories-label-item">
      <ui-button
        @onClick="UpdateSubCategory"
        :isLoading="isLoadUpdatedSubCategory"
        :disabled="!valueSubCategory"
        >Редактировать</ui-button
      >
    </div>
  </div>
  <!-- Редактирование конец -->

  <!-- Удаление начало -->
  <div class="categories-label">
    <div class="categories-label-item">
      <ui-button
        color="red"
        :disabled="!valueCategory"
        :isLoading="isLoadRemovedCategory"
        @onClick="RemoveCategory"
        >Удалить</ui-button
      >
    </div>
    <div class="categories-label-item">
      <ui-button
        color="red"
        :disabled="!valueSubCategory"
        :isLoading="isLoadRemovedSubCategory"
        @onClick="RemoveSubCategory"
        >Удалить</ui-button
      >
    </div>
  </div>
  <!-- Удаление конец -->
</template>

<script lang="ts">
import BaseResponse from "@/api/models/BaseResponse";
import GetAllCategoryResponse from "@/api/services/CategoryService/models/Response/GetAllCategoryResponse";
import SelectOptionModel from "@/components/UI/ui-select/models/SelectOptionModel";
import SelectedCategoryModel from "@/models/SelectedCategoryModel";
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
@Options({
  name: "category-manager",
})
export default class CategoryManager extends Vue {
  categoriesData: GetAllCategoryResponse[] = [];
  categoryItems: SelectOptionModel[] = [];
  valueCategory: SelectOptionModel = null;
  subCategoryItems: SelectOptionModel[] = [];
  valueSubCategory: SelectOptionModel = null;

  currentItem: GetAllCategoryResponse = null;

  nameCreatedCategory: string = "";
  imgCreatedCategory: string = null;

  nameCreatedSubCategory: string = "";
  imgCreatedSubCategory: string = null;

  updatedCategory: SelectedCategoryModel = new SelectedCategoryModel();
  updatedSubCategory: SelectedCategoryModel = new SelectedCategoryModel();

  isLoadCreateCategory: boolean = false;
  isLoadCreateSubCategory: boolean = false;
  isLoadUpdatedCategory: boolean = false;
  isLoadUpdatedSubCategory: boolean = false;
  isLoadRemovedCategory: boolean = false;
  isLoadRemovedSubCategory: boolean = false;

  @Watch("valueCategory", { deep: true })
  onValueTown() {
    if (!this.valueCategory) return;
    this.currentItem = this.categoriesData.find(
      (x) => x.id === this.valueCategory.Id
    );
    console.log(this.currentItem);

    this.setSubCategoryItem();

    this.updatedCategory = new SelectedCategoryModel({
      Id: this.currentItem.id,
      Name: this.currentItem.name,
      Image: this.currentItem.imageUrl,
    });
  }

  @Watch("valueSubCategory", { deep: true })
  onValueSubCategory() {
    if (!this.currentItem) return;
    var targetId = this.valueSubCategory ? this.valueSubCategory.Id : 0;
    var currentSubItem = this.currentItem.subCategories.find(
      (x) => x.id === targetId
    );

    if (currentSubItem) {
      this.updatedSubCategory = new SelectedCategoryModel({
        Id: currentSubItem.id,
        Name: currentSubItem.name,
        Image: currentSubItem.imageUrl,
        ParentId: this.currentItem.id,
      });
    } else {
      this.updatedSubCategory = new SelectedCategoryModel();
    }
  }

  created() {
    this.GetAllCategory();
  }

  setSubCategoryItem() {
    if (this.currentItem && this.currentItem.subCategories) {
      this.subCategoryItems = this.currentItem.subCategories.map((x, i) => {
        return new SelectOptionModel(x.id, x.name);
      });
    }
  }

  async GetAllCategory() {
    await this.$api.CategoryService.GetAllCategory().then((res) => {
      if (res.isSuccess) {
        this.categoriesData = res.value;
        console.log(this.categoriesData);
        this.categoryItems = res.value.map((x, i) => {
          return new SelectOptionModel(x.id, x.name);
        });
      }
    });
  }

  async CreateCategory() {
    if (this.nameCreatedCategory.length === 0) {
      alert("Пустое поле ввода новой категории");
      return;
    }
    this.isLoadCreateCategory = true;
    await this.$api.CategoryService.CreateCategory({
      Name: this.nameCreatedCategory,
      ImageUrl: this.imgCreatedCategory,
    }).then((res) => {
      this.checkedSuccess(res, "Категория успешно добавлена");
    });
    this.isLoadCreateCategory = false;
    this.imgCreatedCategory = null;
    this.nameCreatedCategory = "";
  }

  async CreateSubCategory() {
    if (this.nameCreatedSubCategory.length === 0) {
      alert("Пустое поле ввода новой подкатегории");
      return;
    }
    this.isLoadCreateSubCategory = true;
    await this.$api.CategoryService.CreateCategory({
      Name: this.nameCreatedSubCategory,
      ImageUrl: this.imgCreatedSubCategory,
      ParentId: this.valueCategory.Id,
    }).then((res) => {
      this.checkedSuccess(res, "Подкатегория успешно добавлена");
    });
    this.isLoadCreateSubCategory = false;
    this.imgCreatedSubCategory = null;
    this.nameCreatedSubCategory = "";
  }

  async UpdateCategory() {
    if (this.updatedCategory.Name.length === 0) {
      alert("Пустое поле ввода названия категории");
      return;
    }
    this.isLoadUpdatedCategory = true;
    await this.$api.CategoryService.UpdateCategory({
      id: this.updatedCategory.Id,
      name: this.updatedCategory.Name,
      imageUrl: this.updatedCategory.Image,
    }).then((res) => {
      this.checkedSuccess(res, "Категория успешно обновлена");
    });
    this.isLoadUpdatedCategory = false;
  }

  async UpdateSubCategory() {
    if (this.updatedSubCategory.Name.length === 0) {
      alert("Пустое поле ввода названия категории");
      return;
    }
    this.isLoadUpdatedSubCategory = true;
    await this.$api.CategoryService.UpdateCategory({
      id: this.updatedSubCategory.Id,
      name: this.updatedSubCategory.Name,
      imageUrl: this.updatedSubCategory.Image,
      parentId: this.updatedSubCategory.ParentId,
    }).then((res) => {
      this.checkedSuccess(res, "Подкатегория успешно обновлена");
    });
    this.isLoadUpdatedSubCategory = false;
    this.valueSubCategory = null;
  }

  async RemoveCategory() {
    this.isLoadRemovedCategory = true;
    await this.$api.CategoryService.RemoveCategory({
      id: this.updatedCategory.Id,
    }).then((res) => {
      this.checkedSuccess(res, "Категория успешно удалена");
    });
    this.isLoadRemovedCategory = false;
  }

  async RemoveSubCategory() {
    this.isLoadRemovedSubCategory = true;
    await this.$api.CategoryService.RemoveCategory({
      id: this.updatedSubCategory.Id,
      parentId: this.updatedCategory.Id,
    }).then((res) => {
      this.checkedSuccess(res, "Подкатегория успешно удалена");
    });
    this.isLoadRemovedSubCategory = false;
  }

  loadImageCreateCategory(img: any) {
    this.imgCreatedCategory = img;
  }
  loadImageCreateSubCategory(img: string) {
    this.imgCreatedSubCategory = img;
  }
  loadImageUpdatedCategory(img: string) {
    this.updatedCategory.Image = img;
  }
  loadImageUpdatedSubCategory(img: string) {
    this.updatedSubCategory.Image = img;
  }

  checkedSuccess(res: BaseResponse, msg: string) {
    console.log(res);
    if (res.isSuccess) {
      alert(msg);
      this.GetAllCategory();
      this.updatedCategory = new SelectedCategoryModel();
      this.updatedSubCategory  = new SelectedCategoryModel();
      this.subCategoryItems = [];
    } else {
      alert(res.message);
    }
  }
}
</script>

<style lang="less" scoped>
.categories-label {
  width: 100%;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.categories-label-item {
  width: 100%;
  .base-button {
    width: 100% !important;
  }
}
.df {
  display: flex;
  align-items: center;
}
</style>
