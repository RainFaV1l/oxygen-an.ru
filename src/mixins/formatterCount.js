export default {
    methods: {

        formatterCount(number, word) {

            // Массив вариантов окончаний
            var forms = [word, word + 'а', word + 'ов'];

            // Правила для русского языка
            var cases = [2, 0, 1, 1, 1, 2];

            // Определение правильного варианта окончания
            if (number % 100 > 4 && number % 100 < 20) {
                return forms[2];
            }

            return forms[(number % 10 < 5) ? cases[number % 10] : 2];

        }

    },
}