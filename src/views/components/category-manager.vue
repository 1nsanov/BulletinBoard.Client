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
      v-model="subValueCategory"
    />
  </div>
  <div class="categories-label">
    <div class="categories-label-item"><ui-input label="Создание" /></div>
    <div class="categories-label-item">
      <ui-input label="Создание" :readonly="!valueCategory" />
    </div>
  </div>

  <div class="categories-label">
    <div class="categories-label-item df">
      <ui-preview-image :image="imgCreateCategory.SrcUrl" />
      <ui-input-image @loadImage="loadImageCreateCategory" />
    </div>
    <div class="categories-label-item df">
      <ui-preview-image :image="imgCreateSubCategory.SrcUrl" />
      <ui-input-image @loadImage="loadImageCreateSubCategory" />
    </div>
  </div>

  <div class="categories-label">
    <div class="categories-label-item">
      <ui-button color="green">Создать</ui-button>
    </div>
    <div class="categories-label-item">
      <ui-button color="green">Создать</ui-button>
    </div>
  </div>

  <div class="categories-label">
    <div class="categories-label-item"><ui-input label="Редактирование" /></div>
    <div class="categories-label-item"><ui-input label="Редактирование" /></div>
  </div>

  <div class="categories-label">
    <div class="categories-label-item">
      <ui-button>Редактировать</ui-button>
    </div>
    <div class="categories-label-item">
      <ui-button>Редактировать</ui-button>
    </div>
  </div>

  <div class="categories-label">
    <div class="categories-label-item">
      <ui-button color="red">Удалить</ui-button>
    </div>
    <div class="categories-label-item">
      <ui-button color="red">Удалить</ui-button>
    </div>
  </div>

  <!-- <ui-input label="Создание" placeholder="..." v-model="inputCreate" />
  <ui-button
    class="btn-wrapper"
    color="green"
    :isLoading="isLoadCreate"
    @onClick="CreateTown"
  >
    Создать
  </ui-button>
  <ui-input label="Редактирование" placeholder="..." v-model="inputEdit" />
  <ui-button
    class="btn-wrapper"
    color="default"
    :isLoading="isLoadEdit"
    @onClick="UpdateTown"
  >
    Редактировать
  </ui-button>
  <ui-button
    class="btn-wrapper"
    color="red"
    :isLoading="isLoadRemove"
    @onClick="RemoveTown"
  >
    Удалить
  </ui-button> -->
</template>

<script lang="ts">
import GetAllCategoryResponse from "@/api/services/CategoryService/models/Response/GetAllCategoryResponse";
import InputImageModel from "@/components/UI/ui-input-image/models/InputImageModel";
import SelectOptionModel from "@/components/UI/ui-select/models/SelectOptionModel";
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
  subValueCategory: SelectOptionModel = null;

  inputCreate: string = "";
  inputEdit: string = "";

  isLoadCreate: boolean = false;
  isLoadEdit: boolean = false;
  isLoadRemove: boolean = false;

  imgCreateCategory: InputImageModel = new InputImageModel();
  imgCreateSubCategory: InputImageModel = new InputImageModel();

  @Watch("valueCategory")
  onValueTown() {
    if (!this.valueCategory) return;
    let items = this.categoriesData.find((x) => x.id === this.valueCategory.Id);
    console.log(items);
    if (items && items.subCategories) {
      this.subCategoryItems = items.subCategories.map((x, i) => {
        return new SelectOptionModel(x.id, x.name);
      });
    }
  }

  created() {
    this.GetAllCategory();
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

  loadImageCreateCategory(img: InputImageModel) {
    this.imgCreateCategory = img;
  }
  loadImageCreateSubCategory(img: InputImageModel) {
    this.imgCreateSubCategory = img;
  }

  // async CreateTown() {
  //   if (this.inputCreate.length === 0) {
  //     alert("Пустое поле ввода нового города");
  //     return;
  //   }
  //   this.isLoadCreate = true;
  //   await this.$api.TownService.AddTown({ name: this.inputCreate }).then(
  //     (res) => {
  //       if (res.isSuccess) {
  //         this.GetAllTown();
  //         alert("Город успешно добавлен.");
  //       } else alert(res.message);
  //     }
  //   );
  //   this.isLoadCreate = false;
  //   this.inputCreate = "";
  // }

  // async UpdateTown() {
  //   if (this.inputEdit.length === 0 || !this.valueTown) {
  //     alert("Пустое поле ввода редактирования");
  //     this.onValueTown();
  //     return;
  //   }

  //   this.isLoadEdit = true;
  //   await this.$api.TownService.UpdateTown({
  //     id: this.valueTown.Id,
  //     name: this.inputEdit,
  //   }).then((res) => {
  //     if (res.isSuccess) {
  //       this.GetAllTown();
  //       alert("Город успешно обновлен.");
  //     } else {
  //       alert(res.message);
  //       this.onValueTown();
  //     }
  //   });
  //   this.isLoadEdit = false;

  //   this.inputEdit = "";
  // }

  // async RemoveTown() {
  //   if (!this.valueTown) {
  //     alert("Город не выбран");
  //     return;
  //   }

  //   this.isLoadRemove = true;
  //   await this.$api.TownService.RemoveTown({ id: this.valueTown.Id }).then(
  //     (res) => {
  //       if (res.isSuccess) {
  //         this.GetAllTown();
  //         alert("Город успешно удален.");
  //       } else {
  //         alert(res.message);
  //         this.onValueTown();
  //       }
  //     }
  //   );
  //   this.isLoadRemove = false;
  // }
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
