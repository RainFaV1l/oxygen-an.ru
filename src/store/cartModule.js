export const cartModule = {

    state: () => {
        return {
            cart: JSON.parse(localStorage.getItem('cart')) || [],
            cartModalOpen: false,
        }
    },

    getters: {

        cartItems: state => {
            return state.cart;
        },

        cartModalOpen: state => {
            return state.cartModalOpen;
        },

    },

    mutations: {

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

    },

    namespaced: true,
}