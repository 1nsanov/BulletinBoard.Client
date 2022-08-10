<template>
  <div class="base-layout">
    <header-layout />
    <content-layout>
      <router-view />
    </content-layout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ContentLayout from "./content-layout.vue";
import HeaderLayout from "./header-layout.vue";

@Options({
  name: "base-layout",
  components: {
    ContentLayout,
    HeaderLayout,
  },
})
export default class BaseLayout extends Vue {}
</script>

<style lang="less">
html,
body {
  font-family: "Merriweather";
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #2d343f;
}
.base-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>