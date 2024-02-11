<template>
  <div class="cart-modal modal fixed w-full h-full z-10 bg-black bg-opacity-60 flex justify-center items-center" @click="closeModal">
    <div class="cart-modal__content modal__content bg-white z-20">
      <div class="absolute top-2 right-2 p-5 z-25">
        <XMarkIcon class="cursor-pointer h-9 w-9 text-dark md:text-white stroke-1 close-icon"></XMarkIcon>
      </div>
      <form @submit.prevent="checkout({
        total: calcTotalPrice,
        full_name: full_name,
        telephone: tel === '+7 ' ? '' : tel,
        email: email,
        height: height,
        city: city,
        promotional_code: promotional_code,
      })" class="flex flex-col gap-8 px-5 py-8 sm:gap-12 sm:px-9 sm:py-12  h-screen cart-form overflow-auto">
        <div class="flex flex-col gap-12">
          <h2 class="text-2xl font-bold">Ваш заказ:</h2>
          <div v-if="cartItems.length > 0" class="flex flex-col gap-7 border-t border-t-dark border-b border-b-dark border-opacity-25">
            <div v-for="(item, index) in cartItems" :key="index" class="flex flex-wrap justify-between items-center gap-6 sm:gap-4 py-4">
              <div class="flex justify-start items-center gap-6 w-2/5 sm:w-2/5">
                <div class="w-16 h-16">
                  <img class="w-full h-full object-cover" :src="item.preview_image_path" alt="Изображение товара">
                </div>
                <span class="text-base font-bold">{{ item.name }}</span>
              </div>
              <div class="flex gap-3 items-center justify-center w-2/5 sm:w-1/5">
                <button @click.prevent="decreaseObject(index, counterItems[index].count !== 1, 'cartItems')" class="border opacity-40 border-dark rounded-full w-5 h-5 p-1 cursor-pointer"><MinusIcon/></button>
                <span contenteditable="true" class="text-base w-5 text-center">{{ counterItems[index].count }}</span>
                <button @click.prevent="increaseObject(index, counterItems[index].count < 10, 'cartItems')" class="border opacity-40 border-dark rounded-full w-5 h-5 p-1 cursor-pointer"><PlusIcon/></button>
              </div>
              <span class="text-base text-center justify-center w-12 sm:w-24">{{ formattedPriceValue(item.price * counterItems[index].count) }}</span>
              <div class="flex items-center justify-end gap-7">
                <div class="border opacity-40 border-dark rounded-full w-6 h-6 cursor-pointer p-1" @click="removeFromCart({
                  index: index,
                  id: item.id
                })">
                  <XMarkIcon></XMarkIcon>
                </div>
              </div>
            </div>
          </div>
          <span v-if="cartItems.length > 0" class="text-base font-bold self-end">Сумма: {{ formattedPriceValue(calcTotalPrice) }}</span>
          <p v-if="cartItems.length === 0" class="text-base font-bold">Корзина пуста. Добавьте в корзину хотя бы один товар</p>
        </div>
        <div class="flex flex-col gap-7">
          <InputError :condition="getErrors.full_name && getErrors.full_name[0]" :message="getErrors.full_name ? getErrors.full_name[0] : ''">
            <input class="input w-full" type="text" v-model="full_name" name="full_name" placeholder="Получатель (ФИО полностью)">
          </InputError>
          <InputError :condition="getErrors.telephone && getErrors.telephone[0]" :message="getErrors.telephone ? getErrors.telephone[0] : ''">
            <input class="input tel w-full" type="text" v-model="tel" name="tel" @input="telMask" @blur="this.clearTel">
          </InputError>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <span>Ваш E-mail</span>
              <p class="text-sm">Проверьте введенный вами адрес почты, туда поступит письмо с деталями заказа.</p>
            </div>
            <InputError :condition="getErrors.email && getErrors.email[0]" :message="getErrors.email ? getErrors.email[0] : ''">
              <input class="input w-full" v-model="email" type="email" name="email" placeholder="example@example.com">
            </InputError>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
              <span>Какой у вас рост?</span>
            </div>
            <InputError :condition="getErrors.height && getErrors.height[0]" :message="getErrors.height ? getErrors.height[0] : ''">
              <input class="input w-full" v-model="height" type="text" name="height" placeholder="175 см">
            </InputError>
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
            <InputError :condition="getErrors.city && getErrors.city[0]" :message="getErrors.city ? getErrors.city[0] : ''">
              <input class="input w-full" v-model="city" type="text" name="search" placeholder="Укажите город">
            </InputError>
          </div>
          <div class="flex items-center gap-2 cursor-pointer" @click="toggleCheckbox">
            <input v-model="this.checkbox" class="w-5 h-5 outline-none border-2 border-dark" type="checkbox" name="policy">
            <p class="text-sm">Я согласен (-сна) с <span>политикой конфиденциальности</span></p>
          </div>
          <div class="flex flex-col gap-2">
            <InputError :condition="getErrors.promotional_code && getErrors.promotional_code[0]" :message="getErrors.promotional_code ? getErrors.promotional_code[0] : ''">
              <input class="input w-full" v-model="promotional_code" type="text" name="promotional" placeholder="Введите промокод">
            </InputError>
          </div>
          <div class="flex flex-col gap-2 self-end text-base font-bold">
            <h4>Итоговая сумма: {{ formattedPriceValue(calcTotalPrice) }}</h4>
          </div>
          <div class="flex flex-col gap-2">
            <button :disabled="!this.checkbox" type="submit" class="py-4 text-base bg-red-500 text-white transition hover:bg-red-600 disabled:bg-gray-400">Оформить заказ</button>
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
import InputError from "@/components/UI/Cart/InputError.vue";

export default {
  components: {InputError, PlusIcon, MinusIcon, XMarkIcon},
  mixins: [telMask, counter, formattedPrice, imageRequire],
  data() {
    return {
      full_name: '',
      tel: '+7 ',
      email: '',
      height: '',
      city: '',
      promotional_code: '',
      checkbox: false,
      counter:  reactive([])
    }
  },
  computed: {
    ...mapGetters('cart', ['cartItems', 'getErrors']),
    counterItems() {
      return this.cartItems.map(item => { return { count: item.count };  });
    },
    calcTotalPrice() {
      return this.cartItems?.length > 0 ? this.cartItems.reduce((previous, present) => previous + present.price * present.count, 0) : 0
    },
  },
  methods: {
    ...mapActions('cart', ['removeFromCart', 'setCartModalOpen', 'checkout']),
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