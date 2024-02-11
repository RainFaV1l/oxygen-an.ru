import axios from "axios";

export const productModule = {

    state: () => {
        return {
            isSizeZoomModalOpen: false,
            sizeImagePath: '',
            products: [],
            popularProducts: [],
            product: {},
            categories: [],
            setLoading: false,
            selectedCategory: 0,
            page: 1,
            totalPages: 0,
            searchQuery: '',
        }
    },

    getters: {

        getProducts: state => {
            return state.products;
        },

        getPopularProducts: state => {
            return state.popularProducts;
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

        getSearchQuery: state => {
            return state.searchQuery;
        },

        getFilteredProducts: state => {

            if(state.searchQuery.length > 0 && state.selectedCategory === 0) {

                return state.products.filter(product =>

                    product.name.toLowerCase().includes(state.searchQuery.toLowerCase())

                );

            }

            if(state.searchQuery.length > 0 && state.selectedCategory !== 0) {

                return state.products.filter(product =>

                    product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) && product.category_id === state.selectedCategory

                );

            }

            if(state.searchQuery.length === 0 && state.selectedCategory !== 0) {

                return state.products.filter(product =>

                    product.category_id === state.selectedCategory

                );

            }

            else {

                return state.products

            }

        },

    },

    mutations: {

        setSearchQuery(state, query) {

            state.searchQuery = query

        },

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

        addProducts(state, products) {
            state.products = [...state.products, ...products]
        },

        setPopularProducts(state, popularProducts) {
            state.popularProducts = popularProducts
        },

        setCategories(state, categories) {
            state.categories = categories
        },

        setProduct(state, product) {
            state.product = product
        },

        setPage(state, page) {
            state.page = page
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

        async fetchProducts({
            //state, 
            commit}) {

            try {

                const response = await axios.get('http://backend.u2484741.isp.regruhosting.ru/api/v1/products', {
                    // params: {
                    //     page: state.page,
                    // }
                })

                // commit('setTotalPages', Math.ceil(response.data.meta.total / response.data.meta.per_page))

                // commit('setProducts', response.data.data)

                commit('setProducts', response.data)

            } catch (exception) {

                console.log('Возникла ошибка: ' + exception)

            } finally {

                // commit('setLoading', false)

            }
        },

        async fetchPopularProducts({commit}, id) {

            try {

                const response = await axios.get(`http://backend.u2484741.isp.regruhosting.ru/api/v1/products/${id}/see/also`, {})

                commit('setPopularProducts', response.data)

            } catch (exception) {

                console.log('Возникла ошибка: ' + exception)

            } finally {

                // commit('setLoading', false)

            }
        },

        async loadMoreProducts({state, commit}) {

            try {

                state.page += 1

                const response = await axios.get('http://backend.u2484741.isp.regruhosting.ru/api/v1/products', {
                    params: {
                        page: state.page,
                    }
                })

                commit('setTotalPages', Math.ceil(response.data.meta.total / response.data.meta.per_page))

                commit('addProducts', response.data.data)

            } catch (exception) {

                console.log('Возникла ошибка: ' + exception)

            } finally {

                // commit('setLoading', false)

            }
        },

        async fetchCategories({commit}) {

            try {

                const response = await axios.get('http://backend.u2484741.isp.regruhosting.ru/api/v1/categories', {})

                commit('setCategories', response.data)

            } catch (exception) {

                console.log('Возникла ошибка: ' + exception)

            }
        },

        async fetchProduct(context, id) {

            try {

                context.commit('setLoading', true)

                const response = await axios.get(`http://backend.u2484741.isp.regruhosting.ru/api/v1/products/${id}`, {})

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

        setPage(context, item) {
            context.commit('setPage', item);
        },

        setSearchQuery(context, item) {
            context.commit('setSearchQuery', item);
        },

    },

    namespaced: true,

}