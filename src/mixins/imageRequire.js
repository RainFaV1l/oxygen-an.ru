export default {
    computed: {
        imageRequire() {
            return (imagePath) => {
                return imagePath ? require(`@/assets/${imagePath}`) : '';
            }
        },
    }
}