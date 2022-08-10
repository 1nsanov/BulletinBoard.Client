<template>
  <div class="auth-page">
    <auth-user
      @getData="getData"
      @swicthMode="swicthMode"
      @recovery="recovery"
      :isLogin="isLogin"
      :errMsg="errMsg"
    />
  </div>
</template>

<script lang="ts">
import SingInReqeust from "@/api/services/AuthService/models/Request/SingInReqeust";
import SingUpReqeust from "@/api/services/AuthService/models/Request/SingUpReqeust";
import AuthUser from "@/components/auth-user.vue";
import UserFormModel from "../models/UserFormModel";
import { Options, Vue } from "vue-class-component";
@Options({
  name: "auth-page",
  components: { AuthUser },
})
export default class AuthPage extends Vue {
  isLogin: boolean = true;
  errMsg: string = "";

  async SingUp(user: UserFormModel) {
    var request = new SingUpReqeust({
      userName: user.username,
      password: user.password,
    });
    await this.$api.AuthService.SingUpAsync(request).then((res) => {
      if (res.isSuccess) {
        this.SingIn(user);
      } else this.errMsg = res.message;
    });
  }

  async SingIn(user: UserFormModel) {
    var request = new SingInReqeust({
      userName: user.username,
      password: user.password,
    });
    await this.$api.AuthService.SingInAsync(request).then((res) => {
      // this.$api.AuthService.User = res.value;
      if (res.isSuccess) {
        this.$router.push({ name: "home" });
      } else this.errMsg = res.message;
    });
  }

  async RecoveryPassword(user: UserFormModel) {
    await this.$api.AuthService.RecoveryPassword({
      userName: user.username,
      password: user.password,
    }).then((res) => {
      if (res.isSuccess) {
        alert("Восстановлениие прошло успешно");
        location.reload();
      } else this.errMsg = res.message;
    });
  }

  async getData(user: UserFormModel) {
    this.errMsg = "";
    if (this.isLogin) await this.SingIn(user);
    else await this.SingUp(user);
  }

  async recovery(user: UserFormModel) {
    this.errMsg = "";
    await this.RecoveryPassword(user);
  }

  swicthMode() {
    this.errMsg = "";
    this.isLogin = !this.isLogin;
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
