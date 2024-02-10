import axios from "axios";
import store from "@/store/index";
import router from "@/router/router";
// import router from "@/router/router";

export const cartModule = {

    state: () => {
        return {
            cart: JSON.parse(localStorage.getItem('cart')) || [],
            cartModalOpen: false,
            errors: {}
        }
    },

    getters: {

        getErrors: state => {
            return state.errors;
        },

        cartItems: state => {
            return state.cart;
        },

        cartModalOpen: state => {
            return state.cartModalOpen;
        },

    },

    mutations: {

        setCart(state, data) {
            localStorage.setItem('cart', JSON.stringify(data))
        },

        updateCartItems(state) {
            state.cart = JSON.parse(localStorage.getItem('cart'))
        },

        updateCartItem(state, { index, item }) {
            state.cart[index] = item;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        addToCart(state, item) {

            state.cart.push(item);

            localStorage.setItem('cart', JSON.stringify(state.cart));

        },

        setErrors(state, errors) {

            state.errors = errors

        },

        removeFromCart(state, index) {

            state.cart.splice(index, 1);

            localStorage.setItem('cart', JSON.stringify(state.cart));

        },

        clearCart(state) {

            state.cart = [];

            localStorage.removeItem('cart');

        },

        async updateCount(state, objectValue) {

            state.cart[objectValue.index].count = objectValue.count

            localStorage.setItem('cart', JSON.stringify(state.cart));

            // Синхронизация корзины
            const token = localStorage.getItem('token')

            let data = JSON.parse(localStorage.getItem('cart'))

            data = data.map(item => ({ product_id: item.id, count: item.count }))

            return await axios.patch(`http://127.0.0.1:8000/api/v1/cart/update`, {
                products: data
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

        },

        setCartModalOpen(state, objectValue) {

            if(!state.cartModalOpen) {

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

                state.cartModalOpen = objectValue.condition


            } else {

                setTimeout(() => {

                    state.cartModalOpen = objectValue.condition

                }, 300)

                const modalMenu = document.querySelector('.modal')

                if(modalMenu) modalMenu.classList.toggle('modal_show')

            }

        },

    },

    actions: {

        async addToCart(context, item) {

            if(!context.state.cart.some(obj => obj.id === item.id)) {

                context.commit('addToCart', item);

            }

            if (context.state.cart.some(obj => obj.id === item.id) && context.state.cart.some(obj => obj.count !== item.count)) {

                const index = context.state.cart.findIndex(obj => obj.id === item.id);

                context.commit('updateCartItem', { index, item });

            }

            await context.dispatch('auth/isAuthCheck', '', { root: true })

            if(store.getters["auth/getIsAuth"]) {

                return await axios.post(store.getters["auth/getBackendApiDomain"] + 'cart/products', {
                    product_id: item.id,
                    count: item.count,
                })

            }

        },

        async removeFromCart(context, object) {

            await context.dispatch('auth/isAuthCheck', '', { root: true })

            await context.commit('removeFromCart', object.index)

            if(await store.getters["auth/getIsAuth"]) {

                return await axios.delete(store.getters["auth/getBackendApiDomain"] + `cart/products/${object.id}`, {

                    product_id: object.id,

                })

            }

        },

        clearCart(context) {
            context.commit('clearCart');
        },

        updateCount(context) {
            context.commit('updateCount');
        },

        setCartModalOpen(context, item) {
            context.commit('setCartModalOpen', item);
        },

        setLoginModalOpen(context, item) {
            context.commit('setLoginModalOpen', item);
        },

        setErrors(context, errors) {
            context.commit('setErrors', errors);
        },

        updateCartItems(context) {
            context.commit('updateCartItems');
        },



        // async cartUpdate({state}) {
        //
        //     try {
        //
        //         const token = localStorage.getItem('token')
        //
        //         const response = await axios.post(state.backendApiDomain + '', null, {
        //             headers: {
        //                 'Authorization': `Bearer ${token}`
        //             }
        //         })
        //
        //         if(response.data.id) {
        //
        //             state.isAuth = true
        //
        //         }
        //
        //         state.isAuth = false
        //
        //     } catch (exception) {
        //
        //
        //
        //     }
        //
        // },

        async checkout(commit, data) {

            try {

                await commit.dispatch('auth/isAuthCheck', '', { root: true })

                const products = JSON.parse(localStorage.getItem('cart'))

                const dataProducts = [];

                products.forEach(product => {
                    dataProducts.push({
                        product_id: product.id,
                        count: product.count,
                    })
                })

                const url = store.getters["auth/getBackendApiDomain"];

                let response = ''

                if(store.getters["auth/getIsAuth"]) {

                    response = await axios.post(url + 'auth/checkout', {
                        ...data,
                        products: dataProducts
                    })

                } else {

                    response = await axios.post(url + 'guest/checkout', {
                        ...data,
                        products: dataProducts
                    })

                    localStorage.setItem('token', JSON.stringify(response.data.token.original.access_token))

                }

                localStorage.removeItem('cart')

                commit.dispatch('cart/updateCartItems', '', { root: true })

                commit.state.cartModalOpen = false

                await router.push('/profile')

            } catch (exception) {

                if(exception.response) {

                    commit.dispatch('cart/setErrors', exception.response.data.errors, { root: true })

                }

            }

        },

        async cancelling(commit, cartId) {

            try {

                await commit.dispatch('auth/isAuthCheck', '', { root: true })

                if(store.getters["auth/getIsAuth"]) {

                    const url = store.getters["auth/getBackendApiDomain"] +`cart/${cartId}/status/canceling`;

                    const token = localStorage.getItem('token')

                    const response = await axios.post(url, null, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })

                    return response

                }

            } catch (exception) {

                console.log('Возникла ошибка: ' + exception)

            }

        }

    },

    namespaced: true,

}