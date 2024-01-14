<template>
  <div class="flex flex-col gap-5 cursor-pointer relative select-none">
    <div class="absolute top-4 right-4 text-min-sm text-white bg-brown h-12 w-12 rounded-full text-center flex justify-center items-center">
      new
    </div>
    <div :class="xs ? 'h-80 w-64' : 'h-128 w-96'">
      <img class="w-full h-full object-cover" :src="this.imageRequire(this.product.imagePath)" alt="item">
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-2">
        <h3 class="font-bold">{{ this.product.name }}</h3>
        <span class="text-sm">{{ this.product.material }}</span>
      </div>
      <span>{{ this.formattedPriceValue(this.product.price) }}</span>
    </div>
  </div>
</template>

<script>
import formattedPrice from "@/mixins/formattedPrice";
import imageRequire from "@/mixins/imageRequire";
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