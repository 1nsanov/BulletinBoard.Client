<template>
  <div class="advertisement-update-page">
    <div class="title-page">Создание объявления</div>
    <div class="label-header">
      <div class="label-header-image">
        <ui-preview-image size="200px" :image="advertisement.imageUrl" />
        <ui-input-image @loadImage="loadImage" />
      </div>
      <div class="label-header-inputs">
        <ui-input label="Заголовок*" v-model="advertisement.title" />
        <ui-input
          label="Номер телефона*"
          placeholder="(123) 456-7890"
          :isError="errorPhone"
          @focus="errorPhone = false"
          v-model="advertisement.phoneNumber"
        />
        <ui-input type="number" label="Цена*" v-model="advertisement.price" />
      </div>
    </div>
    <div class="label-body">
      <div class="label-body-inputs">
        <ui-textarea label="Описание*" v-model="advertisement.description" />
      </div>
      <div class="label-body-selects">
        <ui-select
          label="Город*"
          placeholder="Выбрать город"
          :items="townItems"
          v-model="valueTown"
        />
        <ui-select
          label="Категория*"
          placeholder="Выбрать категорию"
          :items="categoryItems"
          v-model="valueCategory"
        />
        <ui-select
          label="Подкатегория"
          :placeholder="
            subCategoryItems.length > 0 ? 'Выбрать подкатегорию' : '-'
          "
          :items="subCategoryItems"
          v-model="valueSubCategory"
        />
      </div>
    </div>
    <div class="label-footer">
      <ui-button size="big" color="green" @onClick="CreateAdvertisement">
        Создать
      </ui-button>
    </div>
  </div>
</template>

<script lang="ts">
import GetAllCategoryResponse from "@/api/services/CategoryService/models/Response/GetAllCategoryResponse";
import SelectOptionModel from "@/components/UI/ui-select/models/SelectOptionModel";
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import AdvertisementModel from "../models/AdvertisementModel";
@Options({
  name: "advertisement-update-page",
})
export default class AdvertisementUpdatePage extends Vue {
  advertisement: AdvertisementModel = new AdvertisementModel();

  categoriesData: GetAllCategoryResponse[] = [];
  townItems: SelectOptionModel[] = [];
  valueTown: SelectOptionModel = null;
  categoryItems: SelectOptionModel[] = [];
  valueCategory: SelectOptionModel = null;
  subCategoryItems: SelectOptionModel[] = [];
  valueSubCategory: SelectOptionModel = null;

  errorPhone: boolean = false;

  // @Watch("advertisement", { deep: true })
  // onAdvertisement() {
  //   console.log(this.advertisement);
  // }

  @Watch("valueTown", { deep: true })
  onValueTown() {
    this.advertisement.townId = this.valueTown ? this.valueTown.Id : null;
  }

  @Watch("valueCategory", { deep: true })
  onValueCategory() {
    if (this.valueCategory) this.setSubCategoryItem();
    this.advertisement.categoryId = this.valueCategory
      ? this.valueCategory.Id
      : null;
  }
  @Watch("valueSubCategory", { deep: true })
  onValueSubCategory() {
    console.log(this.valueSubCategory);
    this.advertisement.categoryId = this.valueSubCategory
      ? this.valueSubCategory.Id
      : null;
  }

  created() {
    this.GetAllTown();
    this.GetAllCategory();
  }

  setSubCategoryItem() {
    var currentItem = this.categoriesData.find(
      (x) => x.id === this.valueCategory.Id
    );
    if (currentItem && currentItem.subCategories) {
      this.subCategoryItems = currentItem.subCategories.map((x, i) => {
        return new SelectOptionModel(x.id, x.name);
      });
    }
  }

  loadImage(img: string) {
    this.advertisement.imageUrl = img;
  }

  async CreateAdvertisement() {
    this.advertisement.userId = this.$api.AuthService.User.id;
    var valid = this.validation();
    if (!valid) {
      alert("Заполнены не все поля");
      return;
    }
    console.log(this.advertisement);
    await this.$api.AdvertisementService.CreateAdvertisement({
      title: this.advertisement.title,
      description: this.advertisement.title,
      phoneNumber: this.advertisement.phoneNumber,
      price: this.advertisement.price,
      userId: this.advertisement.userId,
      categoryId: this.advertisement.categoryId,
      townId: this.advertisement.townId,
      imageUrl: this.advertisement.imageUrl,
      subCategoryId: this.advertisement.subCategoryId,
    }).then((res) => {
      if (res.isSuccess) {
        alert("Объявление успешно создано");
        this.$router.push({ name: "home" });
      } else alert(res.message);
    });
  }

  async GetAllTown() {
    await this.$api.TownService.GetAllTown().then((res) => {
      if (res.isSuccess)
        this.townItems = res.value.map(
          (x, i) => new SelectOptionModel(x.id, x.name)
        );
    });
  }

  async GetAllCategory() {
    await this.$api.CategoryService.GetAllCategory().then((res) => {
      if (res.isSuccess) {
        this.categoriesData = res.value;
        this.categoryItems = res.value.map((x, i) => {
          return new SelectOptionModel(x.id, x.name);
        });
      }
    });
  }

  validation() {
    var regexPhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    var adv = this.advertisement;
    var validPhone = regexPhone.test(adv.phoneNumber);
    if (!validPhone) this.errorPhone = true;

    return (
      !!adv.title &&
      !!adv.description &&
      validPhone &&
      !!adv.price &&
      !!adv.userId &&
      !!adv.categoryId &&
      !!adv.townId
    );
  }
}
</script>

<style lang="less" scoped>
.advertisement-update-page {
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  padding-bottom: 30px;
  gap: 30px;
  .title-page {
    width: 100%;
    text-align: center;
    font-size: 30px;
    line-height: 40px;
    font-weight: 700;
  }
  .label-header {
    display: flex;
    align-items: center;
    .label-header-image {
      display: flex;
      flex-direction: column;
      width: 33%;
      gap: 10px;
    }
    .label-header-inputs {
      width: 67.333%;
    }
    @media screen and (max-width: 767px) {
      .label-header-image,
      .label-header-inputs {
        width: 50%;
      }
    }
    @media screen and (max-width: 499px) {
      flex-direction: column;
      .label-header-image,
      .label-header-inputs {
        width: 100%;
      }
      .label-header-image {
        align-items: center;
      }
    }
  }
  .label-body {
    display: flex;
    flex-direction: column;
    gap: 30px;
    .label-body-inputs {
      width: 100%;
    }
    .label-body-selects {
      display: flex;
      gap: 10px;
      @media screen and (max-width: 767px) {
        flex-direction: column;
      }
    }
  }
  .label-footer {
    display: flex;
    flex-direction: column;
  }
}
</style>
