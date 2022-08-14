<template>
  <div class="dropdown-haeder-filter">
    <div
      class="placeholder-container"
      :class="{
        'active-placeholder': isShowMenu && items.length > 0,
        'hover-disabled': items.length === 0,
      }"
      @click="toggleShowMenu"
    >
      <div class="placeholder" v-if="current">
        {{ current.Name }}
      </div>
      <div class="placeholder" v-else>
        {{ items.length === 0 ? "-" : "Не выбрано" }}
      </div>
      <div class="preview-image" v-if="isImage && current">
        <ui-preview-image size="50px" :image="current.ImageUrl" />
      </div>
      <div class="close-button" v-if="current" @click.stop="reset">
        <img src="@/assets/icons/icon-cross.svg" alt="" />
      </div>
    </div>
    <div
      v-if="isShowMenu"
      class="list-container"
      :style="{ bottom: `${topPad}px` }"
    >
      <div
        v-for="item in innerItems"
        :key="item.id"
        @click="selectItem(item)"
        class="list-item"
        :class="{ active: item.IsActive }"
      >
        <span>{{ item.Name }}</span>
        <ui-preview-image size="40px" :image="item.ImageUrl" v-if="isImage" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import OptionModel from "./models/OptionModel";

@Options({
  name: "dropdown-header-filter",
})
export default class DropdownHeaderFilter extends Vue {
  @Prop({ default: null }) items: OptionModel[];
  @Prop({ default: false }) isImage: boolean;

  innerItems: OptionModel[] = [];
  current: OptionModel = null;

  isShowMenu: boolean = false;

  created() {
    this.onInnerItems();
  }

  @Watch("items", { deep: true })
  onInnerItems() {
    if (this.items) {
      this.innerItems = this.items;
      this.current = this.innerItems.find((x) => x.IsActive === true);
    }
    if (this.items.length === 0) {
      this.isShowMenu = false;
    }
  }

  get topPad(): number {
    return -60 * this.innerItems.length;
  }

  toggleShowMenu() {
    if (this.items.length === 0) return;
    this.isShowMenu = !this.isShowMenu;
  }

  selectItem(item: OptionModel) {
    this.innerItems.forEach((x) => {
      x.IsActive = x.Id === item.Id;
    });
    this.isShowMenu = false;
    this.$emit("select", item);
  }
  reset() {
    this.current = null;
    this.innerItems.forEach((x) => {
      x.IsActive = false;
    });
    this.$emit("select", null);
  }
}
</script>

<style lang="less" scoped>
.dropdown-haeder-filter {
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 100;
  .placeholder-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    padding: 20px;
    font-size: 20px;
    font-weight: 700;
    background: rgb(46, 139, 205);
    cursor: pointer;
    border-left: 5px solid #fff;
    transition: 0.3s ease-in-out;
    .placeholder {
      word-break: break-all;
    }
    .close-button {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
      top: 7px;
      right: 7px;
      transition: 0.5s ease-in-out;
      img {
        width: 10px;
      }
      &:hover {
        background: rgb(231, 231, 231);
        transform: rotateZ(180deg);
      }
    }
    .active-placeholder,
    .placeholder-container:hover {
      background: rgb(55, 163, 240);
    }
    .hover-disabled:hover {
      cursor: not-allowed;
      &:hover {
        background: rgb(46, 139, 205);
      }
      &.active-placeholder {
        background: rgb(46, 139, 205);
      }
    }
  }

  .list-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      background: rgb(37, 108, 159);
      border-left: 5px solid #fff;
      padding: 0 10px 0 20px;
      font-size: 18px;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      text-overflow: ellipsis;
      width: 100%;
      span {
        // width: 60%;
        // text-overflow: ellipsis;
      }
      &.active {
        background: rgb(37, 90, 159);
        border-color: rgb(33, 223, 29);
      }
    }
    .list-item:hover {
      background: rgb(30, 86, 127);
    }
  }
}
</style>