<template>
  <div class="dropdown-haeder-filter">
    <div
      class="placeholder-container"
      :class="{ 'active-placeholder': isShowMenu }"
      @click="toggleShowMenu"
    >
      <div class="placeholder" v-if="current">
        {{ current.Name }}
      </div>
      <div class="placeholder" v-else>Не выбрано</div>
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
        {{ item.Name }}
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
  }

  get topPad(): number {
    return -60 * this.innerItems.length;
  }

  toggleShowMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  selectItem(item: OptionModel) {
    this.innerItems.forEach((x) => {
      x.IsActive = x.Id === item.Id;
    });
    this.isShowMenu = false;
    this.$emit("select", item);
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
    width: 100%;
    padding: 20px;
    font-size: 24px;
    font-weight: 700;
    background: rgb(46, 139, 205);
    cursor: pointer;
    border-left: 5px solid #fff;
    transition: 0.3s ease-in-out;
  }
  .active-placeholder,
  .placeholder-container:hover {
    background: rgb(55, 163, 240);
  }

  .list-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    .list-item {
      height: 60px;
      line-height: 60px;
      background: rgb(37, 108, 159);
      border-left: 5px solid #fff;
      padding-left: 20px;
      font-size: 18px;
      transition: 0.3s ease-in-out;
      cursor: pointer;
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