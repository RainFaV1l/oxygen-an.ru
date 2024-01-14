<template>
  <svg :width="newWidth ? newWidth : width" :height="newHeight ? newHeight : height" :viewBox="viewBox" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :d="newWidth || newHeight ? scaledCirclePath : originalCirclePath" fill="#27D061"/>
    <path :d="newWidth || newHeight ? scaledIconPath : originalIconPath" fill="white"/>
    <path :d="newWidth || newHeight ? scaledSecondIconPath : secondIconPath" fill="white"/>
  </svg>
</template>

<script>
export default {
  data() {
    return {
      width: 40,
      height: 40,
      originalCirclePath: 'M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z',
      originalIconPath: "M19.3564 10.0557C14.992 10.5948 11.5591 14.099 11.1072 18.4753C11.0398 19.1214 11.0794 20.3503 11.1904 20.9726C11.3609 21.9518 11.6463 22.8159 12.0903 23.6999L12.3123 24.1439L11.6503 26.5659C11.2856 27.9018 10.9922 28.9959 11.0002 28.9998C11.0081 29.0078 12.118 28.7184 13.4698 28.3616C15.4359 27.8423 15.9473 27.7195 16.0266 27.7512C16.0821 27.771 16.3397 27.8859 16.6014 28.0049C17.4497 28.3894 18.3416 28.6431 19.2811 28.7699C19.9351 28.8571 21.0807 28.8571 21.715 28.7699C23.8001 28.4766 25.6592 27.5569 27.1259 26.0902C27.8949 25.3252 28.4063 24.6235 28.8899 23.6682C29.3259 22.808 29.6351 21.8685 29.8096 20.8775C29.9087 20.2988 29.9087 18.5903 29.8096 17.9838C29.6391 16.9571 29.3735 16.1365 28.9256 15.2287C27.6452 12.6481 25.2826 10.8088 22.4563 10.1944C21.5762 10.0041 20.2641 9.94467 19.3564 10.0557ZM21.8339 11.6968C22.9716 11.9069 23.915 12.2874 24.8466 12.9098C26.4401 13.9761 27.6095 15.6291 28.0733 17.4605C28.4142 18.8083 28.3865 20.3384 28.002 21.6346C27.3756 23.7277 25.8891 25.4917 23.9388 26.443C22.8051 26.998 21.7586 27.2398 20.4861 27.2398C19.0274 27.2398 17.739 26.887 16.419 26.1259L16.197 25.9991L14.7383 26.3836C13.9375 26.5937 13.2716 26.7602 13.2676 26.7522C13.2597 26.7443 13.4222 26.118 13.6323 25.3569C13.8384 24.5958 14.0128 23.9457 14.0128 23.914C14.0168 23.8783 13.9137 23.6801 13.7869 23.474C11.9159 20.4296 12.4074 16.418 14.9563 13.881C16.2248 12.6204 17.8342 11.8434 19.6339 11.6215C20.1214 11.562 21.3344 11.6056 21.8339 11.6968Z",
      secondIconPath: "M16.7837 15.1575C16.5578 15.2685 16.1376 15.764 15.9631 16.1287C15.6183 16.8422 15.6262 17.746 15.983 18.5785C16.419 19.6052 17.5646 21.0639 18.6944 22.0312C19.4872 22.709 20.1492 23.1094 21.1204 23.4899C22.1154 23.8784 22.3056 23.922 22.9637 23.922C23.4829 23.922 23.5662 23.9141 23.804 23.8229C24.2004 23.6723 24.4977 23.486 24.7911 23.1966C25.021 22.9706 25.0686 22.8993 25.1439 22.6614C25.2351 22.3602 25.2906 21.8805 25.2469 21.714C25.2271 21.6268 25.1122 21.5555 24.5493 21.274C23.5186 20.7587 23.1024 20.5803 22.928 20.5803C22.7813 20.5803 22.7575 20.5962 22.5831 20.8261C22.1827 21.3533 21.8141 21.7616 21.7189 21.7854C21.604 21.8131 21.378 21.7299 20.8587 21.4683C20.0144 21.0481 19.3286 20.4812 18.738 19.7241C18.4169 19.3118 18.1275 18.8441 18.1275 18.7331C18.1275 18.6895 18.2782 18.4556 18.4605 18.2177C18.8173 17.754 18.9203 17.5795 18.9203 17.4487C18.9203 17.4051 18.841 17.1871 18.7499 16.9611C18.6547 16.7392 18.4645 16.2793 18.3257 15.9424C18.1513 15.5222 18.0324 15.2883 17.9452 15.1971L17.8183 15.0703H17.3902C17.0295 15.0703 16.9304 15.0861 16.7837 15.1575Z",
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
    scaledSecondIconPath() {
      // Вычисление коэффициентов масштабирования
      const widthScale = this.newWidth / this.width;
      const heightScale = this.newHeight / this.height;
      return this.secondIconPath.replace(/(\d+(\.\d+)?)/g, match => parseFloat(match) * (widthScale > heightScale ? heightScale : widthScale));
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