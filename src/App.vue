<!--
 * @Description:  
 * @Author: LuckRain7
 * @Date: 2020-04-09 10:25:30
 -->
<template>
  <div id="app">
    <div class="my-title">
      vue-image-cropper-simple
    </div>
    <div class="gogo">
      <img alt="Vue logo" :src="imageSrc" @click="go" />
      <p>点击图片上传</p>
    </div>
    <image-cropper
      :isVisible.sync="isVisible"
      model="base64"
      @transmitImageData="transmitImageData"
    ></image-cropper>
  </div>
</template>

<script>
import ImageCropper from "./lib/vue-image-cropper-simple/index.vue";
export default {
  name: "App",
  data() {
    return {
      isVisible: false,
      imageSrc: "/logo.png"
    };
  },
  mounted() {
    if (process.env.NODE_ENV === "production") {
      this.imageSrc = "/vue-image-cropper-simple/dist/logo.png";
    }
  },
  methods: {
    go() {
      this.isVisible = !this.isVisible;
    },
    transmitImageData(imageDataBase64) {
      this.imageSrc = imageDataBase64;
    }
  },
  components: { ImageCropper }
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;

  .my-title {
    height: 40px;
    min-width: 600px;
    text-align: center;
    line-height: 40px;
    margin: 30px auto;
    font-size: 30px;
    color: #606f7b;
  }
  .gogo {
    height: 200px;
    width: 200px;
    margin: auto auto;
    text-align: center;
    color: #606f7b;
  }
}
</style>
