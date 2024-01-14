export const productModule = {

    state: () => {
        return {
            isSizeZoomModalOpen: false,
            sizeImagePath: '',
        }
    },

    getters: {},

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

    },

    actions: {},

    namespaced: true,

}