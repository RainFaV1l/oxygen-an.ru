<template>
  <svg :width="newWidth ? newWidth : width" :height="newHeight ? newHeight : height" :viewBox="viewBox" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :d="newWidth || newHeight ? scaledCirclePath : originalCirclePath" fill="#039BE5"/>
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
      originalIconPath: 'M13.4467 10.0537C12.9623 10.1592 12.8725 10.2295 11.6108 11.4951C10.5092 12.5928 10.4233 12.6904 10.2944 12.9639C10.0795 13.417 10.0287 13.6592 10.0053 14.2998C9.98186 14.9443 10.0326 15.3701 10.228 16.1123C11.4037 20.5771 16.6616 26.4521 21.6928 28.9209C23.185 29.6514 24.3139 29.9717 25.4233 29.9756C26.103 29.9756 26.4467 29.9053 26.9194 29.6748C27.2241 29.5264 27.3022 29.4521 28.3998 28.3584C29.6264 27.1318 29.6967 27.042 29.853 26.5225C29.935 26.249 29.935 25.7334 29.853 25.46C29.7123 24.9912 29.6537 24.9209 28.103 23.3623C27.2866 22.5381 26.5092 21.7881 26.3803 21.6943C25.6069 21.1436 24.6108 21.2217 23.9623 21.8818C23.767 22.0811 23.6889 22.1982 23.5561 22.5146C23.4623 22.7256 23.3412 22.9639 23.2826 23.042C22.9076 23.5498 22.1889 23.8701 21.5756 23.8076C20.6616 23.71 19.2983 22.8818 18.142 21.7256C16.7436 20.3271 15.9194 18.7178 16.1186 17.7803C16.2123 17.3428 16.5209 16.8857 16.8842 16.6436C16.9701 16.5811 17.1576 16.4834 17.2983 16.4248C17.7045 16.2529 17.8022 16.1943 17.9936 16.0303C18.642 15.4639 18.7826 14.4014 18.31 13.6475C18.1733 13.4248 15.478 10.7021 15.1498 10.4482C14.8881 10.249 14.5444 10.0928 14.2358 10.0381C13.9428 9.9834 13.7475 9.9873 13.4467 10.0537Z',
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