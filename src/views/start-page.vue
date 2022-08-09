<template>
  <div class="start-page">
    <ui-input v-model="username" />
    <ui-input v-model="password" />
    <div class="start-page_register">
      <ui-button size="big" @onClick="SingUp">Registration</ui-button>
    </div>
    <div class="start-page_login">
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
  name: "start-page",
})
export default class StartPage extends Vue {
  username: string = "";
  password: string = "";

  async created() {}

  async SingUp() {
    var request = new SingUpReqeust({
      userName: this.username,
      password: this.password,
    });
    await this.$api.AuthService.SingUpAsync(request)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
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
.start-page {
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  .start-page_register {
    margin: 0 0 35px 0;
  }
}
</style>
