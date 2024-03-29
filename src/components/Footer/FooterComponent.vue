<template>
  <footer>
    <div class="container py-12 sm:py-24 flex flex-col gap-12">
      <div class="flex flex-wrap justify-between gap-4 sm:gap-12">
        <MenuEl :menuEls="menuEls"/>
        <div class="flex items-center gap-7 mt-2 sm:mt-0 w-full flex-wrap sm:flex-nowrap lg:w-1/2">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col justify-end gap-5 toggle-input">
              <div class="h-4 toggle-input__placeholder">
                <span class="text-green-500" v-if="this.message">{{ this.message }}</span>
                <span class="text-gray-400 font-medium text-sm sm:text-lg"
                      :class="getSubscribeErrors.email ? 'text-red-500' : ''"
                      v-else-if="inputFocused && email.length === 0 || getSubscribeErrors.email">
                    {{ getSubscribeErrors.email ? getSubscribeErrors.email[0] : '' }}</span>
              </div>
              <div class="flex flex-col gap-2 w-full">
                <input v-model="email" class="transition-all duration-300 bg-transparent font-medium placeholder:text-[#C9C9C9FF] focus:placeholder:text-transparent" @focus="toggle" @blur="toggle" placeholder="example@example.com" type="text">
                <div style="height: 3px" class="w-full bg-brown"></div>
              </div>
            </div>
            <span class="text-sm">Подписываясь на рассылку, вы соглашаетесь с условиями политики конфиденциальности </span>
          </div>
          <div>
            <button @click="subscribeAndShowMessage" class="px-12 border-2 border-dark py-4 text-sm sm:text-base font-medium">Подписаться</button>
          </div>
        </div>
      </div>
      <div>
        <div class="flex flex-wrap-reverse justify-start items-center gap-8">
          <div class="flex flex-col gap-7 w-full text-center">
<!--            <div class="flex items-center gap-4">-->
<!--              <div class="h-12">-->
<!--                <img class="w-full h-full object-contain" :src="mastercard" alt="MasterCard logo">-->
<!--              </div>-->
<!--              <div class="h-12">-->
<!--                <img class="w-full h-full object-contain" :src="visa" alt="Visa logo">-->
<!--              </div>-->
<!--            </div>-->
            <span class="text-sm sm:text-base mt-6">© 2024 Oxygen | Все права защищены</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import MenuEl from "@/components/Footer/MenuEl.vue";
import menuEls from "@/props/FooterComponent/MenuEls";
import mastercard from "@/assets/images/footer/mastercard.png";
import visa from "@/assets/images/footer/visa.png";
import {mapActions, mapGetters} from "vuex";
export default {
  components: {MenuEl},
  data() {
    return {
      menuEls,
      mastercard,
      visa,
      inputFocused: true,
      email: '',
      message: '',
    }
  },
  methods: {
    ...mapActions('profile', ['subscribe']),
    toggle() {
      if(!this.inputFocused) {
        this.inputFocused = !this.inputFocused
        setTimeout(() => {
          this.startToggleAnimation()
        }, 1)
      } else {
        setTimeout(() => {
          this.inputFocused = !this.inputFocused
        }, 300)
        this.startToggleAnimation()
      }
    },
    startToggleAnimation() {
      const toggleElement = document.querySelector('.toggle-input')
      toggleElement.classList.toggle('toggle-input_active')
    },
    async subscribeAndShowMessage() {
      let data = await this.subscribe({email: this.email})
      this.message = data ? data.data.msg : ''
      this.email = ''
    }
  },
  computed: {
    ...mapGetters('profile', ['getSubscribeErrors'])
  }
}
</script>

<style scoped>
  .toggle-input .toggle-input__placeholder {
    opacity: 1;
    transform: scale(1);
    transition: transform .3s ease-in-out, opacity .3s ease-in-out;
    transform-origin: top left;
  }
  .toggle-input.toggle-input_active .toggle-input__placeholder {
    opacity: 0;
    transform: scale(0);
  }
</style>