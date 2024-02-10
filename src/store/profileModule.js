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

        setErrors(state, errors) {

            state.errors = errors

        },

        addToCart(state, item) {

            if(!state.cart.some(obj => obj.id === item.id)) {

                state.cart.push(item);

                localStorage.setItem('cart', JSON.stringify(state.cart));

            }

            if(state.cart.some(obj => obj.id === item.id) && state.cart.some(obj => obj.count !== item.count)) {

                const index = state.cart.findIndex(obj => obj.id === item.id);

                state.cart[index] = item

                localStorage.setItem('cart', JSON.stringify(state.cart));

            }

        },

        removeFromCart(state, index) {

            state.cart.splice(index, 1);

            localStorage.setItem('cart', JSON.stringify(state.cart));

        },

        clearCart(state) {

            state.cart = [];

            localStorage.removeItem('cart');

        },

        updateCount(state, objectValue) {

            state.cart[objectValue.index].count = objectValue.count

            localStorage.setItem('cart', JSON.stringify(state.cart));

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

        addToCart(context, item) {
            context.commit('addToCart', item);
        },

        removeFromCart(context, index) {
            context.commit('removeFromCart', index);
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

                if(commit.getters.getIsAuth) {

                    return

                }

                const products = JSON.parse(localStorage.getItem('cart'))

                const dataProducts = [];

                products.forEach(product => {
                    dataProducts.push({
                        product_id: product.id,
                        count: product.count,
                    })
                })

                const url = store.getters["auth/getBackendApiDomain"];

                const response = await axios.post(url + 'guest/checkout', {
                    ...data,
                    products: dataProducts
                })

                localStorage.setItem('token', JSON.stringify(response.data.token.original.access_token))

                commit.state.cartModalOpen = false

                await router.push('/profile')

            } catch (exception) {

                if(exception.response) {

                    commit.dispatch('cart/setErrors', exception.response.data.errors, { root: true })

                    // for (let key in exception.response.data.errors) {
                    //
                    //     if (exception.response.data.errors) {
                    //
                    //         const errorMessages = exception.response.data.errors[key];
                    //
                    //         errorMessages.forEach(error => {
                    //
                    //             if(error === 'Email зарегистрирован на сайте. Пожалуйста, войдите в аккаунт') {
                    //
                    //                 setTimeout(() => {
                    //
                    //                     commit.state.cartModalOpen = false
                    //
                    //                     store.commit('auth/setLoginModalOpen', {condition: true})
                    //
                    //                 },10000);
                    //
                    //             }
                    //
                    //         });
                    //
                    //     }
                    //
                    // }

                }

            }

        },

    },

    namespaced: true,

}