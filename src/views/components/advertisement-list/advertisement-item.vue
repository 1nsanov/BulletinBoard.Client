<template>
  <div class="advertisement-item" @click="select">
    <div class="content">
      <div class="content_image">
        <ui-preview-image size="75px" :image="item.imageUrl" />
      </div>
      <div class="content_body">
        <div class="content_body_title">
          {{ item.title }}
        </div>
        <div class="content_body_price">{{ item.price }}$</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AdvertisementListItemModel from "@/api/services/AdvertisementService/models/AdvertisementListItemModel";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Options({
  name: "advertisement-item",
})
export default class AdvertisementItem extends Vue {
  @Prop({ default: null }) item: AdvertisementListItemModel;

  select() {
    this.$emit("select", this.item.id);
  }
}
</script>

<style lang="less" scoped>
.advertisement-item {
  display: flex;
  border-radius: 20px;
  color: #fff;
  border: 3px solid #fff;
  background: rgb(51, 52, 61);
  padding: 15px;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  &:hover {
    color: rgb(51, 52, 61);
    border-color: rgb(51, 52, 61);
    background: #fff;
  }
  .content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 10px;
    .content_image {
      align-self: center;
    }
    .content_body {
      display: flex;
      flex-direction: column;
      align-items: end;
      justify-content: space-between;
      width: 70%;
      .content_body_title {
        font-size: 20px;
        font-weight: 700;
        text-align: right;
        margin-bottom: 15px;
      }
      .content_body_price {
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
}
</style>
