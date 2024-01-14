<template>
  <svg :width="newWidth ? newWidth : width" :height="newHeight ? newHeight : height" :viewBox="viewBox" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :d="newWidth || newHeight ? scaledCirclePath : originalCirclePath" fill="#0077FF"/>
    <path :d="newWidth || newHeight ? scaledIconPath : originalIconPath" fill="white"/>
  </svg>
</template>

<script>
export default {
  data() {
    return {
      width: 40,
      height: 40,
      originalCirclePath: 'M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z',
      originalIconPath: "M29.737 13.8816C29.8827 13.3737 29.737 13 29.0358 13H26.7155C26.1245 13 25.8527 13.3209 25.707 13.6784C25.707 13.6784 24.5252 16.6481 22.8549 18.5737C22.3152 19.1303 22.067 19.3091 21.7715 19.3091C21.6258 19.3091 21.4012 19.1303 21.4012 18.6225V13.8816C21.4012 13.2722 21.2358 13 20.7473 13H17.0994C16.7291 13 16.5085 13.2844 16.5085 13.5484C16.5085 14.1253 17.3436 14.2594 17.4303 15.8844V19.4106C17.4303 20.1825 17.2964 20.3247 17.0009 20.3247C16.213 20.3247 14.2985 17.3428 13.1639 13.9303C12.9355 13.2681 12.7109 13 12.1161 13H9.79576C9.13394 13 9 13.3209 9 13.6784C9 14.3122 9.78788 17.4606 12.6676 21.6206C14.5861 24.4603 17.2885 26 19.7467 26C21.2239 26 21.4052 25.6587 21.4052 25.0697C21.4052 22.3559 21.2712 22.1 22.0118 22.1C22.3545 22.1 22.9455 22.2787 24.3242 23.6478C25.9 25.2728 26.16 26 27.0424 26H29.3627C30.0245 26 30.3594 25.6587 30.1664 24.9844C29.7252 23.5666 26.743 20.6497 26.6091 20.4547C26.2664 19.9997 26.3649 19.7966 26.6091 19.3903C26.613 19.3862 29.4455 15.275 29.737 13.8816Z",
    }
  },
  computed: {
    scaledCirclePath() {
      // Вычисление коэффициентов масштабирования
      const widthScale = this.newWidth / this.width;
      const heightScale = this.newHeight / this.height;
      return this.originalCirclePath.replace(/(\d+(\.\d+)?)/g, match => parseFloat(match) * (widthScale > heightScale ? heightScale : widthScale));
    },
    scaledIconPath() {
      // Вычисление коэффициентов масштабирования
      const widthScale = this.newWidth / this.width;
      const heightScale = this.newHeight / this.height;
      return this.originalIconPath.replace(/(\d+(\.\d+)?)/g, match => parseFloat(match) * (widthScale > heightScale ? heightScale : widthScale));
    },
    viewBox() {
      const resultWidth = this.newWidth ? this.newWidth : this.width
      const resultHeight = this.newHeight ? this.newHeight : this.height
      return `0 0 ${resultWidth} ${resultHeight}`
    }
  },
  props: {
    newWidth: {
      type: Number,
      required: false,
    },
    newHeight: {
      type: Number,
      required: false,
    }
  }
}
</script>

<style scoped>

</style>