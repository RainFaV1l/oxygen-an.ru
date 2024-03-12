import axios from "axios";

export const profileModule = {

    state: () => {
        return {
            orders: [],
            url: 'https://backend.oxygen-an.ru/api/v1/orders',
            subscribeUrl: 'https://backend.oxygen-an.ru/api/v1/subscribe',
            subscribeErrors: {},
        }
    },

    getters: {

        getOrders(state) {
            return state.orders
        },

        getSubscribeErrors(state) {
            return state.subscribeErrors
        },

    },

    mutations: {

        setSubscribeErrors(state, errors) {
            state.subscribeErrors = errors
        }

    },

    actions: {

        setErrors(context, errors) {
            context.commit('setErrors', errors);
        },

        setSubscribeErrors(context, errors) {
            context.commit('setSubscribeErrors', errors);
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

        async subscribe(commit, data) {

            try {

                return await axios.post(commit.state.subscribeUrl, data)

            } catch (exception) {

                if(exception.response) {

                    commit.dispatch('profile/setSubscribeErrors', exception.response.data.errors, { root: true })

                }

            }

        }

    },

    namespaced: true,

}