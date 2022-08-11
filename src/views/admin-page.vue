<template>
  <div class="home-page">
    <div class="home-page-haader">
      <ui-select
        class="home-page-haader_item"
        placeholder="Выбрать"
        :items="menuOption"
        v-model="menuOptionValue"
      />
      <ui-button
        class="home-page-haader_item"
        size="medium"
        @onClick="goToHome"
      >
        На главную
      </ui-button>
    </div>
    <div class="home-page-content" v-if="menuOptionValue">
      <town-manager v-if="menuOptionValue.Id === 1" />
    </div>
  </div>
</template>

<script lang="ts">
import SelectOptionModel from "@/components/UI/ui-select/models/SelectOptionModel";
import TownManager from "@/views/components/town-manager.vue";
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
@Options({
  name: "admin-page",
  components: { TownManager },
})
export default class AdminPage extends Vue {
  menuOption: SelectOptionModel[] = [];
  menuOptionValue: SelectOptionModel = null;

  @Watch("menuOptionValue")
  onMenuOptionValue() {}

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
.home-page {
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  .home-page-haader {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 50%;
    margin-bottom: 40px;
    .home-page-haader_item {
      width: 50%;
      &.home-page-haader_item:first-child {
        margin-right: 20px;
      }
    }
  }
  .home-page-content {
    display: flex;
    flex-direction: column;
  }
}
.btn-wrapper {
  margin: 15px 0;
}
</style>
