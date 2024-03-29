<template>
  <div class="bg-bg fixed h-full w-full z-50 flex justify-center items-center preloader">
    <div class="flex flex-col gap-2">
      <a class="h-8 w-[108px] sm:h-12 sm:w-auto flex items-center">
        <img class="h-full w-full object-contain" :src="logo" alt="logo">
      </a>
      <p class="text-lg preloader-subtitle">brand</p>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/images/logo/logo.png";
export default {
  data() {
    return {
      logo,
    }
  },
  methods: {

    loaded() {

      const preloader = document.querySelector('.preloader')

      const body = document.querySelector('body')

      body.classList.remove("overflow-hidden")

      preloader.classList.add('loaded')

    }

  },
  mounted() {

    const body = document.querySelector('body')

    body.classList.add("overflow-hidden")

    setTimeout(() => {

      const subtitle = document.querySelector('.preloader-subtitle')

      subtitle.style.opacity = "1"

    }, 500)

    setTimeout(() => {

      this.loaded()

    }, 1100)

  }
}
</script>

<style scoped>

.preloader {
  transition: .3s ease-in-out;
  opacity: 1;
}

.preloader.loaded {
  opacity: 0;
  z-index: -10;
}

.preloader-subtitle {
  transition: .3s ease-in-out;
  opacity: 0;
}

</style>