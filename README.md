# vue-image-cropper-simple

> A simple and effective vue component for image crop. （基于 vue 的图片剪裁组件）

## 安装

```bash
$ npm install vue-image-cropper-simple

$ yarn add vue-image-cropper-simple
```

#### 基本用法

```HTML
<image-cropper
  :isVisible.sync="isVisible"
  model=“base64”
  @transmitImageData="transmitImageData"
>
</image-cropper>
```

#### DEMO 地址

[DEMO](https://luckrain7.github.io/vue-image-cropper-simple/dist/index.html)

#### Props

| 名称      | 类型    | 值                | 说明                                 |
| :-------- | :------ | :---------------- | ------------------------------------ |
| isVisible | Boolean | false(默认)/true  | 是否显示组件                         |
| model     | String  | base64(默认)/Blob | 输入图片格式是 base64 或者 Blob 格式 |

#### Events

| 事件名            | 说明                               | 参数      |
| ----------------- | ---------------------------------- | --------- |
| transmitImageData | 图片生成后的回调函数，接受图片数据 | imageData |

#### Example

```vue
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
import ImageCropper from "vue-image-cropper-simple";
export default {
  name: "App",
  data() {
    return {
      isVisible: false,
      imageSrc: "/logo.png"
    };
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
```
