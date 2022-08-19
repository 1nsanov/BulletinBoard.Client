<template>
  <router-view />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class AppComponent extends Vue {
  created() {
    this.$api.AuthService.getUserFromCookie();
    if (this.$api.AuthService.IsLogin) {
      this.$api.AuthService.SingIn({
        userName: this.$api.AuthService.User.userName,
        password: this.$api.AuthService.User.password,
      });
    }
  }
}
</script>

<style lang="less">
@import url("./assets/reset.css");
</style>
