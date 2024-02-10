import MainPage from "@/pages/MainPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import ProductPage from "@/pages/ProductPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import axios from "axios";
import store from "@/store";


const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/products/:id',
        component: ProductPage,
    },
    {
        path: '/profile',
        component: ProfilePage,
        meta: { requiresAuth: true }
    },
]

const guard = () => {

    // Добавление HTTP-интерсептора для проверки Bearer токена перед каждым запросом
    axios.interceptors.request.use(

        function (config) {

            const token = JSON.parse(localStorage.getItem('token'));

            if (token) {

                config.headers.Authorization = `Bearer ${token}`;

            }

            return config;

        },
        function (error) {

            return Promise.reject(error);

        }
    );

    // Добавление HTTP-интерсептора для обработки ошибок аутентификации (например, если токен недействителен)
    axios.interceptors.response.use(

        function (response) {

            return response;

        },

        function (error) {

            if (error.response.status === 401) {

                // Редирект на страницу входа, если токен недействителен или отсутствует
                router.push('/');

            }

            return Promise.reject(error);

        }
    );



    router.beforeEach((to, from, next) => {

        if(to.matched.some(record => record.meta.requiresAuth)) {

            const isAuth = JSON.parse(localStorage.getItem('token'))

            if(!isAuth) {

                next('/')

            } else {

                store.commit('auth/setIsModalMenuOpen', false)

                next()

            }
        } else {

            next()

        }

    });

}

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

guard()

export default router