<template>
  <div class="base-layout">
    <content-layout>
      <router-view />
    </content-layout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "base-layout",
})
export default class BaseLayout extends Vue {
}
</script>

<style lang="less">
html,
body {
  font-family: "LightPixel";
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #203a43;
}
.base-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>