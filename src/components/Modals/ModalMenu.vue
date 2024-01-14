<template>
  <div class="modal-menu fixed left-0 top-0 w-full h-full z-10 bg-black bg-opacity-60" @click="closeModal">
    <div class="modal-menu__content h-full w-1/4 bg-yellow z-20">
      <div class="flex justify-end p-5">
        <XMarkIcon class="cursor-pointer h-9 w-9 text-dark stroke-1 close-icon"></XMarkIcon>
      </div>
      <nav class="p-8">
        <ul class="flex flex-col gap-4 text-sm">
          <li v-for="mobileMenuModalEl in mobileMenuModalEls" :key="mobileMenuModalEl.id">{{ mobileMenuModalEl.title }}</li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
  import { XMarkIcon } from '@heroicons/vue/24/outline'
</script>

<script>
export default {
  props: {
    mobileMenuModalEls: {
      type: Array,
    },
  },
  methods: {
    closeModal(event) {
      if (event.target.classList.contains('modal-menu') || event.target.closest('.close-icon')) {
        this.$emit('closeModalMenu');
      }
    }
  }
}
</script>

<style scoped>

</style>