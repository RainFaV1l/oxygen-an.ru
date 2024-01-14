export default {

    methods: {

        telMask() {

            const inputs = document.querySelectorAll('.tel')

            if(!inputs) return false

            inputs.forEach(input => {

                input.value = input.value.replace(/\D/g, "").substring(0, 11);

                let phone = input.value

                if (phone.length > 1 && phone.charAt(0) !== '8' && phone.charAt(0) !== '7') {
                    phone = '7' + phone.substring(1);
                }

                if (phone.charAt(0) === '8') {
                    phone = '7' + phone.substring(1)
                }

                switch (phone.length) {
                    case 1:
                        phone = phone.replace(/(\d{1})/, "+$1")
                        break
                    case 2:
                        phone = phone.replace(/(\d{1})(\d{1})/, "+$1 ($2")
                        break
                    case 3:
                        phone = phone.replace(/(\d{1})(\d{2})/, "+$1 ($2")
                        break
                    case 4:
                        phone = phone.replace(/(\d{1})(\d{3})/, "+$1 ($2")
                        break
                    case 5:
                        phone = phone.replace(/(\d{1})(\d{3})(\d{1})/, "+$1 ($2) $3")
                        break
                    case 6:
                        phone = phone.replace(/(\d{1})(\d{3})(\d{2})/, "+$1 ($2) $3")
                        break
                    case 7:
                        phone = phone.replace(/(\d{1})(\d{3})(\d{3})/, "+$1 ($2) $3")
                        break
                    case 8:
                        phone = phone.replace(/(\d{1})(\d{3})(\d{3})(\d{1})/, "+$1 ($2) $3-$4")
                        break
                    case 9:
                        phone = phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})/, "+$1 ($2) $3-$4")
                        break
                    case 10:
                        phone = phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{1})/, "+$1 ($2) $3-$4-$5")
                        break
                    case 11:
                        phone = phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")
                        break
                }

                // if (phone.length >= 1) {
                //     phone = phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 ($2) $3-$4-$5")
                // }

                input.value = phone

            })

        }

    },

}