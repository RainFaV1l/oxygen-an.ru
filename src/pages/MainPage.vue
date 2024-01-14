<template>
  <div class="flex flex-col gap-24">
    <div class="container pb-24 flex flex-col items-center justify-center gap-14">
      <nav>
        <ul class="flex items-center gap-8 text-sm">
          <li><a class="p-2" href="#">Все</a></li>
          <li><a class="p-2" href="#">Тренчи</a></li>
          <li><a class="p-2" href="#">Пиджаки</a></li>
          <li><a class="p-2" href="#">Брюки</a></li>
          <li><a class="p-2" href="#">Платья</a></li>
          <li><a class="p-2" href="#">Рубашки</a></li>
          <li><a class="p-2" href="#">Шорты</a></li>
          <li><a class="p-2" href="#">Юбки</a></li>
          <li><a class="p-2" href="#">Костюмы</a></li>
          <li><a class="p-2" href="#">Жилеты</a></li>
        </ul>
      </nav>
      <div class="flex w-full justify-start flex-wrap gap-10 px-32 products__list">
        <div v-for="product in products" :key="product.id" class="products__item">
          <ProductItem :product="product" @click="$router.push(`/products/${product.id}`)"/>
          <!--        <router-link :to="{ path: `products/${product.id}`, params: { id: product.id } }"><ProductItem :product="product"/></router-link>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import products from "@/props/products.js";
export default {
  components: {ProductItem},
  data() {
    return {
      products,
    }
  }
}
</script>

<style scoped>
  .products__item {
    margin-top: 50px;
  }
  .products__item:nth-child(1), .products__item:nth-child(2), .products__item:nth-child(3) {
    margin-top: 0;
  }
</style>