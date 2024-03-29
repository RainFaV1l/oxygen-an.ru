<template>
  <header class="flex flex-col items-center pb-16">
    <div class="container py-5 flex flex-wrap justify-between items-center">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 sm:w-16 sm:h-16 flex flex-col justify-center items-center gap-3 sm:gap-4 cursor-pointer"
            @click="setIsModalMenuOpen(true)">
          <div class="w-full border border-dark rounded-full"></div>
          <div class="w-full border border-dark rounded-full"></div>
        </div>
        <MagnifyingGlassIcon class="h-6 w-6 sm:h-11 sm:w-11 text-dark stroke-1 cursor-pointer block sm:hidden" @click="toggleSearch"/>
      </div>
      <a class="cursor-pointer h-5 w-[72px] sm:h-8 sm:w-[144px] ml-[10px] sm:ml-[110px] md:h-12 md:ml-[110px] flex items-center"
         @click="$router.push(`/`)">
        <img class="h-full w-full object-contain" :src="logo" alt="logo">
      </a>
      <div>
        <div class="flex flex-wrap items-center gap-3 sm:gap-8">
          <MagnifyingGlassIcon class="h-6 w-6 sm:h-11 sm:w-11 text-dark stroke-1 cursor-pointer sm:block hidden" @click="toggleSearch"/>
          <button class="profile" @click="toggleProfile()">
            <UserIcon class="h-6 w-6 sm:h-11 sm:w-11 text-dark stroke-1 cursor-pointer"/>
          </button>
          <div class="flex items-center gap-2 cursor-pointer" @click="setCartModalOpen({
            condition: true
          })">
            <ShoppingBagIcon class="h-6 w-6 sm:h-11 sm:w-11 text-dark stroke-1"/>
            <p :class="cartItems.length > 10 ? 'w-6' : 'w-3'" class="text-xl sm:text-2xl select-none w-3">{{
                cartItems && cartItems.length > 0 ? cartItems.length : 0
              }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="h-[85vh] sm:h-full flex items-center">
      <div class="h-24 sm:mr-11 cursor-pointer">
        <img class="h-full w-full object-contain" @click="$router.push(`/`)" :src="bgLogo" alt="logo">
      </div>
    </div>
  </header>
</template>

<script setup>
import {MagnifyingGlassIcon, ShoppingBagIcon, UserIcon} from '@heroicons/vue/24/outline'
</script>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import bgLogo from "@/assets/images/logo/bg-logo.png";
import logo from "@/assets/images/logo/logo.png";

export default {

  data() {
    return {

    }
  },

  computed: {
    ...mapGetters('cart', ['cartItems']),
    ...mapGetters('auth', ['getIsAuth']),
  },

  methods: {

    ...mapActions('auth', ['setLoginModalOpen', 'isAuthCheck', 'logout']),

    ...mapActions('cart', ['setCartModalOpen']),
    ...mapMutations('auth', ['setIsModalMenuOpen']),

    toggleMenu() {
      this.$emit('toggle-menu');
    },

    toggleSearch() {
      this.$emit('toggle-search');
    },

    toggleProfile() {
      if (!this.getIsAuth) {
        this.setLoginModalOpen({condition: true})
      } else {
        this.$router.push('/profile')
      }
      const body = document.querySelector('body')
      setTimeout(() => {
        body.classList.toggle('body-overflow-auto')
      }, 30)
    }

  }
}

</script>

<style scoped>

</style>