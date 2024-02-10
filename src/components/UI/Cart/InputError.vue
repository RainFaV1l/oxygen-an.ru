<template>
  <div class="relative w-full">
    <slot></slot>
    <transition>
      <p v-if="condition" class="absolute -top-3 left-0 bg-white text-red-500 px-5 text-sm">{{ message }}</p>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    condition: {
      required: true
    },
    message: {
      type: String,
      required: true
    },
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