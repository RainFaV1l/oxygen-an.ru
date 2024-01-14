<template>
  <svg :width="newWidth ? newWidth : width" :height="newHeight ? newHeight : height" :viewBox="viewBox" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path :d="newWidth || newHeight ? scaledCirclePath : originalCirclePath" fill="#EE2A7B"/>
    <path :d="newWidth || newHeight ? scaledIconPath : originalIconPath" fill="white"/>
    <path :d="newWidth || newHeight ? scaledSecondIconPath : secondIconPath" fill="white"/>
    <path :d="newWidth || newHeight ? scaledThirdIconPath : thirdIconPath" fill="white"/>
  </svg>
</template>

<script>
export default {
  data() {
    return {
      width: 40,
      height: 40,
      originalCirclePath: 'M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z',
      originalIconPath: "M14.8857 10.0263C13.5236 10.1623 12.4246 10.651 11.5505 11.5051C10.74 12.304 10.2392 13.3281 10.0568 14.5605C9.99738 14.9599 9.99313 15.6143 10.0059 19.715C10.0186 24.8696 10.0016 24.5126 10.2774 25.388C10.8545 27.2237 12.3397 28.5198 14.3426 28.9235C14.699 28.9957 15.0555 29 19.5195 29H24.3145L24.7601 28.9023C26.9412 28.4178 28.4136 26.9518 28.855 24.8228C28.9907 24.1642 29.012 23.3653 28.995 19.0988C28.9738 14.5222 28.9823 14.6327 28.7277 13.7446C28.5919 13.2644 28.2227 12.5165 27.9426 12.1425C27.2722 11.2544 26.432 10.651 25.3839 10.3025C24.4631 10.0008 24.6455 10.0093 19.6893 10.0008C17.2408 9.99657 15.0767 10.0093 14.8857 10.0263ZM24.2806 11.8323C25.316 12.0023 26.1434 12.5165 26.6569 13.3111C26.903 13.6851 27.0345 13.9953 27.1703 14.4882L27.2849 14.8919L27.2976 19.2476C27.3104 23.7732 27.3019 24.0749 27.1364 24.6783C26.8436 25.7194 26.0204 26.6203 25.0359 26.9773C24.2424 27.2662 24.497 27.2492 19.8166 27.2662C16.9862 27.279 15.4162 27.2705 15.0979 27.2407C13.443 27.0793 12.2718 26.1571 11.9069 24.7251C11.7372 24.0579 11.7287 23.7392 11.7456 19.2263C11.7626 14.5732 11.7541 14.7007 11.979 14.0633C12.4246 12.7842 13.4769 11.9811 14.9367 11.7983C15.0088 11.7898 17.0499 11.7771 19.4771 11.7771C23.2028 11.7686 23.9496 11.7771 24.2806 11.8323Z",
      secondIconPath: "M24.2211 13.3965C23.7544 13.575 23.487 13.9574 23.487 14.4504C23.487 15.4277 24.6412 15.9207 25.3456 15.2408C25.8845 14.7266 25.7487 13.8002 25.0825 13.4603C24.8746 13.354 24.4206 13.32 24.2211 13.3965Z",
      thirdIconPath: "M18.6581 14.6326C17.6185 14.8323 16.7401 15.2913 16.0187 16.0179C14.1049 17.9344 14.1049 21.028 16.0187 22.9445C17.8349 24.7675 20.7161 24.8695 22.6808 23.191C23.4531 22.5281 23.9963 21.6314 24.2636 20.5733C24.34 20.2589 24.3569 20.0931 24.3527 19.46C24.3527 18.8013 24.34 18.6696 24.2424 18.3084C23.7544 16.4939 22.4432 15.1851 20.6482 14.7134C20.139 14.5816 19.1503 14.5391 18.6581 14.6326ZM20.3215 16.4514C20.8519 16.5959 21.255 16.8423 21.6836 17.2715C22.1207 17.705 22.3583 18.1044 22.5153 18.6781C22.6341 19.0945 22.6426 19.7617 22.5408 20.1909C22.2819 21.2532 21.5012 22.1031 20.453 22.4601C20.0032 22.613 19.2819 22.6513 18.8066 22.5451C18.1743 22.4048 17.4742 21.9756 17.0753 21.4827C16.7952 21.1385 16.5109 20.5606 16.4218 20.1611C16.3115 19.6767 16.3497 18.9585 16.5025 18.5039C16.8844 17.3735 17.8731 16.5364 19.0315 16.3621C19.3922 16.3069 19.9438 16.3451 20.3215 16.4514Z",
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
    scaledThirdIconPath() {
      // Вычисление коэффициентов масштабирования
      const widthScale = this.newWidth / this.width;
      const heightScale = this.newHeight / this.height;
      return this.thirdIconPath.replace(/(\d+(\.\d+)?)/g, match => parseFloat(match) * (widthScale > heightScale ? heightScale : widthScale));
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