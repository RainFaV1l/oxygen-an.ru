export default {
    methods: {
        increase(variable, condition) {
            condition ? this[variable] = this[variable] + 1 : ''
        },
        decrease(variable, condition) {
            condition ? this[variable] = this[variable] - 1 : ''
        },
        increaseObject(index, condition, variable) {
            condition ? this[variable][index].count = this[variable][index].count + 1 : ''
            this.$store.commit('cart/updateCount', { index, count: this[variable][index].count });
        },
        decreaseObject(index, condition, variable) {
            condition ? this[variable][index].count= this[variable][index].count - 1 : ''
            this.$store.commit('cart/updateCount', { index, count: this[variable][index].count });
        }
    },
}