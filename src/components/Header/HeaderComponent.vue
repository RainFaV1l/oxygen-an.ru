<template>
  <header>
    <div class="container py-5 flex justify-between items-center">
      <div class="w-16 h-16 flex flex-col justify-center items-center gap-4 cursor-pointer" @click="toggleMenu">
        <div class="w-full border border-dark rounded-full"></div>
        <div class="w-full border border-dark rounded-full"></div>
      </div>
      <a class="text-4xl font-medium cursor-pointer" @click="$router.push(`/`)">Example</a>
      <div>
        <div class="flex items-center gap-8">
          <MagnifyingGlassIcon class="h-11 w-11 text-dark stroke-1 cursor-pointer" @click="toggleSearch"/>
          <div class="flex items-center gap-2 cursor-pointer" @click="setCartModalOpen({
            condition: true
          })">
            <ShoppingBagIcon class="h-11 w-11 text-dark stroke-1"/>
            <p class="text-2xl select-none">{{ cartItems ? cartItems.length : 0 }}</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
  import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'
</script>

<script>
import {mapActions, mapGetters} from "vuex";

export default {

  computed: {
    ...mapGetters('cart', ['cartItems']),
  },

  methods: {

    ...mapActions('cart', ['setCartModalOpen']),

    toggleMenu() {
      this.$emit('toggle-menu');
    },

    toggleSearch() {
      this.$emit('toggle-search');
    }

  }
}
</script>

<style scoped>

</style>