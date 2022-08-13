<template>
  <div class="advertisement-list">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  name: "advertisement-list",
})
export default class AdvertisementList extends Vue {}
</script>

<style lang="less" scoped>
.advertisement-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and(max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
}
</style>
