<template>
  <div class="bg-bg fixed h-full w-full z-50 flex justify-center items-center preloader">
      <div class="flex flex-col gap-2">
        <h1 class="text-5xl font-medium">Example</h1>
        <p class="text-lg ml-1 preloader-subtitle">brand</p>
      </div>
  </div>
</template>

<script>
export default {
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