<template>
  <div class="ui-input-image">
    <input type="file" accept="image/png, image/jpeg" @change="loadFile" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "ui-input-image",
})
export default class UiInputImage extends Vue {
  async loadFile(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    var self = this;
    reader.onloadend = function () {
      self.$emit("loadImage", reader.result);
    };
    reader.readAsDataURL(file);
  }
}
</script>

<style lang="less" scoped>
</style>