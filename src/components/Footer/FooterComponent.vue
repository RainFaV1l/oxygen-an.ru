<template>
  <footer>
    <div class="container py-12 sm:py-24 flex flex-col gap-12">
      <div class="flex flex-wrap justify-between gap-8">
        <MenuEl :menuEls="menuEls"/>
      </div>
      <div>
        <div class="flex flex-wrap justify-between items-center gap-4">
          <div class="flex flex-col gap-7">
            <div class="flex items-center gap-4">
              <div class="h-12">
                <img class="w-full h-full object-contain" :src="mastercard" alt="MasterCard logo">
              </div>
              <div class="h-12">
                <img class="w-full h-full object-contain" :src="visa" alt="Visa logo">
              </div>
            </div>
            <span class="text-sm sm:text-base">© 2021 KIRAS | Все права защищены</span>
            <span class="text-sm sm:text-base">Разработка сайта: ra</span>
          </div>
          <div class="flex flex-col gap-7 md:w-full 2xl:w-auto">
            <h3 class="font-bold text-sm sm:text-base">Узнавайте о новостях первыми</h3>
            <div class="flex flex-col gap-4">
              <div class="flex flex-col justify-end gap-5 toggle-input">
                <div class="h-4 toggle-input__placeholder">
                  <span class="text-gray-400 font-medium text-sm sm:text-lg" v-if="inputFocused && email.length === 0">example@example.com</span>
                </div>
                <div class="flex flex-col gap-2 w-full">
                  <input v-model="email" class="bg-transparent px-7 font-medium" @focus="toggle" @blur="toggle"  type="text">
                  <div style="height: 3px" class="w-full bg-brown"></div>
                </div>
              </div>
              <span class="text-sm">Подписываясь на рассылку, вы соглашаетесь с условиями политики конфиденциальности </span>
            </div>
          </div>
          <div class="w-full md:w-1/4">
            <button class="w-full h-full border-2 border-dark py-6 font-medium">Подписаться</button>
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
export default {
  components: {MenuEl},
  data() {
    return {
      menuEls,
      mastercard,
      visa,
      inputFocused: true,
      email: '',
    }
  },
  methods: {
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
    }
  },
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
    //opacity: 0;
    transform: scale(0);
  }
</style>