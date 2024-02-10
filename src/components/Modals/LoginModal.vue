<template>
  <div class="cart-modal modal fixed w-full h-full z-10 bg-black bg-opacity-60 flex justify-center items-center" @click="closeModal">
    <div class="cart-modal__content modal__content bg-white z-20">
      <div class="absolute top-2 right-2 p-5 z-25">
        <XMarkIcon class="cursor-pointer h-9 w-9 text-dark md:text-white stroke-1 close-icon"></XMarkIcon>
      </div>
      <div class="flex flex-col items-center gap-12">
        <div class="flex flex-col items-center gap-4">
          <h1 class="text-3xl font-medium">Авторизации</h1>
          <p class="text-base font-medium">Аккаунт позволяет просматривать историю заказов</p>
        </div>
        <form class="flex flex-col gap-7 w-96">
          <input class="input" type="text" placeholder="Email">
          <input class="input" type="password" placeholder="Пароль">
          <button class="button">Войти</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {XMarkIcon} from "@heroicons/vue/24/outline";

export default {
  components: {XMarkIcon},
  methods: {
    closeModal(event) {
      if (event.target.classList.contains('size-zoom-modal') || event.target.closest('.size-zoom-modal__close')) {
        this.$store.commit('product/setIsSizeZoomModal', {
          condition: false,
        })
      }
    }
  }

}
</script>

<style scoped>
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