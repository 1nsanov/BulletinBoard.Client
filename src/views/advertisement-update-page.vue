<template>
  <div class="advertisement-update-page">
    <div class="title-page">Создание объявления</div>
    <div class="label-header">
      <div class="label-header-image">
        <ui-preview-image size="200px" />
        <ui-input-image />
      </div>
      <div class="label-header-inputs">
        <ui-input label="Заголовок" />
        <ui-input label="Номер телефона" />
        <ui-input type="number" label="Цена" />
      </div>
    </div>
    <div class="label-body">
      <div class="label-body-inputs">
        <ui-textarea label="Описание" />
      </div>
      <div class="label-body-selects">
        <ui-select label="Город" />
        <ui-select label="Категория" />
        <ui-select label="Подкатегория" />
      </div>
    </div>
    <div class="label-footer">
      <ui-button size="big" color="green"> Создать </ui-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AdvertisementModel from "../models/AdvertisementModel";
@Options({
  name: "advertisement-update-page",
})
export default class AdvertisementUpdatePage extends Vue {
  Advertisement: AdvertisementModel = new AdvertisementModel();

  created() {}

  async CreateAdvertisement() {
    // await this.$api.AdvertisementService.CreateAdvertisement({
    // })
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
    margin-bottom: 30px;
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
