export default {
    methods: {
        formattedPriceValue(price) {
            if(price) {
                return price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });
            }
            return 'Цена не определена!'
        }
    },
}