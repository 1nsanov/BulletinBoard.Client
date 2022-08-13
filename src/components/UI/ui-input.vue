<template>
  <div class="ui-input">
    <!-- <div class="ui-input_icon" v-if="isIcon">
      <slot></slot>
    </div> -->
    <label class="ui-input-label" v-if="label">{{ label }}<br /></label>
    <input
      class="base-input"
      :class="{
        'default-thema': thema === 'default',
        'dark-thema': thema === 'dark',
        isError: isError,
        readonly: readonly,
      }"
      :type="type"
      :placeholder="`${placeholder}`"
      :value="modelValue"
      @input="updateInput"
      @keyup.enter="$emit('keyupEnter')"
      :readonly="readonly"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Emit, Prop } from "vue-property-decorator";

@Options({
  name: "ui-input",
})
export default class UiInput extends Vue {
  @Prop({ type: String }) modelValue!: string;
  @Prop({ default: "text", type: String }) type!: string;
  @Prop({ default: "", type: String }) placeholder!: string;
  @Prop({ default: "default", type: String }) thema!: string;
  @Prop({ default: false }) isError: boolean;
  @Prop({ default: null }) label: string;
  @Prop({ default: false }) readonly: boolean;

  @Emit("update:modelValue") updateInput(event: any) {
    return event.target.value;
  }
}
</script>

<style lang="less">
.ui-input {
  position: relative;
  .ui-input_icon {
    position: absolute;
    padding-left: 13px;
    height: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 2px;
    img {
      width: 24px;
      height: 24px;
    }
  }
  .ui-input-label {
    display: flex;
    font-size: 18px;
    margin: 10px 0;
  }
  .base-input {
    font-family: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    width: 100%;
    font-size: 16px;
    padding: 0 30px 0 10px;
    transition: 0.2s ease-in-out;
    &.isError {
      border-color: #f20f0f;
    }
    &.readonly {
      border-color: #c8c8c8 !important;
      cursor: not-allowed;
    }
  }
  .base-input:focus {
    border-color: #1977d6;
  }
  .base-input::-webkit-outer-spin-button,
  .base-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .base-input[type="number"] {
    -moz-appearance: textfield;
  }

  .default-thema {
    border: 2px solid #ffffff;
    color: #ffffff;
    border-radius: 10px;
    background: transparent;
    height: 40px;
  }
  .default-thema::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  .dark-thema {
    border: 2px solid #1e373f;
    color: #1e373f;
    border-radius: 10px;
    background: transparent;
    height: 40px;
  }
  .dark-thema::placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
}
</style>