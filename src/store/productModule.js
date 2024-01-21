import axios from "axios";

export const productModule = {

    state: () => {
        return {
            isSizeZoomModalOpen: false,
            sizeImagePath: '',
            products: [],
            product: {},
            categories: [],
            setLoading: false,
            selectedCategory: 0,
            page: 1,
            totalPages: 0,
        }
    },

    getters: {

        getProducts: state => {
            return state.products;
        },

        getLoading: state => {
            return state.setLoading;
        },

        getTotalPages: state => {
            return state.totalPages;
        },

        getPage: state => {
            return state.page;
        },

        product: state => {
            return state.product;
        },

        getCategories: state => {
            return state.categories;
        },

        getSelectedCategory: state => {
            return state.selectedCategory;
        },

        getFilteredProducts: state => {
            if (state.selectedCategory === 0) {
                return state.products; // Все элементы отображаются, если выбрана категория "all"
            } else {
                return state.products.filter(item => item.category_id === state.selectedCategory);
            }
        },

    },

    mutations: {

        setIsSizeZoomModal(state, objectValue) {

            if(!state.isSizeZoomModalOpen) {

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

                    const modalMenu = document.querySelector('.size-zoom-modal')

                    if(modalMenu) modalMenu.classList.toggle('size-zoom-modal_show')

                }, 1)

                state.isSizeZoomModalOpen = objectValue.condition

                state.sizeImagePath = objectValue.imagePath


            } else {

                setTimeout(() => {

                    state.isSizeZoomModalOpen = objectValue.condition

                }, 300)

                const modalMenu = document.querySelector('.size-zoom-modal')

                if(modalMenu) modalMenu.classList.toggle('size-zoom-modal_show')

            }

        },

        setProducts(state, products) {
            state.products = products
        },

        setCategories(state, categories) {
            state.categories = categories
        },

        setProduct(state, product) {
            state.product = product
        },

        setLoading(state, bool) {
            state.setLoading = bool
        },

        setSelectedCategory(state, category) {
            state.selectedCategory = category
        },

        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },

        loadedImage(state, object) {
            const images = document.querySelectorAll(object.elClass)
            images.forEach((image) => {

                setTimeout(() => {
                    image.classList.add('loaded')
                }, 150)

            })
        },

    },

    actions: {

        async fetchProducts({state, commit}) {

            try {

                const response = await axios.get('http://127.0.0.1:8000/api/v1/products', {
                    params: {
                        _page: state.page,
                    }
                })

                commit('setTotalPages', Math.ceil(response.data.meta.total / response.data.meta.per_page))

                commit('setProducts', response.data.data)

            } catch (exception) {

                console.log('Возникла ошибка: ' + exception)

            } finally {

                // commit('setLoading', false)

            }
        },

        async fetchCategories({commit}) {

            try {

                const response = await axios.get('http://127.0.0.1:8000/api/v1/categories', {})

                commit('setCategories', response.data)

            } catch (exception) {

                console.log('Возникла ошибка: ' + exception)

            }
        },

        async fetchProduct(context, id) {

            try {

                context.commit('setLoading', true)

                const response = await axios.get(`http://127.0.0.1:8000/api/v1/products/${id}`, {})

                // commit('setTotalProducts', Math.ceil(response.headers['x-total-count'] / state.limit))

                context.commit('setProduct', response.data)

            } catch (exception) {

                alert(exception)

            } finally {

                context.commit('setLoading', false)

            }
        },

        loadedImage(context, object) {
            context.commit('loadedImage', object);
        },

        filteredProducts(context) {
            context.commit('filteredProducts');
        },

        setSelectedCategory(context, item) {
            context.commit('setSelectedCategory', item);
        },

    },

    namespaced: true,

}