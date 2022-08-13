<template>
  <div class="header">
    <div class="header_main _container" v-if="!isAuthorization">
      <div class="header_main_auth" @click="goToHome"> 
        <img src="@/assets/icons/door-enter.svg" alt="" />
      </div>
      <div class="header_main_content">
        <div class="wrapper-filters" v-if="isHomePage">
          <dropdown-header-filter :items="towns" @select="selectTown" />
          <dropdown-header-filter
            :items="categories"
            @select="selectCategory"
          />
          <dropdown-header-filter
            :items="subCategories"
            @select="selectSubCategory"
          />
        </div>
      </div>
      <div class="header_main_auth" @click="goToAuth">
        <img src="@/assets/icons/door-enter.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import GetAllCategoryResponse from "@/api/services/CategoryService/models/Response/GetAllCategoryResponse";
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import OptionModel from "../UI/dropdown-haeder-filter/models/OptionModel";

@Options({
  name: "header-layout",
})
export default class HeaderLayout extends Vue {
  towns: Array<OptionModel> = [];
  selectedTown: OptionModel = null;
  categories: Array<OptionModel> = [];
  selectedCategory: OptionModel = null;
  subCategories: Array<OptionModel> = [];
  selectedSubCategory: OptionModel = null;

  categoriesData: GetAllCategoryResponse[] = [];

  @Watch("isAdminPage")
  getAllData() {
    if(!this.isHomePage) return;
    this.GetAllTown();
    this.GetAllCategory();
  }

  @Watch("selectedCategory", { deep: true })
  onSelectedCategory() {
    if (!this.selectedCategory) return;

    var category = this.categoriesData.find(
      (x) => x.id === this.selectedCategory.Id
    );
    if (category && category.subCategories) {
      this.subCategories = category.subCategories.map(
        (x) => new OptionModel({ Id: x.id, Name: x.name, IsActive: false })
      );
    }
  }

  created() {
    this.getAllData();
  }

  async GetAllTown() {
    await this.$api.TownService.GetAllTown().then((res) => {
      if (res.isSuccess)
        this.towns = res.value.map(
          (x, i) => new OptionModel({ Id: x.id, Name: x.name, IsActive: false })
        );
    });
  }

  async GetAllCategory() {
    await this.$api.CategoryService.GetAllCategory().then((res) => {
      if (res.isSuccess) {
        this.categoriesData = res.value;
        this.categories = res.value.map((x, i) => {
          return new OptionModel({ Id: x.id, Name: x.name, IsActive: false });
        });
        console.log(this.categories);
      }
    });
  }

  selectTown(item: OptionModel) {
    this.selectedTown = item;
  }
  selectCategory(item: OptionModel) {
    this.selectedCategory = item;
  }
  selectSubCategory(item: OptionModel) {
    this.selectedSubCategory = item;
  }

  goToAuth() {
    this.$api.AuthService.removeUserFromCookie();
    this.$router.push({ name: "auth" });
  }

  goToHome(){
    this.$router.push({ name: "home" });
  }

  get isAuthorization() {
    return this.$route.name === "auth";
  }

  get isAdminPage() {
    return this.$route.name === "admin";
  }

  get isHomePage(){
    return this.$route.name === "home";
  }
}
</script>

<style lang="less">
.header {
  width: 100%;
  ._container {
    display: flex;
    justify-content: space-between;
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
      .wrapper-filters {
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