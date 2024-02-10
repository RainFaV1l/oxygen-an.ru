<template>
  <Transition>
    <p class="
    text-sm text-red-500 font-medium w-full rounded
    bg-white py-4 px-6 border border-dark text-center
    ">{{ error }}</p>
  </Transition>

</template>

<script>
export default {
  props: {
    error: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
  /* we will explain what these classes do next! */
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>