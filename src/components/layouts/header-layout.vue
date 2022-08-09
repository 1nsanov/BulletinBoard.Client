<template>
  <div class="header">
    <div class="header_home _container" v-if="isHome">
      <h1 class="header_home_title">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, ab!
      </h1>
    </div>
    <div class="header_main _container" v-else>
      
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  name: "header-layout",
})
export default class HeaderLayout extends Vue {
  isHome: boolean = true;
}
</script>

<style lang="less">
.header {
  width: 100%;
  ._container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header_home {
    padding: 50px 15px 0 15px;
    text-decoration: underline;
    color: #bdffe7;
    .header_home_title {
      text-align: center;
      font-size: 64px;
      line-height: 90px;
      text-transform: uppercase;
      text-decoration: underline;
      background: linear-gradient(
        180deg,
        #ffffff 0%,
        #bdffe7 99.99%,
        #ffffff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      // text-fill-color: transparent;
      @media screen and (max-width: 768px) {
        font-size: 42px;
        line-height: 60px;
      }
    }
  }
  .header_main {
    height: 100px;
    background: linear-gradient(
      63.18deg,
      #0f2027 0%,
      #203a43 49.48%,
      #2c5364 100%
    );
    box-shadow: 0px 2px 100px 10px rgba(0, 0, 0, 0.7);
    @media screen and (max-width: 994px) {
      height: 75px;
    }
    .header_main_content {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      .header_main_content_logo {
        width: 58px;
        @media screen and (max-width: 994px) {
          width: 34px;
          img {
            width: 34px;
          }
        }
      }
      .header_main_content_game {
        font-size: 24px;
        padding: 0 30px;
        text-align: center;
        @media screen and (max-width: 994px) {
          padding: 0 15px;
          font-size: 20px;
          line-height: 24px;
        }
      }
      .header_main_content_nav {
        display: flex;
        max-width: 994px;
        padding: 0 30px;
        width: 100%;
        height: 100%;
        align-items: center;
        @media screen and (max-width: 994px) {
          padding: 0 15px;
        }
        .header_main_content_nav_item {
          flex: 0 0 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          cursor: pointer;
          font-size: 32px;
          transition: 0.3s ease-in-out;
          color: #ffffff;
          border-bottom: 6px solid #ffffff;
          svg {
            width: 32px;
            height: 32px;
            display: none;
            transition: 0.3s ease-in-out;
            path {
              transition: 0.3s ease-in-out;
            }
          }
          @media screen and (max-width: 994px) {
            font-size: 24px;
            border-bottom: 4px solid #ffffff;
          }
          @media screen and (max-width: 600px) {
            span {
              display: none;
            }
            svg {
              display: block;
            }
          }
        }
        .header_main_content_nav_item:hover {
          font-size: 36px;
          border-bottom: 6px solid #f1ffdf;
          color: #f1ffdf;
          svg {
            path {
              fill: #f1ffdf;
            }
          }
          @media screen and (max-width: 994px) {
            font-size: 26px;
            border-bottom: 4px solid #f1ffdf;
          }
        }
        .active {
          border-bottom: 6px solid #93ee62 !important;
          color: #93ee62 !important;
          svg {
            path {
              fill: #93ee62 !important;
            }
          }
          @media screen and (max-width: 994px) {
            border-bottom: 4px solid #93ee62 !important;
            svg {
              width: 36px;
              height: 36px;
            }
          }
        }
      }

      .header_main_content_profile {
        display: flex;
        justify-content: end;
        width: 58px;
        cursor: pointer;
        @media screen and (max-width: 994px) {
          width: 34px;
          img {
            width: 34px;
          }
        }
      }
      @media screen and (max-width: 994px) {
        padding: 0 15px;
      }
    }
  }
}
</style>