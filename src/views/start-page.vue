<template>
  <div class="start-page">
    <div class="start-page_register">
      <ui-button size="big">Registration</ui-button>
    </div>
    <div class="start-page_login">
      <ui-button color="green" size="big">Login</ui-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  name: "start-page",
})
export default class StartPage extends Vue {
  get styleBtn() {
    return {
      "min-width": "0",
      height: "100px",
      width: "100%",
    };
  }

  created(){
    this.$api.AuthService.testMethod();
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
