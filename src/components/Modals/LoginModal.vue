<template>
  <div class="cart-modal modal fixed w-full h-full z-30 bg-black bg-opacity-60 flex justify-center items-center" @click="closeModal">
    <TopErrorMessages v-if="getErrors.errors">
      <div class="w-96 smooth-error transition" v-for="(error, index) in getErrors.errors" :key="index">
        <ErrorMessage :error="error[0]"/>
      </div>
    </TopErrorMessages>
    <TopErrorMessages v-if="getErrors.error">
      <div class="w-96 smooth-error transition">
        <ErrorMessage :error="getErrors.error"/>
      </div>
    </TopErrorMessages>
    <div class="cart-modal__content modal__content h-full sm:h-auto bg-white z-40 rounded">
      <div class="absolute top-2 right-2 p-5 z-40 hidden sm:flex">
        <XMarkIcon class="cursor-pointer h-9 w-9 text-white stroke-1 close-icon"></XMarkIcon>
      </div>
      <div class="relative flex flex-col justify-center gap-8 px-8 py-12 sm:gap-12 sm:py-24 sm:px-8 cart-form h-full">
        <div class="absolute top-0 right-0 p-5 z-40 flex sm:hidden">
          <XMarkIcon class="cursor-pointer h-9 w-9 text-dark stroke-1 close-icon"></XMarkIcon>
        </div>
        <div class="flex flex-col justify-center items-center gap-12">
          <div class="flex flex-col items-center gap-4">
            <h1 class="text-xl sm:text-3xl font-medium">Авторизации</h1>
            <p class="text-sm sm:text-base font-medium text-center">Аккаунт позволяет просматривать историю заказов</p>
          </div>
          <form class="flex flex-col gap-7 w-full sm:w-96">
            <input v-model="email" class="input font-medium w-full text-sm sm:text-base" type="text" placeholder="Email">
            <input v-model="password" class="input font-medium w-full text-sm sm:text-base" type="password" placeholder="Пароль">
            <button class="button" @click.prevent="login({
              'email': this.email,
              'password': this.password,
            })">Войти</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {XMarkIcon} from "@heroicons/vue/24/outline";
import {mapActions, mapGetters, mapMutations} from "vuex";
import ErrorMessage from "@/components/UI/Login/ErrorMessage.vue";
import TopErrorMessages from "@/components/UI/Login/TopErrorMessages.vue";

export default {
  components: {TopErrorMessages, ErrorMessage, XMarkIcon},
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters('auth', ['getErrors']),
  },
  methods: {
    ...mapActions('auth', ['login', 'setLoginModalOpen', 'isAuthCheck']),
    ...mapMutations('auth', ['setError']),

    closeModal(event) {

      if (event.target.classList.contains('cart-modal') || event.target.closest('.close-icon')) {

        this.setError({})

        this.setLoginModalOpen({
          condition: false,
        })

      }

    }

  },

  mounted() {

    const token = localStorage.getItem('token')

    token ? this.isAuthCheck() : ''

  },

}
</script>

<style scoped>

  .smooth-error {
    position: absolute;
    z-index: -1;
    opacity: 0;
    transform: translateY(-50px);
  }

  .smooth-error.show {
    position: relative;
    z-index: 50;
    opacity: 1;
    transform: translateY(0px);
  }

    /* Стили скроллбара для Chrome, Safari и Opera */
  .cart-form::-webkit-scrollbar {
    width: 5px;  /* Ширина скроллбара */
  }

  .cart-form::-webkit-scrollbar-track {
    background: transparent;  /* Цвет фона скроллбара */
  }

  .cart-form::-webkit-scrollbar-thumb {
    background: #48413c;  /* Цвет ползунка скроллбара */
    border-radius: 4px;
  }

  .cart-form::-webkit-scrollbar-thumb:hover {
    background: #555;  /* Цвет ползунка скроллбара при наведении */
  }

  /* Стили скроллбара для Firefox */
  .cart-form::-moz-scrollbar {
    width: 5px;  /* Ширина скроллбара */
  }

  .cart-form::-moz-scrollbartrack {
    background: #f1f1f1;  /* Цвет фона скроллбара */
  }

  .cart-form::-moz-scrollbarthumb {
    background: #48413c;  /* Цвет ползунка скроллбара */
    border-radius: 4px;
  }

  ::-moz-scrollbarthumb:hover {
    background: #555;  /* Цвет ползунка скроллбара при наведении */
  }
</style>