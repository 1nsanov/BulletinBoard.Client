<template>
  <div class="personal-cabinet-page">
    <div class="personal-cabinet-title">
      Личный кабинет.
      <br />
      Добро пожаловать, {{ $api.AuthService.User.userName }}
    </div>
    <div class="personal-cabinet-header">
      <ui-button class="btn" color="red" @onClick="logout">
        Выйти из аккаунта
      </ui-button>
      <ui-button
        class="btn"
        v-if="$api.AuthService.IsAdmin"
        color="green"
        @onClick="goToAdminPanel"
      >
        Админ панель
      </ui-button>
    </div>

    <div class="personal-cabinet_advertisements">
      <advertisements :isPersonal="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Advertisements from "./components/advertisement-list/advertisements.vue";

@Options({
  name: "personal-cabinet-page",
  components: { Advertisements },
})
export default class PersonalCabinetPage extends Vue {
  goToAdminPanel() {
    this.$router.push({ name: "admin" });
  }

  logout() {
    this.$api.AuthService.removeUserFromCookie();
    this.$router.push({ name: "auth" });
    setTimeout(() => {
      location.reload();
    }, 100);
  }
}
</script>

<style lang="less">
.personal-cabinet-page {
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  .personal-cabinet-title {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    font-size: 30px;
    line-height: 35px;
  }
  .personal-cabinet-header {
    display: flex;
    width: 100%;
    gap: 20px;
    .btn {
      width: 100%;
    }
  }
  .personal-cabinet_advertisements {
    margin: 20px 0;
  }
}
</style>
