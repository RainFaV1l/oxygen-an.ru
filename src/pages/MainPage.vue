<template>
  <div class="flex flex-col gap-12 sm:gap-24">
    <div class="container pb-12 sm:pb-24 flex flex-col items-center justify-center gap-7 sm:gap-14">
<!--      <nav>-->
<!--        <ul class="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-5 text-sm">-->
<!--          <li><button class="p-2" @click="setSelectedCategory(0)">Все</button></li>-->
<!--          <li v-for="category in getCategories" :key="category.id"><button @click="setSelectedCategory(category.id)" class="p-2">{{ category.name }}</button></li>-->
<!--        </ul>-->
<!--      </nav>-->
      <div v-if="getFilteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 mx-auto w-full gap-10 xl:px-32 products__list">
          <ProductItem v-for="product in getFilteredProducts" :key="product.id" class="products__item" :product="product" @click="$router.push(`/products/${product.id}`)"/>
          <!--        <router-link :to="{ path: `products/${product.id}`, params: { id: product.id } }"><ProductItem :product="product"/></router-link>-->
      </div>
      <div class="text-center py-24 flex flex-col gap-2" v-if="getFilteredProducts.length === 0">
        <p class="transform rotate-90 text-3xl font-medium">:(</p>
        <p class="font-medium">Товары не найдены</p>
      </div>
<!--      <div ref="observer" class="observer w-full h-2"></div>-->
<!--      <div class="flex justify-center items-center gap-7">-->
<!--        <button @click="changePage(page)" v-for="page in getTotalPages" :key="page" :class="{-->
<!--          'text-blue-600' : page ===  getPage-->
<!--        }">{{ page }}</button>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
// import products from "@/props/products.js";
import {mapActions, mapGetters} from "vuex";
export default {
  components: {ProductItem},
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('product', ['getProducts', 'getCategories', 'getSelectedCategory', 'getFilteredProducts', 'getTotalPages', 'getPage']),
  },
  methods: {
    ...mapActions('product', ['fetchProducts', 'fetchCategories', 'setSelectedCategory', 'setPage', 'loadMoreProducts']),
    // changePage(page) {
    //   this.fetchProducts()
    //   this.setPage(page)
    // }
    observer() {

      const options = {
        rootMargin: '0px',
        threshold: 1.0
      }

      // entries, observer

      const callback = (entries) => {

        if(entries[0].isIntersecting && this.getPage < this.getTotalPages) {

          console.log('toop')

          this.loadMoreProducts()

        }

      }

      const observer = new IntersectionObserver(callback, options)

      observer.observe(this.$refs.observer)

    }
  },
  // beforeRouteUpdate(to, from, next) {
  //     // Сюда поместите логику для обновления данных при возврате на главную страницу
  //     // Например, вызовите метод, загружающий данные по новой
  //     this.fetchProducts(); // Предполагается, что у вас есть метод для загрузки данных
  //     next();
  //   },
  mounted() {
    this.fetchProducts()
    this.fetchCategories()
    // this.observer()
  },
  watch: {

  }
}
</script>

<style scoped>

</style>