<template>
  <div class="auth-user">
    <div class="auth-user_title">
      {{ recoveryMode ? "Восстановление аккаунта" : title }}
    </div>
    <div class="auth-user_form">
      <div class="auth-user_form_content">
        <div
          class="auth-user_form_content_field"
          :style="{ marginBottom: `22px` }"
        >
          <div class="auth-user_form_content_field_title">
            {{ recoveryMode ? "Введите логин, который помните" : "Логин" }}
          </div>
          <div class="auth-user_form_content_field_input">
            <ui-input
              v-model="username"
              type="text"
              placeholder="Введите логин..."
            />
          </div>
        </div>
        <div class="auth-user_form_content_field" v-if="!recoveryMode">
          <div class="auth-user_form_content_field_title">Пароль</div>
          <div class="auth-user_form_content_field_input">
            <ui-input
              v-model="password"
              type="password"
              placeholder="Введите пароль..."
            />
          </div>
        </div>

        <div
          class="auth-user_form_content_field"
          :style="{ marginBottom: `22px` }"
          v-if="recoveryMode"
        >
          <div class="auth-user_form_content_field_title">
            Введите новый пароль
          </div>
          <div class="auth-user_form_content_field_input">
            <ui-input
              v-model="newPassword"
              type="password"
              placeholder="Введите пароль..."
            />
          </div>
        </div>

        <div class="auth-user_form_content_field" v-if="recoveryMode">
          <div class="auth-user_form_content_field_title">Повторите пароль</div>
          <div class="auth-user_form_content_field_input">
            <ui-input
              v-model="reapetPassword"
              type="password"
              placeholder="Введите пароль..."
            />
          </div>
        </div>

        <div
          class="auth-user_form_content_error-msg"
          v-html="innerErrMsg"
        ></div>
        <div class="auth-user_form_content_confirm">
          <ui-button
            :style="{ width: `100%` }"
            :color="!isLogin || recoveryMode ? 'default' : 'green'"
            @onClick="confirm"
            >{{ recoveryMode ? "Восстановить" : textButton }}</ui-button
          >
        </div>
        <div class="auth-user_form_content_footer" v-if="!recoveryMode">
          {{ footerMsg }}<span @click="swicthMode">{{ actionText }}</span>
        </div>
        <div class="auth-user_form_content_footer">
          <span @click="recoveryModeSwicth">
            {{
              recoveryMode ? "Вернуться к авторизации" : "Восстановить аккаунт"
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import UserFormModel from "../models/UserFormModel";
@Options({
  name: "auth-user",
})
export default class AuthUser extends Vue {
  @Prop({ type: Boolean, default: false }) isLogin!: boolean;
  @Prop({ type: String, default: null }) errMsg!: string;

  title = "Регистрация";
  textButton = "Зарегистрироваться";
  footerMsg = "Уже есть аккаунт? ";
  actionText = " Войти!";
  innerErrMsg = "";

  username = "";
  password = "";

  newPassword = "";
  reapetPassword = "";

  recoveryMode: boolean = false;
  recoveryCheckedUsername: boolean = false;

  @Watch("errMsg")
  onUpdateErrMsg() {
    this.innerErrMsg = this.errMsg;
  }
  created() {
    this.onIsLogin();
  }

  @Watch("isLogin")
  onIsLogin() {
    if (this.isLogin) {
      this.title = "Вход";
      this.textButton = "Войти";
      this.footerMsg = "Все еще без аккаунта? ";
      this.actionText = " Зарегистрируйся!";
    } else {
      this.title = "Регистрация";
      this.textButton = "Зарегистрироваться";
      this.footerMsg = "Уже есть аккаунт? ";
      this.actionText = " Войти!";
    }
  }

  async confirm() {
    this.innerErrMsg = ""
    if (!this.recoveryMode) {
      let user = this.createUser();
      this.$emit("getData", user);
      this.password = "";
    } else {
      await this.$api.AuthService.CheckExistUser({
        userName: this.username,
      }).then((res) => {
        if (res.isSuccess) {
          this.validationPasswords();
        } else {
          this.innerErrMsg = res.message;
        }
      });
    }
  }
  validationPasswords() {
    if (this.newPassword === this.reapetPassword) {
      this.$emit(
        "recovery",
        new UserFormModel(this.username, this.newPassword)
      );
    } else {
      this.innerErrMsg = "Пароли не совпадают. Повторите попытку";
    }
  }
  createUser(): UserFormModel {
    return new UserFormModel(this.username, this.password);
  }
  swicthMode() {
    this.$emit("swicthMode");
  }
  recoveryModeSwicth() {
    this.recoveryMode = !this.recoveryMode;
  }
}
</script>

<style lang="less" scoped>
.auth-user {
  font-size: 16px;
  width: 100%;
  margin-bottom: 50px;
  .auth-user_title {
    text-align: center;
    font-size: 32px;
    line-height: 45px;
    margin-bottom: 10px;
  }
  .auth-user_form {
    width: 100%;
    min-height: 300px;
    border-radius: 20px;
    border: 5px solid #fff;
    max-width: 400px;
    margin: 0 auto;
    .auth-user_form_content {
      display: flex;
      flex-direction: column;
      padding: 40px 40px 23px 40px;
      .auth-user_form_content_field {
        width: 100%;
        display: flex;
        flex-direction: column;
        .auth-user_form_content_field_title {
          margin-bottom: 10px;
          line-height: 17px;
        }
        .auth-user_form_content_field_input {
        }
      }
      .auth-user_form_content_error-msg {
        font-size: 14px;
        line-height: 20px;
        color: #df411e;
        padding: 7px 0 7px 0;
      }
      .auth-user_form_content_confirm {
        margin-bottom: 20px;
      }
      .auth-user_form_content_footer {
        font-size: 12px;
        line-height: 16px;
        span {
          cursor: pointer;
          transition: ease 0.3s;
          color: rgb(94, 192, 253);
        }
        span:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>