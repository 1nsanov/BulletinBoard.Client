<template>
  <div
    tabindex="0"
    @focusin="onGetFocus"
    ref="root"
    class="ui-select"
    @blur="onBlur"
  >
    <div
      class="ui_input_header"
      v-if="label.length != 0"
      :class="[isWrong ? 'wrong_text' : '']"
    >
      {{ label }}
    </div>
    <div v-if="!open || !autocomplete">
      <slot name="current" :key="innerValue" :value="active">
        <div class="multiselect d-flex" v-if="multiselect">
          <div v-if="active.length == 0">{{ selectText }}</div>
          <div
            class="multiselect-item d-flex mr-3"
            v-for="item in active"
            :key="getKey(item)"
          >
            <div class="flex-grow-1">{{ getValue(item) }}</div>
            <div class="remove" @click="select(item)">X</div>
          </div>
        </div>
        <input
          v-else-if="!multiselect && isSearch"
          class="current"
          :class="[isWrong ? 'wrong' : '', { active: open }]"
          v-model="search"
          @keypress.enter="onEnter"
          ref="currentSearch"
        />
        <div
          v-else
          class="current"
          :class="[isWrong ? 'wrong' : '', { active: open }]"
          @click="currentClick"
          @keypress.enter="onEnter"
          @blur="onBlur"
          ref="currentSearch"
          tabindex="111"
        >
          <div class="current_text_wrapper">
            <span class="current_text">
              {{ innerValue ? innerValue.Name : placeholder }}
            </span>
          </div>
        </div>
      </slot>
    </div>
    <div v-if="autocomplete && open">
      <input ref="searchEl" style="border: 1px solid red" class="current" />
    </div>
    <slot name="container" :data="tempItems">
      <div
        class="container"
        :class="{ active: open }"
        :style="containerPosition"
        @focusout="loseFocus"
      >
        <ui-scroll class="ui_select_scroll">
          <div
            class="item"
            v-for="(item, index) in tempItems"
            v-bind:key="index"
            @click="select(item)"
            :class="{ active: isSelect(item) }"
          >
            <template v-if="item === undefined && !noUndefined">
              {{ defaultText }}
            </template>
            <template v-else>
              <slot
                name="item"
                :item="item"
                :index="index"
                :active="isSelect(item)"
                >{{ getValue(item) }}</slot
              >
            </template>
          </div>
        </ui-scroll>
      </div>
    </slot>
  </div>
</template>
<script lang="ts">
import { Vue, Options, Prop, Watch, Ref } from "vue-property-decorator";
import SelectOptionModel from "./models/SelectOptionModel";

@Options({
  name: "ui-select",
  emits: ["update:modelValue", "currentClick"],
})
export default class UiSelectComponent extends Vue {
  @Prop({ default: "" }) label: string;
  @Prop() keyField?: string;
  @Prop() valueField?: string;
  // todo: сделать проверку на повторяющиеся значения ключей и кидать ошибку/предупреждение
  @Prop({
    default: () => new Array<SelectOptionModel>(),
    type: Array,
    required: true,
  })
  items!: SelectOptionModel[];
  @Prop({ default: false, type: Boolean }) autocomplete: boolean;
  @Prop({ default: false }) multiselect: boolean;
  @Prop({ default: false }) isSearch: boolean;
  @Prop({ default: null }) selectText: string;
  @Prop({ default: true }) closeOnSelect: boolean;
  @Prop({ default: false }) noUndefined: boolean;
  @Prop({ default: false }) checkActiveByRef: boolean;
  @Prop({ type: String, default: "Не выбрано" }) defaultText: string;
  //@Prop({ type: Boolean, default: false }) required: boolean;
  @Prop({ default: false }) noPlace: boolean;
  @Prop({ default: false }) isWrong: boolean;
  @Prop({ default: "" }) defaultChoosen: string;
  @Prop() modelValue: any | any[] | String | Number | string | number | Date;
  @Prop({ default: "", type: String }) placeholder!: string;

  search = "";
  tempItems: any[] = [];
  innerValue: any | any[] | String | Number | string | number | Date = null;
  innerItems: any[] = this.items;
  containerPosition: Object = new Object();
  tempValue: { key: any; value: any } = { key: null, value: null };

  @Watch("search")
  onUpdateSearch(newValue: string) {
    if (this.isSearch) {
      this.tempItems = this.items.filter(
        (x) =>
          x[this.valueField].toLowerCase().search(newValue.toLowerCase()) != -1
      );
      if (
        this.items.some(
          (x) => x[this.valueField].toLowerCase() == newValue.toLowerCase()
        )
      ) {
        this.tempItems = this.items;
      }
      if (
        this.items.find(
          (x) => x[this.valueField].toLowerCase() == newValue.toLowerCase()
        )
      ) {
        this.innerValue = this.items.find(
          (x) => x[this.valueField].toLowerCase() == newValue.toLowerCase()
        )[this.keyField];
      }
    }
  }

  @Watch("defaultChoosen")
  onUpdateDefaultChoosen() {
    if (this.defaultChoosen.length != 0) {
      this.innerValue = this.defaultChoosen;
    }
  }

  currentClick() {
    this.$emit("currentClick");
  }

  @Watch("noPlace")
  onUpdateNoPlace(newValue: boolean) {
    if (newValue) {
      this.containerPosition = {
        top: "unset",
        bottom: "100%",
        boxShadow: "0 -12px 24px 0 #ccd0d5",
      };
    } else {
      this.containerPosition = {
        top: "100%",
        bottom: "unset",
        boxShadow: "0 12px 24px 0 #ccd0d5",
      };
    }
  }

  @Watch("modelValue")
  onValueChanged(value) {
    this.innerValue = value;
    if (this.isSearch && value.length != 0) {
      let item = this.items.find((x) => x[this.keyField] == value);
      if (item) {
        this.search = item[this.valueField];
      }
    }
  }
  // внутреннее значение
  @Watch("innerValue")
  onInnerValueChanged() {
    this.$emit("update:modelValue", this.innerValue);
  }
  private open = false;
  preventCurrentClick = false;
  setOpen(value: boolean) {
    if (!value) {
    }
    this.open = value;
    var active = this.active;
    if (value && this.autocomplete) {
      this.$nextTick(() => {
        (this.$refs["searchEl"] as HTMLInputElement).focus();
      });
    }
    if (!active) {
      this.setHoveredIdx(0);
    }
    Array.isArray(active)
      ? this.setHoveredIdx(
          this.itemsToDisplay.indexOf(active[active.length - 1])
        )
      : this.setHoveredIdx(this.itemsToDisplay.indexOf(active));
  }
  clickCurrent() {
    if (this.preventCurrentClick || this.multiselect) {
      return;
    }
    this.setOpen(!this.open);
  }
  hoveredIdx: number = null;
  hasFocus = false;
  mounted() {
    this.onUpdateNoPlace(this.noPlace);
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown.bind(this));
  }
  onGetFocus() {
    this.setOpen(true);
    this.preventCurrentClick = true;
    setTimeout(() => (this.preventCurrentClick = false), 300);
    this.hasFocus = true;
  }
  onBlur() {
    this.setOpen(false);
    this.hasFocus = false;
    if (
      this.isSearch &&
      !this.items.some(
        (x) => x[this.valueField].toLowerCase() == this.search.toLowerCase()
      )
    ) {
      // let items = this.items.filter(
      //   (x) =>
      //     x[this.valueField].toLowerCase().search(this.search.toLowerCase()) !=
      //     -1
      // );
      // if (items.length) {
      //   this.search = items[0][this.valueField];
      //   this.select(items[0]);
      // }
      this.innerValue = this.tempValue.key;
      this.search = this.tempValue.value;
    }
    if (this.$refs.currentSearch) {
      (this.$refs.currentSearch as HTMLInputElement).blur();
    }
  }

  onKeyDown(ev: KeyboardEvent) {
    if (!this.hasFocus) {
      return;
    }
    var key = ev.key.toLowerCase();
    if (key == "escape") {
      return (this.open = false);
    }
    if (key == "enter") {
      return this.open ? this.onEnter() : this.setOpen(true);
    }
    if (key == "arrowdown" || key == "arrowup") {
      ev.preventDefault();
      return this.open
        ? key === "arrowdown"
          ? this.setHoveredIdx(++this.hoveredIdx)
          : this.setHoveredIdx(--this.hoveredIdx)
        : this.setOpen(true);
    }
  }
  isSelect(item: SelectOptionModel) {
    if (item === undefined) return this.innerValue === undefined;
    var key = this.getKey(item);

    return this.multiselect
      ? (this.innerValue || []).some((el: any) => this.isEqual(el, key))
      : this.isEqual(key, this.innerValue);
  }
  isEqual(fst: any, scd: any): boolean {
    return this.checkActiveByRef
      ? fst === scd
      : JSON.stringify(fst) === JSON.stringify(scd);
  }
  setHoveredIdx(idx: number) {
    this.hoveredIdx =
      (idx + this.itemsToDisplay.length) % this.itemsToDisplay.length;
  }
  onEnter() {
    if (this.isSearch) {
      let items = this.items.filter(
        (x) =>
          x[this.valueField].toLowerCase().search(this.search.toLowerCase()) !=
          -1
      );
      if (items.length) {
        this.search = items[0][this.valueField];
        this.select(items[0]);
      }
      if (this.$refs.currentSearch) {
        (this.$refs.currentSearch as HTMLInputElement).blur();
      }
    }
    // this.select(this.itemsToDisplay[this.hoveredIdx]);
  }
  @Watch("items", { deep: true })
  onItemsChanged(value, oldValue) {
    this.tempItems = value;
    this.trySetDefault();
  }
  hasValue(): boolean {
    return (
      this.innerValue != null ||
      (this.multiselect && this.innerValue.length > 0)
    );
  }
  valueInItems(): boolean {
    const allKeys = (this.innerItems || []).map((x) => this.getKey(x));
    const selectedKeys = this.multiselect ? this.innerValue : [this.innerValue];
    return selectedKeys.every((x) => allKeys.indexOf(x) > -1);
    //текущее значения все есть в наборе items
  }
  trySetDefault() {
    if (this.hasValue() && this.valueInItems()) {
      return;
    } else {
      if (!this.noUndefined) this.select(undefined);
      //выбирает не найдено при обновлении страницы
    }
  }
  get itemsToDisplay(): any[] {
    if (this.noUndefined) {
      return this.innerItems;
    }
    if (!this.autocomplete || !this.search) {
      let res = this.innerItems;
      res = [undefined].concat(res);
      return res;
    }

    let res = this.innerItems.filter((x) =>
      (this.getValue(x) || "").toLowerCase().includes(this.search.toLowerCase())
    );
    res = [undefined].concat(res);
    return res;
  }

  get active(): any {
    return this.multiselect
      ? this.innerItems.filter((el: any) =>
          this.innerValue.some((iv: any) => this.isEqual(iv, this.getKey(el)))
        )
      : (this.innerItems.filter((el: any) =>
          this.isEqual(this.getKey(el), this.innerValue)
        ) || [])[0];
  }
  get activeText(): string {
    var active = this.active;
    if (Array.isArray(active)) {
      var text =
        active.length > 0
          ? active.map((el: any) => this.getValue(el)).join(",")
          : this.selectText || "";
    } else {
      text = active
        ? this.getValue(active)
        : this.selectText || this.defaultText;
    }
    return text;
  }
  loseFocus() {
    if (this.isSearch) {
      this.setOpen(false);
      if (this.$refs.currentSearch) {
        (this.$refs.currentSearch as HTMLInputElement).blur();
      }
      this.innerValue = this.tempValue.key;
      this.search = this.tempValue.value;
    }
  }
  select(item: any) {
    if (this.isSearch) {
      this.search = item[this.valueField];
      this.loseFocus();
    }
    if (item === undefined) {
      this.innerValue = undefined;
      if (this.closeOnSelect) {
        this.setOpen(false);
      }
      return;
    }
    if (this.multiselect) {
      this.innerValue = this.innerValue || [];
      this.isSelect(item)
        ? (this.innerValue = this.innerValue.filter(
            (el: any) => !this.isEqual(el, this.getKey(item))
          ))
        : this.innerValue.push(this.getKey(item));
    } else {
      this.innerValue = this.getKey(item);
      if (this.closeOnSelect) {
        this.setOpen(false);
      }
    }
    if (this.items.find((x) => x[this.keyField] == item[this.keyField])) {
      this.tempValue.key = this.innerValue;
      this.tempValue.value = this.items.find(
        (x) => x[this.keyField] == item[this.keyField]
      )[this.valueField];
    }
    this.$emit("update:modelValue", this.innerValue);

    let idx = this.innerItems.indexOf(item);
    this.$emit("selectedIndex", idx);
    this.setHoveredIdx(idx);
  }

  created() {
    if (this.items.find((x) => x[this.keyField] == this.modelValue)) {
      if (this.isSearch) {
        this.search = this.items.find(
          (x) => x[this.keyField] == this.modelValue
        )[this.valueField];
      }
    } else {
      this.onBlur();
    }

    if (this.items) {
      this.tempItems = this.items;
    }
    this.innerValue = this.modelValue;
    this.trySetDefault();
    this.onUpdateDefaultChoosen();

    if (this.items.find((x) => x[this.keyField] == this.innerValue)) {
      this.tempValue.key = this.innerValue;
      this.tempValue.value = this.items.find(
        (x) => x[this.keyField] == this.innerValue
      )[this.valueField];
    }
  }

  getKey(item: SelectOptionModel) {
    if (this.keyField) {
      return item.Name[this.keyField];
    }
    return item;
  }
  getValue(item: SelectOptionModel) {
    if (this.valueField) {
      const resText = item.Name[this.valueField];
      if (resText == undefined) {
        console.error("Не найден valueField");
      }
      return resText.toUpperCase();
    }
    // return item.toUpperCase();
    return item.Name;
  }
}
</script>
<style lang="less" scoped>
@uiSelectColor: #3c3f40;
@uiSelectIconColor: #062634;
@uiSelectBorderColor: #263958;
@uiSelectActiveColor: #ced4de;
@uiSelectBackColor: #fff;
@uiSelectColorLabel: #7a7878;

.ui-select {
  position: relative;
  user-select: none;
  cursor: pointer;
  outline: none;
  min-width: 11em;
  width: 100%;
  // margin-left: 23px;
  &:focus {
    .current {
      border: 1px #ced4de solid;
      transition: 0.3s;
      &:focus,
      &:hover {
        border-color: #334256;
        transition: 0.3s;
      }
    }
  }
  .current {
    width: 100%;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    border: solid 1px #ccd0d5;
    color: #334256;
    padding: 0px 20px;
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    outline: none;
    background: url("../../../assets/icons/double-arrow-icon.svg") no-repeat;
    background-position: right 17px center;
    background-color: #fff;
    transition: 0.3s;
    overflow: hidden;
    padding-right: 40px;
    .current_text_wrapper {
      width: 100%;
      overflow: hidden;
      .current_text {
        display: block;
        height: 46px;
        max-width: fit-content;
      }
    }
    &:hover {
      border-color: #334256;
      transition: 0.3s;
    }
  }
  .remove {
    margin-left: 4px;
  }
  .container {
    color: #162a47;
    display: none;
    padding: 0;
    box-shadow: 0 12px 24px 0 #ccd0d5;
    margin: 5px 0;
    border-radius: 4px;
    background-color: #fff;
    &.active {
      display: block;
      position: absolute;
      z-index: 99999999;
      min-width: calc(~"100%");
      top: 100%;
      border-width: 0px 1px 1px 1px;
      .ui_select_scroll {
        overflow: hidden;
        position: relative;
        height: 100%;
        max-height: 100%;
        .item {
          padding: 17px 20px;
          background-color: @uiSelectBackColor;
          border-top: @uiSelectBorderColor;
          font-size: 14px;
          color: #334256;
          transition: 0.3s;
          &.hover,
          &:hover {
            background-color: #f0f0f0;
            transition: 0.3s;
          }
          &.active {
            border: 0px;
            background-color: #8e97a1;
            color: white;
            transition: 0.3s;
          }
          &.hover.active,
          &:hover.active {
            background-color: #8e97a1;
            transition: 0.3s;
          }
        }
      }
    }
  }
}
.ui_input_header {
  display: flex;
  font-size: 18px;
  margin: 10px 0;
  cursor: default;
}
@media (max-width: 991px) {
  .ui-select {
    // width: 100%;
  }
}
.wrong {
  border: 1px solid rgba(255, 0, 0, 0.5) !important;
  box-shadow: 1px 1px 10px 1px rgba(255, 0, 0, 0.7);
  transition: 0.3s;
}
.wrong_text {
  color: red !important;
  transition: 0.3s;
}
</style>