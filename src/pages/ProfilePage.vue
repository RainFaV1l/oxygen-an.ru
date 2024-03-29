<template>
  <div>
    <div class="container py-24">
      <div class="flex items-center justify-between border-b border-dark pb-5">
        <h1 class="text-3xl font-medium">Мои заказы</h1>
        <button @click="logout" class="flex items-center gap-1 font-medium">
          <div class="h-8 w-8 sm:h-12 sm:w-12 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-full h-full">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
          </div>
          <span class="text-sm sm:text-base">Выйти</span>
        </button>
      </div>
      <div class="flex flex-col gap-7 mt-8">
        <div v-for="order in getOrders" :key="order.id" class="border border-dark border-opacity-25 rounded">
          <div class="flex flex-wrap items-center justify-between gap-7 bg-white p-10 rounded">
            <div class="flex flex-col gap-4">
              <p class="text-base">Заказ №{{ order.id }}</p>
              <h2 class="flex items-center gap-3 text-xl font-medium"><span class="block bg w-3 h-3 rounded-full bg-blue-900"
                  :class="toggleStatusClass(order.status.id)"></span> {{ order.status.name  }} </h2>
              <p class="text-base">Сделан {{ formatDate(order.created_at) }}</p>
            </div>
            <div v-if="order.status.id === 2" class="flex items-center gap-7">
              <button @click="cancellingOrder(order.id)" class="button hover:bg-bg">Отменить</button>
            </div>
          </div>
          <div class="p-10 h-full flex flex-wrap sm:flex-nowrap items-center justify-between gap-7">
            <div class="flex flex-col gap-7 w-full lg:w-1/2 border-b pb-7 sm:pb-7 sm:border-r sm:border-b-0 border-dark border-opacity-25">
              <div class="flex items-center gap-4" v-for="product in order.products" :key="product.id">
                <div class="w-20 h-20">
                  <img class="w-full h-full object-cover rounded" :src="product.preview_image_path" alt="Изображение продукта">
                </div>
                <div class="flex flex-col gap-1">
                  <h3 class="text-base font-medium">{{ product.name }}</h3>
                  <p class="text-sm">{{ this.formattedPriceValue(product.price) }}</p>
                </div>
              </div>
            </div>
            <div class="lg:ml-4 h-full w-full lg:w-1/2 flex flex-col justify-center flex-wrap gap-4 text-sm">
              <div class="flex flex-wrap items-center gap-7">
                <p class="flex flex-wrap items-center gap-3 border-r border-dark pr-7 border-opacity-0 md:border-opacity-25">Дата оформления: <span class="font-medium">{{ formatDate(order.created_at) }}</span></p>
                <p class="flex flex-wrap items-center gap-3 border-r border-dark pr-7 border-opacity-0 md:border-opacity-25">Оплата: <span class="font-medium">{{ this.formattedPriceValue(order.total) }} за {{ order.products.length + ' ' + this.formatterCount(order.products.length, 'товар') }}</span></p>
              </div>
              <div class="flex flex-wrap items-center gap-7">
                <p class="flex flex-wrap items-center gap-3 border-r border-dark pr-7 border-opacity-0 md:border-opacity-25">Город: <span class="font-medium">{{ order.city }}</span></p>
                <p class="flex flex-wrap items-center gap-3 border-r border-dark pr-7 border-opacity-0 md:border-opacity-25">Телефон: <span class="font-medium">{{ order.tel }}</span></p>
                <p class="flex flex-wrap items-center gap-3 border-r border-dark pr-7 border-opacity-0 md:border-opacity-25">Email: <span class="font-medium">{{ order.email }}</span></p>
              </div>
              <div class="flex flex-wrap items-center gap-7">
                <p class="flex flex-wrap items-center gap-3 border-r border-dark pr-7 border-opacity-0 md:border-opacity-25">ФИО: <span class="font-medium">{{ order.fio }}</span></p>
                <p class="flex flex-wrap items-center gap-3 border-r border-dark pr-7 border-opacity-0 md:border-opacity-25">Рост: <span class="font-medium">{{ order.height}}</span></p>
              </div>
            </div>
          </div>
        </div>
        <p class="font-medium" v-if="getOrders.length === 0">История заказов пуста :(</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import router from "@/router/router";
import formattedPrice from "@/mixins/formattedPrice";
import formatterCount from "@/mixins/formatterCount";

export default {
  mixins: [
    formattedPrice,
    formatterCount,
  ],
  methods: {
    ...mapActions('auth', ['isAuthCheck', "logout"]),
    ...mapActions('cart', ['cancelling']),
    ...mapActions('profile', ['orders']),
    ...mapGetters('auth', ['getIsAuth']),
    formatDate(date) {
      const formatter = new Date(date);
      return formatter.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    },
    toggleStatusClass(status) {

      let result = 0

      switch (status) {
        case 1 :
          result = 'bg-red-400'
          break
        case 2 :
          result = 'bg-amber-400'
          break
        case 3 :
          result = 'bg-green-400'
          break
        case 4 :
          result = 'bg-blue-400'
          break
        case 5 :
          result = 'bg-violet-400'
          break
      }

      return result

    },

    async cancellingOrder(orderId) {

      const response =  await this.cancelling(orderId)

      if(response.status === 200 && response.data.msg === 'Успешное отклонение заказа') {

        await this.orders()

      }

    },

  },

  computed: {
    ...mapGetters('profile', ['getOrders']),
  },

  created() {

  },

  mounted() {
    this.isAuthCheck()
    this.orders()
    if(!this.getIsAuth) {
      router.push('/')
    }
  }
}
</script>

<style scoped>

</style>