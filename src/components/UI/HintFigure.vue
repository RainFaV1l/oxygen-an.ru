<template>
  <div class="items-center hidden sm:flex">
    <div :class="{ 'text-xs': hint.xs }" class="py-3 px-4 bg-dark text-white text-sm font-bold rounded">{{ hint.name }}</div>
    <div class="
        border-l-14 border-r-14 border-b-16
        border-l-transparent border-r-transparent
        border-b-dark rotate-90 -ml-2
    "
    :class="{ 'border-l-12': hint.xs, 'border-r-12': hint.xs, 'border-b-14': hint.xs }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    hint: {
      type: Object,
      required: true,
    },
  }
}
</script>

<style scoped>

</style>