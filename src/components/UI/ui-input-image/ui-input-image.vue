<template>
  <div class="ui-input-image">
    <input
      type="file"
      accept="image/png, image/jpeg"
      @change="loadFile"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputImageModel from "./models/InputImageModel";

@Options({
  name: "ui-input-image",
})
export default class UiInputImage extends Vue {
  image: InputImageModel = null;
  loadFile(e) {
    var imageUrl = URL.createObjectURL(e.target.files[0]);
    var imageModel = new InputImageModel({
      SrcUrl: imageUrl,
      Base64: btoa(imageUrl),
    });
    this.$emit("loadImage", imageModel);
  }
}
</script>

<style lang="less" scoped>
</style>