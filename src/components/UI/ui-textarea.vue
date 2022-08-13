<template>
  <label class="ui_textarea_wrapper">
    <div
      v-if="label.length != 0"
      :class="[styleForWrong ? 'wrong_text' : '', 'ui_input_header']"
    >
      {{ label }}
    </div>
    <textarea
      :class="[styleForWrong ? 'wrong' : '', 'ui_textarea']"
      :readonly="readonly"
      :placeholder="placeholder"
      v-model="innerValue"
    ></textarea>
  </label>
</template>
<script lang="ts">
import { Vue, Prop, Watch, Options } from "vue-property-decorator";

@Options({
  name: "ui-textarea",
})
export default class UiTextarea extends Vue {
  @Prop({ default: "" }) label: string;
  @Prop({ default: false }) readonly: boolean;
  @Prop({ default: false }) isWrong: boolean;
  @Prop({ default: "" }) modelValue: string;
  @Prop({ default: "" }) placeholder: string;

  innerValue: string = "";
  styleForWrong: boolean = false;

  @Watch("modelValue")
  onUpdateModelValue(newValue: string) {
    this.innerValue = newValue;
  }

  @Watch("innerValue")
  onUpdateInnerValue(newValue: string) {
    this.$emit("update:modelValue", newValue);
  }

  @Watch("isWrong")
  onUpdateIsWrong(newValue: boolean) {
    this.styleForWrong = newValue;
  }

  created() {
    this.onUpdateModelValue(this.modelValue);
    this.onUpdateIsWrong(this.isWrong);
  }
}
</script>
<style lang="less">
.ui_textarea_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 150px;

  .ui_input_header {
    display: flex;
    font-size: 18px;
    margin: 10px 0;
  }
  .ui_textarea {
    font-family: inherit;
    color: #ffffff;
    font-size: 16px;
    line-height: 20px;
    width: 100%;
    height: 138px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: transparent;
    border: 2px solid #ffffff;
    outline: none;
    resize: none;
    transition: 0.3s ease-in-out;
    padding: 10px 30px 10px 10px;
    &:read-only {
      border-color: #c8c8c8 !important;
      cursor: not-allowed;
    }
    &:focus {
      border-color: #1977d6;
    }
  }
}
</style>