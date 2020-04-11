<!--
 * @Description:  
 * @Author: LuckRain7
 * @Date: 2020-04-09 10:14:47
 -->
<template>
  <!-- 外部遮罩层 -->
  <div class="vue-image-cropper" v-if="isVisible">
    <!-- 内容框 -->
    <div class="vic-wrap">
      <!-- 头部 -->
      <div class="vic-header">
        <span>图片裁剪</span>
        <!-- 右上角关闭按钮 -->
        <i @click="close">x</i>
      </div>
      <!-- 主体部分 -->
      <div class="vic-main">
        <!-- 图像裁剪 -->
        <div
          class="vic-img-box"
          @mousedown="mouseDown"
          @mousemove="mouseMove"
          @mouseup="mouseUp"
          @wheel="Wheel"
        >
          <canvas
            :width="CanvasWidth"
            :height="CanvasHeight"
            ref="canvas"
          ></canvas>

          <div
            class="vic-main-mark"
            :style="{
              width: MarkWidth + 'px',
              height: MarkHeight + 'px',
              left: MarkLeft + 'px',
              top: MarkTop + 'px'
            }"
          ></div>
        </div>
        <!-- 预览 -->
        <div class="vic-preview-box">
          <ul>
            <li>
              <div class="vic-pb-square">
                <img :src="ImgUrl" />
                <br />
                <span>方形预览</span>
              </div>
            </li>
            <li>
              <div class="vic-pb-cricle">
                <img :src="ImgUrl" />
                <br />
                <span>圆形预览</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- 按钮 -->
        <div class="vic-actions">
          <div class="vic-right-btn">
            <!-- 美化:隐藏上传框 -->
            <input
              type="file"
              accept="image/*"
              style="display:none;"
              ref="file"
              @change="uploadImage"
            />
            <button @click="toggleUploadImage">
              {{ status === 0 ? "上传图片" : "重新上传" }}
            </button>
            <button @click="saveImage">保存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueDebounce } from "./utils/index";

export default {
  data() {
    let canvasW = 352,
      markW = 300;
    return {
      //画布宽高
      CanvasWidth: canvasW,
      CanvasHeight: canvasW,

      // 遮罩层大小
      MarkWidth: markW,
      MarkHeight: markW,

      // 遮罩层位置
      MarkLeft: (canvasW - markW) / 2,
      MarkTop: (canvasW - markW) / 2,

      // 上传图片的大小和位置
      ImageWidth: 0,
      ImageHeight: 0,
      ImageLeft: 0,
      ImageTop: 0,

      // 图片链接
      ImgUrl: null,

      // 组件状态  0:未上传image 1:正在编辑
      status: 0
    };
  },
  mounted() {
    console.log(this.model);
  },
  props: {
    // 组件显示状态
    isVisible: {
      type: Boolean,
      default: false
    },
    // 图片输出模式
    model: {
      type: String,
      default: "base64"
    }
  },
  methods: {
    /* 关闭组件 */
    close() {
      // 修改组件状态--未上传image
      this.status = 0;
      // 关闭组件
      this.$emit("update:isVisible", false);
      // 清空预览image
      this.ImgUrl = null;
    },
    /* 触发 上传图片 */
    toggleUploadImage() {
      this.$refs.file.click();
    },
    /* 上传图片 */
    uploadImage() {
      // 获取文件
      let file = this.$refs.file.files[0];
      if (!file) return; //

      // 把上传的文件 绘制到 canvas
      // 先基于 FileReader 进行文件的读取

      let fileData = new FileReader();
      fileData.readAsDataURL(file);
      fileData.onload = ev => {
        // 创建新的图片
        this.newImage = new Image();
        this.newImage.src = ev.target.result;
        this.newImage.onload = () => {
          // 获取图片宽高
          this.ImageWidth = this.newImage.width;
          this.ImageHeight = this.newImage.height;

          // 重新按照比例计算宽高
          let n = 1; //宽或高的缩放比例
          if (this.ImageWidth > this.ImageHeight) {
            n = this.ImageWidth / this.CanvasWidth;
            this.ImageWidth = this.CanvasWidth; //最大是canvas的宽度
            this.ImageHeight = this.ImageHeight / n;
          } else {
            n = this.ImageHeight / this.CanvasHeight;
            this.ImageHeight = this.CanvasHeight; //最大是canvas的高度
            this.ImageWidth = this.ImageWidth / n;
          }

          // 计算图片位置
          this.ImageLeft = (this.CanvasWidth - this.ImageWidth) / 2;
          this.ImageTop = (this.CanvasHeight - this.ImageHeight) / 2;

          // 绘制图片
          this.drawImage(this.newImage);
          this.previewImage();

          // 修改组件状态---正在编辑状态
          this.status = 1;
          //*--- newImage.onload --- END ---
        };
      };
    },
    /* 绘制图片 */
    drawImage() {
      // 创建 2d 的渲染画布
      this.CTX = this.$refs.canvas.getContext("2d");

      // 清空画布
      this.CTX.clearRect(0, 0, this.CanvasWidth, this.CanvasHeight);

      // 绘制图片
      this.CTX.drawImage(
        this.newImage,
        this.ImageLeft,
        this.ImageTop,
        this.ImageWidth,
        this.ImageHeight
      );
    },
    /* 改变图像大小 */
    makeScaleChange(type) {
      if (type === 0) {
        // 缩小
        this.ImageWidth -= 20;
        this.ImageHeight -= 20;
      } else {
        // 放大
        this.ImageWidth += 20;
        this.ImageHeight += 20;
      }

      // 计算图片位置
      //   this.ImageLeft = (this.CanvasWidth - this.ImageWidth) / 2;
      //   this.ImageTop = (this.CanvasHeight - this.ImageHeight) / 2;

      // 图片重新绘制
      this.drawImage();
    },
    /* touch 开始 */
    mouseDown(ev) {
      if (!this.newImage) return;

      //  按下时获取鼠标的坐标
      this.startX = ev.clientX;
      this.startY = ev.clientY;
      this.isDrop = true;
    },
    /* touch 移动 */
    mouseMove(ev) {
      if (!this.isDrop) return;

      if (!this.newImage) return;

      this.changeX = ev.clientX - this.startX;
      this.changeY = ev.clientY - this.startY;

      // 10像素的误差偏移
      if (Math.abs(this.changeX) > 10 || Math.abs(this.changeY) > 10) {
        // 重新设置位置
        this.ImageLeft += this.changeX;
        this.ImageTop += this.changeY;

        // 重新绘制
        this.drawImage();

        // 重置起始位置
        this.startX = ev.clientX;
        this.startY = ev.clientY;
      }
    },
    /* ---------------- */
    /* 鼠标抬起 停止移动 */
    mouseUp() {
      this.isDrop = false;
      this.previewImage();
    },
    /* ---------------- */
    /* 监听滚轮滑动 */
    Wheel(ev) {
      if (!this.newImage) return;

      // 判断放大和缩小
      ev.deltaY > 0 ? this.makeScaleChange(1) : this.makeScaleChange(0);

      this.previewImageDebounce();
    },
    previewImageDebounce: VueDebounce("previewImage", 600),

    /* 预览图片 */
    previewImage() {
      if (!this.newImage) return;

      // 获取指定区域的像素信息
      let imageData = this.CTX.getImageData(
        this.MarkLeft,
        this.MarkTop,
        this.MarkWidth,
        this.MarkHeight
      );

      //创建新的画布 放进去 大小额mark 一样大
      let canvas2 = document.createElement("canvas"),
        canvas2CTX = canvas2.getContext("2d");
      canvas2.width = this.MarkWidth;
      canvas2.height = this.MarkHeight;

      // 把像素信息放置到画布当中
      canvas2CTX.putImageData(
        imageData,
        0,
        0,
        0,
        0,
        this.MarkWidth,
        this.MarkHeight
      );

      // 把画布中的内容生成图片的base64
      const base64 = canvas2.toDataURL("image/png");

      this.ImgUrl = base64;
    },
    /* 确定生成图片 */
    saveImage() {
      // 将图片数据传递到父组件
      this.$emit("transmitImageData", this.ImgUrl);
      this.close();
    }
  }
};
</script>

<style scoped lang="less">
@import url(./style/index.less);
</style>
