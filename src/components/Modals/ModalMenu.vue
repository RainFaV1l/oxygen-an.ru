<template>
  <div class="modal-menu fixed left-0 top-0 w-full h-full z-20 bg-black bg-opacity-60" @click="closeModal">
    <div class="modal-menu__content h-full w-full sm:overflow-hidden overflow-auto sm:w-1/2 2xl:w-1/4 bg-yellow z-20">
      <div class="flex justify-end p-5">
        <XMarkIcon class="cursor-pointer h-9 w-9 text-dark stroke-1 close-icon"></XMarkIcon>
      </div>
      <nav class="p-5 sm:p-8 flex items-start flex-col gap-4">
        <ul class="flex flex-col gap-4 text-sm">
          <li><button @click="setSelectedCategory(0)">Вся одежда</button></li>
          <li v-for="category in getCategories" :key="category.id"><button @click="setSelectedCategory(category.id)">{{ category.name }}</button></li>
          <li v-for="(mobileMenuModalEl, index) in mobileMenuModalEls" :key="index">
            <button @click="$router.push(mobileMenuModalEl.route)" v-if="mobileMenuModalEl.route">{{ mobileMenuModalEl.title }}</button>
            <button v-if="!mobileMenuModalEl.route">{{ mobileMenuModalEl.title }}</button>
          </li>
        </ul>
        <button :style="{ 'hidden' : isAuth }" v-if="!isAuth" @click="setLoginModalOpen({ condition: true })" class="button px-14 mt-4">Войти</button>
      </nav>
      <div class="flex flex-wrap gap-7 p-5 sm:p-8">
        <button class="button" @click="$router.push('/profile')" v-if="isAuth">Профиль</button>
        <button class="button bg-transparent hover:bg-white hover:text-dark" @click="this.logout()" v-if="isAuth">Выйти из аккаунта</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { XMarkIcon } from '@heroicons/vue/24/outline'
</script>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
// import axios from "axios";

export default {
  data() {
    return {
      isAuth: JSON.parse(localStorage.getItem('token')) || false
    }
  },
  props: {
    mobileMenuModalEls: {
      type: Array,
    },
  },
  methods: {
    ...mapActions('auth', ['setLoginModalOpen', 'isAuthCheck', 'logout']),
    ...mapMutations('auth', ['setIsModalMenuOpen']),
    ...mapActions('product', ['fetchCategories', 'setSelectedCategory']),
    closeModal(event) {
      if(event.target.classList.contains('modal-menu') || event.target.closest('.close-icon')) {
        this.setIsModalMenuOpen(false)
      }
    },

    // async isAuthCheck() {
    //
    //   const response = await axios.post(this.getBackendGetUserUrl)
    //
    //   if(response.data.id) {
    //
    //     this.isAuth = true
    //
    //   }
    //
    // }
  },
  computed: {
    ...mapGetters('product', ['getCategories', 'getSelectedCategory', 'getFilteredProducts',]),
  },
  mounted() {

    this.fetchCategories()

    // const token = localStorage.getItem('token')

    // token ? this.isAuthCheck() : ''

  },
}
</script>

<style scoped>

</style>