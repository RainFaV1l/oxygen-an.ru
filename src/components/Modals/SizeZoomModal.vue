<template>
  <div class="fixed left-0 top-0 w-full h-full z-20 bg-black bg-opacity-60 size-zoom-modal cursor-pointer flex justify-center items-center" @click="closeModal">
    <div class="absolute top-5 right-10 z-20 size-zoom-modal__close">
      <XMarkIcon class="cursor-pointer h-10 w-10 text-white stroke-1"></XMarkIcon>
    </div>
    <div class="z-20 w-full md:w-2/3 lg:w-1/2 size-zoom-modal__content cursor-default">
      <div class="flex flex-col items-center justify-center">
        <div class="h-full w-full">
          <img class="w-full h-full object-contain" :src="$store.state.product.sizeImagePath" alt="Изображение размеров">
        </div>
        <div class="h-full w-full flex justify-center items-center py-14 px-20 bg-white">
          <span class="text-sm">*все размеры указаны в сантиметрах</span>
        </div>
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

<style>
  .size-zoom-modal {
    opacity: 0;
    transition: all .3s ease-in-out;
  }
  .size-zoom-modal .size-zoom-modal__content {
    transform: scale(0) translateY(-100px);
    transition: all .3s ease-in-out;
  }
  .size-zoom-modal.size-zoom-modal_show {
    opacity: 1;
  }
  .size-zoom-modal.size-zoom-modal_show .size-zoom-modal__content {
    transform: scale(1) translateY(0px);
  }
</style>