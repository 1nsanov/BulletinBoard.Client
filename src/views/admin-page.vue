<template>
  <div class="admin-page">
    <div class="admin-page-haader">
      <ui-select
        class="admin-page-haader_item"
        placeholder="Выбрать"
        :items="menuOption"
        v-model="menuOptionValue"
      />
      <ui-button
        class="admin-page-haader_item"
        size="medium"
        @onClick="goToHome"
      >
        На главную
      </ui-button>
    </div>
    <div class="admin-page-content" v-if="menuOptionValue">
      <town-manager v-if="menuOptionValue.Id === 1" />
      <category-manager v-if="menuOptionValue.Id === 2" />
      <advertisements v-if="menuOptionValue.Id === 3" />
    </div>
  </div>
</template>

<script lang="ts">
import SelectOptionModel from "@/components/UI/ui-select/models/SelectOptionModel";
import TownManager from "@/views/components/town-manager.vue";
import CategoryManager from "@/views/components/category-manager.vue";
import Advertisements from "./components/advertisement-list/advertisements.vue";
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
@Options({
  name: "admin-page",
  components: {
    TownManager,
    CategoryManager,
    Advertisements,
  },
})
export default class AdminPage extends Vue {
  menuOption: SelectOptionModel[] = [];
  menuOptionValue: SelectOptionModel = null;

  @Watch("menuOptionValue")
  onMenuOptionValue() {
    if (!this.menuOptionValue) return;
    switch (this.menuOptionValue.Id) {
      case 1:
        this.$router.push({ name: "town" });
        break;
      case 2:
        this.$router.push({ name: "category" });
        break;
      case 3:
        this.$router.push({ name: "advertisement" });
        break;
    }
  }

  created() {
    this.init();
  }

  init() {
    this.menuOption.push(
      new SelectOptionModel(1, "Города"),
      new SelectOptionModel(2, "Категории"),
      new SelectOptionModel(3, "Объявления")
    );
  }

  goToHome() {
    this.$router.push({ name: "home" });
  }
}
</script>

<style lang="less">
.admin-page {
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  .admin-page-haader {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 50%;
    margin-bottom: 40px;
    .admin-page-haader_item {
      width: 50%;
      &.admin-page-haader_item:first-child {
        margin-right: 20px;
      }
    }
  }
  .admin-page-content {
    display: flex;
    flex-direction: column;
  }
}
.btn-wrapper {
  margin: 15px 0;
}
</style>
