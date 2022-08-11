<template>
  <div class="home-page">
    <ui-button
      v-if="$api.AuthService.IsLogin"
      color="green"
      @onClick="goToAdminPanel"
    >
      Админ панель
    </ui-button>
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

  goToAdminPanel() {
    this.$router.push({ name: "admin" });
  }
}
</script>

<style lang="less" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  padding-top: 30px;
}
</style>
