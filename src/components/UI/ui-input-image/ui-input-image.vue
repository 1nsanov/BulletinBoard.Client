<template>
  <label class="ui-input-image">
    Выбрать файл
    <input
      class="input-image"
      type="file"
      accept="image/png, image/jpeg"
      @change="loadFile"
    />
  </label>
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
.ui-input-image {
  display: flex;
  width: 160px;
  justify-content: center;
  background: #fff;
  color: #232323;
  border: 3px solid #232323;
  border-radius: 8px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  transition: 0.3s ease-in-out;
  input{
    display: none;
  }
}
.ui-input-image:active ,
.ui-input-image:hover {
  background: #232323;
  color: #fff;
  border-color: #fff;
}
</style>