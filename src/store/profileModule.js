import axios from "axios";

export const profileModule = {

    state: () => {
        return {
            orders: [],
            url: 'http://127.0.0.1:8000/api/v1/orders',
        }
    },

    getters: {

        getOrders(state) {
            return state.orders
        }

    },

    mutations: {

    },

    actions: {

        setErrors(context, errors) {
            context.commit('setErrors', errors);
        },

        async orders(commit) {

            try {

                const token = localStorage.getItem('token')

                const response = await axios.get(commit.state.url, null, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                commit.state.orders = response.data

            } catch (exception) {

                console.log('Возникла ошибка: ' + exception);

            }

        },

    },

    namespaced: true,

}