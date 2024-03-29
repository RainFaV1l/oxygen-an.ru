<template>
  <div class="flex flex-col gap-5 cursor-pointer relative select-none">
    <div v-if="this.product.type" class="absolute top-4 right-4 text-min-sm text-white bg-brown h-12 w-12 rounded-full text-center flex justify-center items-center">
      {{ this.product.type.name }}
    </div>
    <div :class="xs ? 'h-80 w-64' : 'h-128 w-full'" class="image-container">
      <img class="w-full h-full object-cover rounded" :src="this.product.preview_image_path" alt="item" @load="loadedImage({ elClass: '.image-container' })">
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-2">
        <h3 class="font-bold" :class="xs ? 'w-[260px]' : ''">{{ this.product.name }}</h3>
        <span class="text-sm">{{ this.product.material }}</span>
      </div>
      <span>{{ this.formattedPriceValue(this.product.price) }}</span>
    </div>
  </div>
</template>

<script>
import formattedPrice from "@/mixins/formattedPrice";
import imageRequire from "@/mixins/imageRequire";
import {mapActions} from "vuex";
export default {
  mixins: [
      formattedPrice,
      imageRequire
  ],
  data() {
    return {
      formattedPrice: 0
    }
  },
  methods: {
    ...mapActions('product', ['loadedImage']),
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    xs: {
      type: Boolean,
    },
  },
}
</script>

<style scoped>

</style>