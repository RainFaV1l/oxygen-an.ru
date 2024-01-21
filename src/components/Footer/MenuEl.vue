<template>
  <div class="flex flex-col gap-6 sm:w-auto" v-for="menuEl in menuEls" :key="menuEl.id">
    <h4 class="font-bold text-sm sm:text-lg">{{ menuEl.title }}</h4>
    <div class="flex flex-col gap-3 text-sm sm:text-base">
      <a v-for="menuElContent in menuEl.content" :key="menuElContent.id" href="{{ menuElContent.link }}">{{ menuElContent.name }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuEls: {
      type: Array,
    },
  }
}
</script>

<style scoped>

</style>