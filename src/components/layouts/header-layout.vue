<template>
  <div class="header">
    <div class="header_main _container">
      <div class="header_main_content">
        <dropdown-header-filter :items="towns" @select="selectTown" />
        <dropdown-header-filter :items="towns" />
        <dropdown-header-filter :items="towns" />
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

  created() {
    this.GetAllTown();
  }

  async GetAllTown() {
    await this.$api.TownService.GetAllTown().then((res) => {
      if (res.isSuccess)
        this.towns = res.value.map(
          (x, i) =>
            new OptionModel({ Id: x.id, Name: x.name, IsActive: i === 0 })
        );
    });
  }

  selectTown(town: OptionModel) {
    console.log(town);
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
    }
  }
}
</style>