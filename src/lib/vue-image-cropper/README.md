# vue-image-cropper

## 安装

```bash
$ npm install

$ yarn add 
```

#### 基本用法

```HTML
<image-cropper
  :isVisible.sync="isVisible"
  @transmitImageData="transmitImageData"
>
</image-cropper>
```



#### DEMO地址



#### Props

| 名称           | 类型    | 值                    | 说明                                 |
| :------------- | :------ | :-------------------- | ------------------------------------ |
| isVisible.sync | Boolean | false(默认)/true      | 是否显示组件                         |
| model          | String  | base64(默认)/formData | 输入图片格式是base64或者formData形式 |

#### Events

| 事件名            | 说明                               | 参数      |
| ----------------- | ---------------------------------- | --------- |
| transmitImageData | 图片生成后的回调函数，接受图片数据 | imageData |

#### Example

```vue
<template>
  <div id="app">
    <image-cropper
      :isVisible.sync="isVisible"
      @transmitImageData="transmitImageData"
    ></image-cropper>
  </div>
</template>

<script>
import ImageCropper from "vue-image-cropper";
export default {
  name: "App",
  data() {
    return {
      isVisible: true
    };
  },
  methods: {
    go() {
      this.isVisible = !this.isVisible;
    },
    transmitImageData(e) {
      console.log(e);
    }
  },
  components: { ImageCropper }
};
</script>

```

