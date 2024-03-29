import axios from "axios";
import router from "@/router/router";

export const authModule = {

    state: () => {
        return {
            loginModalOpen: false,
            errors: {},
            backendApiDomain: 'https://backend.oxygen-an.ru/api/v1/',
            backendUrl: 'https://backend.oxygen-an.ru/api/v1/auth/',
            backendGetUserUrl: 'https://backend.oxygen-an.ru/api/v1/auth/user',
            token: JSON.parse(localStorage.getItem('token')) || '',
            isModalMenuOpen: false,
            isAuth: false,
        }
    },

    getters: {

        getBackendApiDomain: state => {
            return state.backendApiDomain;
        },

        getIsAuth: state => {
            return state.isAuth;
        },

        getErrors: state => {
            return state.errors;
        },

        getBackendGetUserUrl: state => {
            return state.backendGetUserUrl;
        },

        cartItems: state => {
            return state.cart;
        },

        loginModalOpen: state => {
            return state.loginModalOpen
        },

        getIsModalMenuOpen: state => {
            return state.isModalMenuOpen
        },

        getToken: state => {
            return state.token
        }

    },

    mutations: {

        setIsAuth(state, bool) {
            state.isAuth = bool
        },

        setToken(state, token) {

            state.token = token

            localStorage.setItem('token', JSON.stringify(token))

        },

        setError(state, error) {

            state.errors = error

        },

        setLoginModalOpen(state, objectValue) {

            if(!state.loginModalOpen) {

                document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;

                document.body.classList.add("bg-bg");

                setTimeout(() => {

                    document.body.classList.add("overflow-hidden");

                }, 1)

                const el = document.querySelector('.ask-question');

                if (el) el.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;

            } else {

                setTimeout(() => {

                    document.body.classList.remove("overflow-hidden");

                    document.body.style.paddingRight = ''

                    const el = document.querySelector('.ask-question');

                    if (el) el.style.paddingRight = '';

                }, 300)

            }

            if(objectValue.condition) {

                setTimeout(() => {

                    const modalMenu = document.querySelector('.modal')

                    if(modalMenu) modalMenu.classList.toggle('modal_show')

                }, 1)

                state.loginModalOpen = objectValue.condition


            } else {

                setTimeout(() => {

                    state.loginModalOpen = objectValue.condition

                }, 300)

                const modalMenu = document.querySelector('.modal')

                if(modalMenu) modalMenu.classList.toggle('modal_show')

            }

        },

        setIsModalMenuOpen(state, bool) {

            if(bool) {

                const hintEl = document.querySelector('.ask-question')

                if(state.isModalMenuOpen) {

                    document.body.style.paddingRight = ''

                    if(hintEl) hintEl.style.paddingRight=`0px`

                } else {

                    // Узнать ширину полосы прокрутки браузера
                    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

                    document.body.style.paddingRight = `${scrollbarWidth}px`

                    document.body.classList.add("bg-bg")

                    if(hintEl) hintEl.style.paddingRight=`${scrollbarWidth}px`

                }

                state.isModalMenuOpen = bool

                document.body.classList.toggle("overflow-hidden")

                setTimeout(() => {

                    const modalMenu = document.querySelector('.modal-menu')

                    if(modalMenu) modalMenu.classList.toggle('modal-menu_show')

                }, 1)

            } else {

                setTimeout(() => {

                    const hintEl = document.querySelector('.ask-question')

                    if(!bool) {

                        document.body.style.paddingRight = ''

                        if(hintEl) hintEl.style.paddingRight=`0px`

                    } else {

                        // Узнать ширину полосы прокрутки браузера
                        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

                        document.body.style.paddingRight = `${scrollbarWidth}px`

                        document.body.classList.add("bg-bg")

                        if(hintEl) hintEl.style.paddingRight=`${scrollbarWidth}px`

                    }

                    state.isModalMenuOpen = bool

                    document.body.classList.toggle("overflow-hidden")

                }, 200)

                const modalMenu = document.querySelector('.modal-menu')

                if(modalMenu) modalMenu.classList.toggle('modal-menu_show')

            }

        },

        setAuthToken(token) {

            if (token) {

                // Устанавливаем заголовок для всех последующих запросов
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            } else {

                // Если токен отсутствует, удаляем заголовок Authorization
                delete axios.defaults.headers.common['Authorization'];

            }
        },

    },

    actions: {

        async login( context, credentials) {

            try {

                const response = await axios.post(context.state.backendUrl + 'login', credentials)

                context.commit('setToken', response.data.access_token)

                await router.push('/profile');

                context.state.isAuth = true

                context.state.loginModalOpen = false

                context.state.isModalMenuOpen = false

            } catch (exception) {

                if(exception.response) {

                    context.state.errors = exception.response.data

                    setTimeout(() => {

                        const smoothErrors = document.querySelectorAll('.smooth-error')

                        smoothErrors.forEach((error, index) => {

                            if(index > 0) {

                                setTimeout(() => {

                                    error.classList.add('show')

                                    setTimeout(() => {

                                        error.classList.remove('show')

                                    }, 1500)

                                }, 1500)

                            } else {

                                error.classList.add('show')

                                setTimeout(() => {

                                    error.classList.remove('show')

                                }, 1500)

                            }

                        })

                    }, 50)

                }

                console.log('Возникла ошибка: ' + exception)

            } finally {

                // commit('setLoading', false)

            }

        },

        async isAuthCheck(context) {

            try {

                const token = JSON.parse(localStorage.getItem('token'))

                const response = await axios.post(context.state.backendGetUserUrl, null, {

                    headers: {
                        'Authorization': `Bearer ${token}`
                    }

                })

                if(response.data.id) {

                    let data = JSON.parse(localStorage.getItem('cart'))

                    if(data && data.length > 0) {

                        data = data.map(item => ({ product_id: item.id, count: item.count }))

                        // Синхронизация корзины
                        await axios.patch(context.state.backendApiDomain + `cart/update`, {
                            products: data
                        }, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })

                        // Обратная синхронизация корзины
                        

                    }

                    // Получение обновленной корзины из бд
                    const cart = await axios.get(context.state.backendApiDomain + `cart/products`,{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })

                    context.commit('cart/setCart', cart.data, {root: true})

                    context.state.isAuth = true

                    return cart

                }

                context.state.isAuth = false

            } catch (exception) {

                const token = localStorage.getItem('token')

                if(exception.request && exception.request.status === 401 && token) {

                    try {

                        const response = await axios.post(context.state.backendUrl + 'refresh', null, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })

                        localStorage.setItem('token', JSON.stringify(response.data.access_token))

                    } catch (exception) {

                        // localStorage.removeItem('token')

                        await router.push('/')

                    }

                }

                context.state.isAuth = false

            }


        },


        setLoginModalOpen(context, item) {
            context.commit('setLoginModalOpen', item);
        },

        async logout(context) {

            try {

                context.state.isModalMenuOpen = false

                context.state.isAuth = false

                const token = JSON.parse(localStorage.getItem('token'))

                localStorage.removeItem('token')

                await axios.post(context.state.backendUrl + 'logout', null, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                await router.push('/');

            } catch (exception) {

                console.log('Возникла ошибка: ' + exception)

            }

        },

    },

    namespaced: true,
}