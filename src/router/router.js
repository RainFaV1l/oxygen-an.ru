import MainPage from "@/pages/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import ProductPage from "@/pages/ProductPage.vue";


const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/products/:id',
        component: ProductPage,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router