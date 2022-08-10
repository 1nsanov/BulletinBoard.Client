<template>
  <div class="home-page">
    {{ $api.AuthService.IsLogin }}
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
    accusantium porro officia in fugiat dolores, exercitationem pariatur, odio
    distinctio adipisci molestiae odit nemo suscipit inventore recusandae quos
    corrupti nam laudantium!
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  name: "home-page",
})
export default class HomePage extends Vue {
  created() {
    this.$api.AuthService.getUserFromCookie();
  }
}
</script>

<style lang="less" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  padding-top: 100px;
}
</style>
