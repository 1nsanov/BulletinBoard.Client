<template>
  <button
    @click="$emit('onClick')"
    class="base-button"
    :class="{
      'default-thema-btn': color === 'default',
      'green-thema-btn': color === 'green',
      'orange-thema-btn': color === 'orange',
      'red-thema-btn': color === 'red',
      'small-size': size === 'small',
      'medium-size': size === 'medium',
      'big-size': size === 'big',
      isLoading: isLoading,
      disabled: disabled,
    }"
    :disabled="disabled || isLoading"
    :style="{ opacity: disabled ? `0.5` : `1` }"
  >
    <span v-if="!isLoading">
      <slot></slot>
    </span>
    <span v-else> Загрузка... </span>
  </button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  name: "ui-button",
})
export default class UiButton extends Vue {
  @Prop({ default: "default", type: String }) color!: string;
  @Prop({ default: "small", type: String }) size!: string;
  @Prop({ default: false, type: Boolean }) disabled!: boolean;
  @Prop({ default: false }) isLoading: boolean;
}
</script>

<style lang="less">
.base-button {
  min-width: 160px;
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.3s ease-in-out;
  letter-spacing: inherit;
  color: #fff;
  font-weight: 700;
  &.isLoading {
    cursor: default;
  }
}
.base-button:hover {
  filter: contrast(2.2);
  &.isLoading {
    filter: none;
  }
  &.disabled{
    cursor: default;
    filter: none;
  }
}
//themas
.default-thema-btn {
  background: linear-gradient(180deg, #1588f1 -10%, rgba(21, 136, 241, 0) 120%);
}
.green-thema-btn {
  background: linear-gradient(180deg, #55f752 0%, rgba(36, 206, 33, 0) 117.5%);
}
.orange-thema-btn {
  background: linear-gradient(180deg, #f1a511 0%, rgba(241, 165, 17, 0) 132.5%);
}
.red-thema-btn {
  background: linear-gradient(180deg, #f20f0f 0%, rgba(242, 15, 15, 0) 128.75%);
}
.small-size {
  min-width: 160px;
  height: 40px;
  padding: 0 10px;
  font-size: 16px;
}
.medium-size {
  min-width: 200px;
  height: 50px;
  padding: 0 15px;
  font-size: 20px;
}
.big-size {
  min-width: 240px;
  height: 60px;
  padding: 0 20px;
  font-size: 24px;
}
</style>