<template>
  <header class="flex flex-col items-center pb-16">
    <div class="container py-5 flex flex-wrap justify-between items-center">
      <div class="w-10 h-10 sm:w-16 sm:h-16 flex flex-col justify-center items-center order-1 sm:order-1 gap-3 sm:gap-4 cursor-pointer" @click="setIsModalMenuOpen(true)">
        <div class="w-full border border-dark rounded-full"></div>
        <div class="w-full border border-dark rounded-full"></div>
      </div>
      <a class="sm:ml-9 mt-8 sm:mt-auto h-12 font-medium cursor-pointer w-full order-3 sm:order-2 sm:w-auto self-center" @click="$router.push(`/`)">
        <img class="h-full w-full object-contain" :src="logo" alt="logo">
      </a>
      <div class="order-2 sm:order-3">
        <div class="flex flex-wrap items-center gap-4 sm:gap-8">
          <MagnifyingGlassIcon class="h-8 w-8 sm:h-11 sm:w-11 text-dark stroke-1 cursor-pointer" @click="toggleSearch"/>
          <div class="flex items-center gap-2 cursor-pointer" @click="setCartModalOpen({
            condition: true
          })">
            <ShoppingBagIcon class="h-8 w-8 sm:h-11 sm:w-11 text-dark stroke-1"/>
            <p class="text-2xl select-none">{{ cartItems && cartItems.length > 0 ? cartItems.length : 0 }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="h-24 sm:mr-11 cursor-pointer">
      <img class="h-full w-full object-contain" @click="$router.push(`/`)" :src="bgLogo" alt="logo">
    </div>
  </header>
</template>

<script setup>
  import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'
</script>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import bgLogo from "@/assets/images/logo/bg-logo.png";
import logo from "@/assets/images/logo/logo.png";

export default {

  computed: {
    ...mapGetters('cart', ['cartItems']),
  },

  methods: {

    ...mapActions('cart', ['setCartModalOpen']),
    ...mapMutations('auth', ['setIsModalMenuOpen']),

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