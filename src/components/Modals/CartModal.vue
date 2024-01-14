<template>
  <div class="cart-modal modal fixed w-full h-full z-10 bg-black bg-opacity-60 flex justify-center items-center" @click="closeModal">
    <div class="cart-modal__content modal__content bg-white z-20">
      <div class="absolute top-2 right-2 p-5">
        <XMarkIcon class="cursor-pointer h-9 w-9 text-white stroke-1 close-icon"></XMarkIcon>
      </div>
      <form class="flex flex-col gap-12 px-9 py-12 overflow-auto h-screen cart-form">
        <div class="flex flex-col gap-12">
          <h2 class="text-2xl font-bold">Ваш заказ:</h2>
          <div v-if="cartItems.length > 0" class="flex flex-col gap-7 border-t border-t-dark border-b border-b-dark border-opacity-25">
            <div v-for="(item, index) in cartItems" :key="index" class="flex justify-between items-center gap-4 py-4">
              <div class="flex justify-start items-center gap-6 w-2/5">
                <div class="w-16 h-16">
                  <img class="w-full h-full object-cover" :src="imageRequire(item.imagePath)" alt="Изображение товара">
                </div>
                <span class="text-base font-bold">{{ item.name }}</span>
              </div>
              <div class="flex gap-3 items-center justify-center w-1/5">
                <button @click.prevent="decreaseObject(index, counterItems[index].count !== 1, 'cartItems')" class="border opacity-40 border-dark rounded-full w-5 h-5 p-1 cursor-pointer"><MinusIcon/></button>
                <span contenteditable="true" class="text-base w-5 text-center">{{ counterItems[index].count }}</span>
                <button @click.prevent="increaseObject(index, counterItems[index].count < 10, 'cartItems')" class="border opacity-40 border-dark rounded-full w-5 h-5 p-1 cursor-pointer"><PlusIcon/></button>
              </div>
              <span class="text-base justify-center">{{ formattedPriceValue(item.price * counterItems[index].count) }}</span>
              <div class="flex items-center justify-end gap-7">
                <div class="border opacity-40 border-dark rounded-full w-6 h-6 cursor-pointer p-1" @click="removeFromCart(index)">
                  <XMarkIcon></XMarkIcon>
                </div>
              </div>
            </div>
          </div>
          <span v-if="cartItems.length > 0" class="text-base font-bold self-end">Сумма: {{ formattedPriceValue(calcTotalPrice) }}</span>
          <p v-if="cartItems.length === 0" class="text-base font-bold">Корзина пуста. Добавьте в корзину хотя бы один товар</p>
        </div>
        <div class="flex flex-col gap-7">
          <input class="input" type="text" name="full_name" placeholder="Получатель (ФИО полностью)">
          <input class="input tel" type="text" v-model="tel" name="tel" @input="telMask" @blur="this.clearTel">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <span>Ваш E-mail</span>
              <p class="text-sm">Проверьте введенный вами адрес почты, туда поступит письмо с деталями заказа.</p>
            </div>
            <input class="input" type="email" name="email" placeholder="example@example.com">
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
              <span>Какой у вас рост?</span>
            </div>
            <input class="input" type="number" name="height" placeholder="175 см">
          </div>
        </div>
        <div class="flex flex-col gap-7">
          <div>
            <h3 class="text-xl font-bold">Доставка</h3>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
              <span>Город</span>
            </div>
            <input class="input" type="search" name="search" placeholder="Укажите город">
          </div>
          <div class="flex items-center gap-2 cursor-pointer" @click="toggleCheckbox">
            <input v-model="this.checkbox" class="w-5 h-5 outline-none border-2 border-dark" type="checkbox" name="policy">
            <p>Я согласен (-сна) с <span>политикой конфиденциальности</span></p>
          </div>
          <div class="flex flex-col gap-2">
            <input class="input" type="text" name="promotional" placeholder="Введите промокод">
          </div>
          <div class="flex flex-col gap-2 self-end text-base font-bold">
            <h4>Итоговая сумма: {{ formattedPriceValue(calcTotalPrice) }}</h4>
          </div>
          <div class="flex flex-col gap-2">
            <button class="py-4 text-base bg-red-500 text-white transition hover:bg-red-600">Оформить заказ</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {MinusIcon, PlusIcon, XMarkIcon} from "@heroicons/vue/24/outline"
import telMask from "@/mixins/telMask";
import counter from "@/mixins/counter";
import {mapActions, mapGetters} from "vuex";
import formattedPrice from "@/mixins/formattedPrice";
import imageRequire from "@/mixins/imageRequire";
import {reactive} from 'vue';

export default {
  components: {PlusIcon, MinusIcon, XMarkIcon},
  mixins: [telMask, counter, formattedPrice, imageRequire],
  data() {
    return {
      tel: '+7 ',
      checkbox: false,
      counter:  reactive([])
    }
  },
  computed: {
    ...mapGetters('cart', ['cartItems']),
    counterItems() {
      return this.cartItems.map(item => { return { count: item.count };  });
    },
    calcTotalPrice() {
      return this.cartItems.reduce((previous, present) => previous + present.price * present.count, 0)
    },
  },
  methods: {
    ...mapActions('cart', ['removeFromCart', 'setCartModalOpen']),
    clearTel() {
      if(this.tel === '+') {
        this.tel = '+7 '
      }
    },
    toggleCheckbox() {
      this.checkbox = !this.checkbox;
    },
    closeModal(event) {
      if (event.target.classList.contains('cart-modal') || event.target.closest('.close-icon')) {
        this.setCartModalOpen({
            condition: false,
        })
      }
    },
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