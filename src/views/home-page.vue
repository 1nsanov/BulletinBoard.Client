<template>
  <div class="home-page">
    <ui-button
      v-if="$api.AuthService.IsLogin"
      color="green"
      @onClick="goToAdminPanel"
    >
      Админ панель
    </ui-button>
    <div class="home-page_create-btn">
      <div class="create-btn_container" @click="goToCreateAdvertisement">
        <div class="create-btn-content">Создать объявление</div>
      </div>
    </div>
    <div class="home-page_advertisement">
      <advertisements/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Advertisements from "./components/advertisement-list/advertisements.vue";

@Options({
  name: "home-page",
  components: { Advertisements },
})
export default class HomePage extends Vue {
  goToAdminPanel() {
    this.$router.push({ name: "admin" });
  }

  goToCreateAdvertisement() {
    this.$router.push({ name: "advertisement-update" });
  }
}
</script>

<style lang="less" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  .home-page_create-btn {
    margin: 20px 0;
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
}
</style>
