<template>
  <div class="home-page">
    <div class="home-page_title">
      Объявления
    </div>
    <div class="home-page_advertisement">
      <advertisements :isCreate="false"/>
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
export default class HomePage extends Vue {}
</script>

<style lang="less" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  .home-page_title{
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    font-weight: 700;
  }
  .home-page_advertisement {
    margin-top: 30px;
  }
}
</style>
