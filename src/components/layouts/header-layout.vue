<template>
  <div class="header">
    <div class="header_main _container" v-if="!isAuthorization">
      <div class="header_main_auth">
        <img src="@/assets/icons/door-enter.svg" alt="" />
      </div>
      <div class="header_main_content">
        <div class="wrapper-filters" v-if="!isAdminPage">
          <dropdown-header-filter :items="towns" @select="selectTown" />
          <dropdown-header-filter :items="categories" />
          <dropdown-header-filter :items="subCategories" />
        </div>
      </div>
      <div class="header_main_auth" @click="goToAuth">
        <img src="@/assets/icons/door-enter.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import OptionModel from "../UI/dropdown-haeder-filter/models/OptionModel";

@Options({
  name: "header-layout",
})
export default class HeaderLayout extends Vue {
  towns: Array<OptionModel> = [];
  categories: Array<OptionModel> = [];
  subCategories: Array<OptionModel> = [];

  created() {
    this.GetAllTown();
  }

  async GetAllTown() {
    await this.$api.TownService.GetAllTown().then((res) => {
      if (res.isSuccess)
        this.towns = res.value.map(
          (x, i) => new OptionModel({ Id: x.id, Name: x.name, IsActive: false })
        );
    });
  }

  selectTown(town: OptionModel) {
    console.log(town);
  }

  goToAuth() {
    this.$api.AuthService.removeUserFromCookie();
    this.$router.push({ name: "auth" });
  }

  get isAuthorization() {
    return this.$route.name === "auth";
  }

  get isAdminPage(){
    return this.$route.name === "admin";
  }
}
</script>

<style lang="less">
.header {
  width: 100%;
  ._container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header_main {
    height: 100px;
    background: #2d343f;
    box-shadow: 0px 2px 100px 10px rgba(0, 0, 0, 0.4);
    @media screen and (max-width: 994px) {
      height: 75px;
    }
    .header_main_content {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      max-width: calc(994px + 30px);
      @media screen and (max-width: 994px) {
        padding: 0 15px;
        max-width: calc(994px + 15px);
      }
      .wrapper-filters{
        display: flex;
        width: 100%;
        height: 100%;
      }
    }
    .header_main_auth {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 50px;
      height: 100%;
      margin: 0 10px;
      img {
        width: 40px;
        transition: 0.3s ease-in-out;
      }
    }
    .header_main_auth:hover {
      img {
        transform: scale(1.2);
      }
    }
  }
}
</style>