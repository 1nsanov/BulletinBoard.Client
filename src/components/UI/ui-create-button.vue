<template>
  <div class="ui-create-button">
    <div class="create-btn_container" @click="goToCreateAdvertisement">
      <div class="create-btn-content">Создать объявление</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "ui-create-button",
})
export default class UiCreateButton extends Vue {
  goToCreateAdvertisement() {
    this.$router.push({ name: "advertisement-update" });
  }
}
</script>

<style lang="less" scoped>
.ui-create-button {
  .create-btn_container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 100%;
    border: 5px solid #fff;
    border-radius: 20px;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    .create-btn-content {
      font-size: 24px;
      font-weight: 700;
      transition: 0.3s ease-in-out;
    }
    &:hover {
      border-color: rgb(18, 215, 77);
      .create-btn-content {
        color: rgb(18, 215, 77);
      }
    }
  }
}
</style>