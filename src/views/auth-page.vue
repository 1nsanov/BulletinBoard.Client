<template>
  <div class="auth-page">
    <ui-input v-model="username" />
    <ui-input v-model="password" />
    <div class="auth-page_register">
      <ui-button size="big" @onClick="SingUp">Registration</ui-button>
    </div>
    <div class="auth-page_login">
      <ui-button color="green" size="big" @onClick="SingIn">Login</ui-button>
    </div>
    <ui-button size="medium" @onClick="Recovery">Recovery</ui-button>
  </div>
</template>

<script lang="ts">
import SingInReqeust from "@/api/services/AuthService/models/Request/SingInReqeust";
import SingUpReqeust from "@/api/services/AuthService/models/Request/SingUpReqeust";
import { Options, Vue } from "vue-class-component";
@Options({
  name: "auth-page",
})
export default class AuthPage extends Vue {
  username: string = "";
  password: string = "";

  async created() {
  }

  async SingUp() {
    var request = new SingUpReqeust({
      userName: this.username,
      password: this.password,
    });
    await this.$api.AuthService.SingUpAsync(request).then((res) => {
      console.log(res);
    });
  }

  async SingIn() {
    var request = new SingInReqeust({
      userName: this.username,
      password: this.password,
    });
    await this.$api.AuthService.SingInAsync(request).then((res) => {
      this.$api.AuthService.User = res.value;
      console.log(this.$api.AuthService.User);
    });
  }

  async Recovery() {
    let isExistUser: boolean = false;
    await this.$api.AuthService.CheckExistUser({
      userName: this.username,
    }).then((res) => {
      isExistUser = res.isSuccess;
      console.log(res);
    });

    if (!isExistUser) return;

    await this.RecoveryPassword();
  }

  async RecoveryPassword() {
    await this.$api.AuthService.RecoveryPassword({
      userName: this.username,
      password: this.password,
    }).then((res) => {
      console.log(res);
    });
  }
}
</script>

<style lang="less" scoped>
.auth-page {
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  .auth-page_register {
    margin: 0 0 35px 0;
  }
}
</style>
