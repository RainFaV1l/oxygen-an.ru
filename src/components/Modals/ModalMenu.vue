<template>
  <div class="modal-menu fixed left-0 top-0 w-full h-full z-20 bg-black bg-opacity-60" @click="closeModal">
    <div class="modal-menu__content h-full w-full sm:overflow-hidden overflow-auto sm:w-1/2 2xl:w-1/4 bg-yellow z-20">
      <div class="flex justify-end p-5">
        <XMarkIcon class="cursor-pointer h-9 w-9 text-dark stroke-1 close-icon"></XMarkIcon>
      </div>
      <nav class="p-5  sm:p-8">
        <ul class="flex flex-col gap-4 text-sm">
          <li><button @click="setSelectedCategory(0)">Вся одежда</button></li>
          <li v-for="category in getCategories" :key="category.id"><button @click="setSelectedCategory(category.id)">{{ category.name }}</button></li>
          <li v-for="mobileMenuModalEl in mobileMenuModalEls" :key="mobileMenuModalEl.id">
            <button @click="$router.push(mobileMenuModalEl.route)" v-if="mobileMenuModalEl.route">{{ mobileMenuModalEl.title }}</button>
            <button v-if="!mobileMenuModalEl.route">{{ mobileMenuModalEl.title }}</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
  import { XMarkIcon } from '@heroicons/vue/24/outline'
</script>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    mobileMenuModalEls: {
      type: Array,
    },
  },
  methods: {
    ...mapActions('product', ['fetchCategories', 'setSelectedCategory']),
    closeModal(event) {
      if (event.target.classList.contains('modal-menu') || event.target.closest('.close-icon')) {
        this.$emit('closeModalMenu');
      }
    }
  },
  computed: {
    ...mapGetters('product', ['getCategories', 'getSelectedCategory', 'getFilteredProducts',]),
  },
  mounted() {
    this.fetchCategories()
  },
}
</script>

<style scoped>

</style>