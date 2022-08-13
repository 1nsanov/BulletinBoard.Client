<template>
  <div class="ui-preview-image">
    <div
      class="preview-image"
      :style="{
        backgroundImage: image ? `url(${image})` : none,
        width: size,
        height: size,
      }"
    >
      <img v-if="!image" src="./image/undefined-image.svg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Options({
  name: "ui-preview-image",
})
export default class UiPreviewImage extends Vue {
  @Prop({ default: null }) image: string;
  @Prop({ default: "100px" }) size: string;
}
</script>

<style lang="less" scoped>
.preview-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(255, 255, 255);
  border: 3px solid rgb(35, 35, 35);
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  img {
    width: 70%;
  }
}
</style>