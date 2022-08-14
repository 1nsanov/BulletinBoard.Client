<template>
  <div class="advertisement-detail-page">
    <div class="stopper" v-if="!advertisement">Загрузка...</div>
    <div class="content" v-else>
      <div class="label-header">
        <div class="label-header-left">
          <ui-preview-image size="200px" :image="advertisement.imageUrl" />
        </div>
        <div class="label-header-right">
          <div class="label-header-right-title">{{ advertisement.title }}</div>
          <div class="label-header-right-phone">
            <span>Ном. тел.:</span> {{ advertisement.phoneNumber }}
          </div>
          <div class="label-header-right-price">
            Цена:
            <span>{{ advertisement.price }}$</span>
          </div>
        </div>
      </div>
      <div class="label-body">
        <div class="label-body-description">
          <div class="label-body-description-title">Описание:</div>
          <div class="label-body-description-body">
            {{ advertisement.description }}
          </div>
        </div>
        <div class="label-body-tags">
          <div class="label-body-tags-title">Метки:</div>
          <div class="label-body-tags-body">{{ tags }}</div>
        </div>
      </div>
      <div class="label-footer" v-if="isMyAdvert">
        <ui-button class="footer-btn" size="medium" @onClick="goToUpdate">
          Редактировать
        </ui-button>
        <ui-button
          class="footer-btn"
          size="medium"
          color="red"
          @onClick="remove"
        >
          Удалить
        </ui-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AdvertisementItemDetailModel from "@/api/services/AdvertisementService/models/AdvertisementItemDetailModel";
import { Options, Vue } from "vue-class-component";
@Options({
  name: "advertisement-detail-page",
})
export default class AdvertisementDetailPage extends Vue {
  advertisement: AdvertisementItemDetailModel = null;

  async created() {
    var id = parseInt(this.$route.params.id.toString());
    if (!id) return;

    await this.$api.AdvertisementService.GetAdvertisementDetail({
      id: id,
    }).then((res) => {
      this.advertisement = res.value;
    });
  }

  goToUpdate() {
    this.$router.push({
      name: "advertisement-update",
      params: {
        id: this.advertisement.id.toString(),
      },
    });
  }

  remove() {
    this.$api.AdvertisementService.RemoveAdvertisement({
      id: this.advertisement.id,
    }).then((res) => {
      if (res.isSuccess) {
        alert("Объявление успешно удалено");
        this.$router.push({ name: "home" });
      }
    });
  }

  get isMyAdvert(): boolean {
    return this.$api.AuthService.IsLogin
      ? this.$api.AuthService.User.id === this.advertisement.userId
      : false;
  }

  get tags(): string {
    return `${this.advertisement.townName}  |  ${
      this.advertisement.categoryName
    } ${
      !!this.advertisement.subCategoryName
        ? " | " + this.advertisement.subCategoryName
        : ""
    }`;
  }
}
</script>

<style lang="less" scoped>
.advertisement-detail-page {
  .content {
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    padding-bottom: 30px;
    gap: 30px;
    .label-header {
      display: flex;
      align-items: center;
      gap: 20px;
      .label-header-left {
        display: flex;
        flex-direction: column;
        width: 33%;
        gap: 10px;
      }
      .label-header-right {
        display: flex;
        flex-direction: column;
        width: 67.333%;
        gap: 20px;
        align-self: start;
        .label-header-right-title {
          font-size: 40px;
          line-height: 50px;
          font-weight: 700;
        }
        .label-header-right-phone {
          font-size: 20px;
          line-height: 20px;
          span {
            text-decoration: underline;
          }
        }
        .label-header-right-price {
          font-size: 18px;
          span {
            font-weight: 700;
          }
        }
      }
      @media screen and (max-width: 767px) {
        .label-header-left,
        .label-header-right {
          width: 50%;
        }
      }
      @media screen and (max-width: 499px) {
        flex-direction: column;
        .label-header-left,
        .label-header-right {
          width: 100%;
        }
        .label-header-left {
          align-items: center;
        }
      }
    }
    .label-body {
      display: flex;
      flex-direction: column;
      gap: 30px;
      .label-body-description {
        width: 100%;
        .label-body-description-title {
          font-size: 30px;
          line-height: 30px;
          margin: 0 0 20px 0;
        }
        .label-body-description-body {
        }
      }
      .label-body-tags {
        .label-body-tags-title {
          font-weight: 600;
          font-size: 20px;
          line-height: 20px;
          margin-bottom: 10px;
        }
        .label-body-tags-body {
          font-size: 14px;
          line-height: 14px;
          letter-spacing: 1.1px;
        }
      }
    }
    .label-footer {
      width: 100%;
      display: flex;
      gap: 20px;
      @media screen and (max-width: 767px) {
        flex-direction: column;
      }
      .footer-btn {
        width: 100%;
      }
    }
  }
}
</style>
