<template>
  <svg :width="newWidth ? newWidth : width" :height="newHeight ? newHeight : height" :viewBox="viewBox" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :d="newWidth || newHeight ? scaledCirclePath : originalCirclePath" fill="#039BE5"/>
    <path :d="newWidth || newHeight ? scaledIconPath : originalIconPath" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </svg>
</template>

<script>
export default {
  data() {
    return {
      width: 40,
      height: 40,
      originalCirclePath: 'M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z',
      originalIconPath: 'M29.2 15.1V24.9C29.2 25.457 28.9788 25.9911 28.5849 26.3849C28.1911 26.7788 27.657 27 27.1 27H13.1C12.543 27 12.0089 26.7788 11.6151 26.3849C11.2212 25.9911 11 25.457 11 24.9V15.1M29.2 15.1C29.2 14.543 28.9788 14.0089 28.5849 13.6151C28.1911 13.2212 27.657 13 27.1 13H13.1C12.543 13 12.0089 13.2212 11.6151 13.6151C11.2212 14.0089 11 14.543 11 15.1M29.2 15.1V15.3268C29.2 15.6853 29.1083 16.0379 28.9335 16.3509C28.7587 16.664 28.5066 16.927 28.2013 17.1151L21.2013 21.4224C20.8702 21.6264 20.4889 21.7344 20.1 21.7344C19.7111 21.7344 19.3298 21.6264 18.9987 21.4224L11.9987 17.116C11.6934 16.928 11.4413 16.6649 11.2665 16.3519C11.0917 16.0388 11 15.6863 11 15.3277V15.1',
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