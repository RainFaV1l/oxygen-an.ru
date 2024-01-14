<template>
  <div>
    <div class="container py-24 px-48 flex flex-col gap-20">
      <div class="flex flex-wrap gap-10">
        <div class="flex flex-col gap-2">
          <div class="relative slider">
            <div class="h-192 w-140 slide">
              <img class="h-full w-full object-cover" :src="this.imageRequire(product.sliderImages[activeSlide].slideImagePath)" alt="Изображение">
            </div>
            <PrevButton class="absolute top-1/2 -translate-y-1/2 left-8" @click="prevSlide"/>
            <NextButton class="absolute top-1/2 -translate-y-1/2 right-8" @click="nextSlide"/>
          </div>
          <div class="flex justify-center items-center gap-2 slider-dots">
            <div v-for="(image, index) in product.sliderImages" :key="image.id">
              <div class="h-16 w-16 cursor-pointer slider-dot" @click="showSlide(index)">
                <div class="slider-dot-opacity"></div>
                <img class="h-full w-full object-cover" :src="this.imageRequire(image.slideImagePath)" alt="Изображение">
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/3 flex flex-col items-start gap-7 mt-2 text-sm">
          <h1 class="font-bold text-2xl">{{ product.name }}</h1>
          <span class="text-xl">{{ this.formattedPriceValue(this.product.price) }}</span>
          <div class="flex items-center gap-4" v-if="cartItems.length === 0 || !cartItems.some(item => item.id === this.product.id)">
            <div class="flex items-center gap-4 text-lg py-3 px-4 bg-white border border-dark">
              <button class="h-4 w-4 cursor-pointer" @click="decreaseCounter"><MinusIcon/></button>
              <span class="w-8 text-center">{{ counter }}</span>
              <button class="h-4 w-4 cursor-pointer" @click="increaseCounter"><PlusIcon/></button>
            </div>
            <button @click="addToCart({...this.product, count: this.counter})" class="py-4 px-8 bg-white text-dark">Добавить в корзину</button>
          </div>
          <div class="flex flex-col items-start gap-4" v-if="cartItems.some(obj => obj.id === this.product.id)">
            <span>Вы успешно добавили товар в корзину. Откройте корзину нажав на кнопку "Перейти в корзину"</span>
            <button @click="setCartModalOpen({
            condition: true
          })" class="py-4 px-8 bg-white text-dark">Перейти в корзину</button>
          </div>
          <span v-html="product.description"></span>
          <button class="border-b border-dark" @click="this.$store.commit('product/setIsSizeZoomModal', {
            condition: true,
            imagePath: this.imageRequire(product.sizePath)
          })">Таблица размеров</button>
        </div>
      </div>
      <div class="flex flex-col gap-10">
        <h3 class="font-bold text-base">Смотрите также</h3>
        <div class="flex flex-col gap-6">
          <div class="flex flex-wrap gap-10">
            <div v-for="product in products.slice(1, 3)" :key="product.id">
              <ProductItem :product="product" :xs="true" @click="$router.push(`/products/${product.id}`)"/>
            </div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import products from "@/props/products";
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import ProductItem from "@/components/ProductItem.vue";
import formattedPrice from "@/mixins/formattedPrice";
import imageRequire from "@/mixins/imageRequire";
import NextButton from "@/components/UI/NextButton.vue";
import PrevButton from "@/components/UI/PrevButton.vue";
import {mapActions, mapGetters} from "vuex";

export default {

  components: {PrevButton, NextButton, ProductItem, MinusIcon, PlusIcon},

  mixins: [
    formattedPrice,
    imageRequire,
  ],
  data() {
    return {
      products,
      product: null,
      counter: 1,
      activeSlide: 0,
    }
  },

  created() {
    this.findProductById(this.$route.params.id)
  },

  watch: {
    '$route.params.id': function(newValue) {
      this.findProductById(newValue)
    }
  },

  computed: {
    ...mapGetters('cart', ['cartItems']),
  },

  methods: {

    ...mapActions('cart', ['addToCart', 'setCartModalOpen']),

    findProductById(value) {
      const productId = value;
      this.product = this.products.find(product => product.id == productId);
    },

    decreaseCounter() {
      if(this.counter > 1) this.counter--
    },

    increaseCounter() {
      if(this.counter < 10) this.counter++
    },

    nextSlide() {

      if(this.activeSlide === this.product.sliderImages.length - 1) {

        setTimeout(() => {
          this.activeSlide = 0
        },150)

      } else {

        setTimeout(() => {
          this.activeSlide = this.activeSlide + 1
        },150)

      }

      this.slideAnimation('.slide', 150)

    },

    prevSlide() {

      if(this.activeSlide === 0) {

        setTimeout(() => {
          this.activeSlide = this.product.sliderImages.length - 1
        },150)

      } else {

        setTimeout(() => {
          this.activeSlide = this.activeSlide - 1
        },150)

      }

      this.slideAnimation('.slide', 150)

    },

    showSlide(index) {

      setTimeout(() => {
        this.activeSlide = index
      }, 150)

      this.slideAnimation('.slide', 150)

    },

    slideAnimation(slideClass, delay) {

      const slide = document.querySelector(slideClass)

      slide.classList.add('load')

      setTimeout(() => {
        slide.classList.remove('load')
      }, delay)

    },

    slideDotAnimation(slideDotClass) {

      const slideDots = document.querySelectorAll(slideDotClass)

      slideDots[0].classList.add('active')

      slideDots.forEach(slideDot => {

        slideDot.addEventListener('click', () => {

          slideDots.forEach(slideDot => {
            slideDot.classList.remove('active')
          })

          slideDot.classList.add('active')

        })

      })

    },
  },

  mounted() {
    this.slideDotAnimation('.slider-dot')
  }

}
</script>

<style scoped>
  .slider-dot {
    position: relative;
  }
  .slider-dot .slider-dot-opacity {
    transition: .3s ease-in-out;
  }
  .slider-dot:not(.active):hover .slider-dot-opacity {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.3);
  }
  .slide img {
    transition: .15s ease-in-out;
    opacity: 1;
  }
  .slide.load img {
    opacity: 0;
  }
</style>