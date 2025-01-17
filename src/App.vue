<template>
  <div class="wrapper min-h-full flex flex-col bg-bg font-montserrat text-dark">
    <PreloaderComponent/>
    <ModalMenu v-if="getIsModalMenuOpen" :mobileMenuModalEls="mobileMenuModalEls"/>
    <SearchModal v-if="isSearchModalOpen" @closeSearchModalMenu="toggleSearchModal"/>
    <SizeZoomModal v-if="$store.state.product.isSizeZoomModalOpen"/>
    <LoginModal v-if="loginModalOpen"/>
    <AskQuestion/>
    <CartModal v-if="cartModalOpen"/>
    <HeaderComponent @toggleSearch="toggleSearchModal"/>
    <main class="flex-auto">
      <router-view></router-view>
    </main>
    <FooterComponent/>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import FooterComponent from "@/components/Footer/FooterComponent.vue";
import ModalMenu from "@/components/Modals/ModalMenu.vue";
import mobileMenuModalEls from "@/props/FooterComponent/MobileMenuModalEls";
import SearchModal from "@/components/Modals/SearchModal.vue";
import AskQuestion from "@/components/UI/AskQuestion.vue";
import SizeZoomModal from "@/components/Modals/SizeZoomModal.vue";
import LoginModal from "@/components/Modals/LoginModal.vue";
import CartModal from "@/components/Modals/CartModal.vue";
import {mapGetters, mapMutations} from "vuex";
import PreloaderComponent from "@/components/UI/PreloaderComponent.vue";

export default {

  name: 'App',

  components: {
    PreloaderComponent,
    CartModal,
    SizeZoomModal,
    AskQuestion,
    SearchModal,
    ModalMenu,
    FooterComponent,
    HeaderComponent,
    LoginModal,
  },

  data() {

    return {

      isModalMenuOpen: false,
      mobileMenuModalEls,
      isSearchModalOpen: false,

    }

  },

  computed: {
    ...mapGetters('cart', ['cartModalOpen']),
    ...mapGetters('auth', ['loginModalOpen', 'getIsModalMenuOpen']),
  },

  created() {

    const urlParams = new URLSearchParams(window.location.search);

    const returnUrl = urlParams.get('returnUrl');

    if (returnUrl) {

      // Перенаправляем пользователя на страницу, указанную в returnUrl
      this.$router.push(returnUrl);

    } else {

      // Если returnUrl не указан, перенаправляем пользователя на домашнюю страницу или другую страницу по умолчанию
      this.$router.push('/');

    }

  },

  mounted() {

    const isAuth = JSON.parse(localStorage.getItem('token'))

    if(isAuth) {

      this.setIsAuth(true)

      return

    }

    this.setIsAuth(false)

  },

  methods: {

    ...mapMutations('auth', ['setIsModalMenuOpen', 'setIsAuth']),

    toggleModal() {

      if(!this.getIsModalMenuOpen) {

        console.log('1')

        this.changeModalData()

        setTimeout(() => {

          this.startModalAnimation('.modal-menu', 'modal-menu_show')

        }, 1)

      } else {

        setTimeout(() => {

          this.changeModalData()

        }, 200)

        this.startModalAnimation('.modal-menu', 'modal-menu_show')
      }

    },

    changeModalData() {

      const hintEl = document.querySelector('.ask-question')

      if(this.getIsModalMenuOpen) {

        console.log('3')

        document.body.style.paddingRight = ''

        if(hintEl) hintEl.style.paddingRight=`0px`

      } else {

        // Узнать ширину полосы прокрутки браузера
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

        document.body.style.paddingRight = `${scrollbarWidth}px`

        document.body.classList.add("bg-bg")

        if(hintEl) hintEl.style.paddingRight=`${scrollbarWidth}px`

      }

      this.setIsModalMenuOpen(!this.getIsModalMenuOpen)

      document.body.classList.toggle("overflow-hidden")

    },

    startModalAnimation(modalClass, activeClass) {

      const modalMenu = document.querySelector(modalClass)

      if(modalMenu) modalMenu.classList.toggle(activeClass)

    },

    toggleSearchModal() {

      if(!this.isSearchModalOpen) {

        setTimeout(() => {

          this.startModalAnimation('.search-modal', 'search-modal_show')

        }, 1)

        this.isSearchModalOpen = !this.isSearchModalOpen;

      } else {

        setTimeout(() => {

          this.isSearchModalOpen = !this.isSearchModalOpen;

        }, 200)

        this.startModalAnimation('.search-modal', 'search-modal_show')

      }

    },
  }
}
</script>

<style>
  /* Упрощаем работу с изображениями */
  img {
    max-width: 100%;
    display: block;
  }

  /* Удаляем все анимации и переходы для людей, которые предпочитай их не использовать */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Анимация */
  .fade-enter-active,
  .fade-leave-active {
    transition: all .3s ease-in-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  /* Анимация обычный способ */
  .modal-menu, .search-modal {
    opacity: 0;
    transition: all .2s ease-in-out;
  }

  .modal-menu.modal-menu_show, .search-modal.search-modal_show {
    opacity: 1;
  }

  .modal-menu .modal-menu__content {
    transition: all .2s ease-in-out;
    transform: translateX(-100px);
  }

  .search-modal .search-modal__content {
    transition: all .2s ease-in-out;
    transform: translateY(-100px);
  }

  .modal-menu.modal-menu_show .modal-menu__content {
    transform: translateX(0px);
  }

  .search-modal.search-modal_show .search-modal__content {
    transform: translateY(0px);
  }

  .modal .modal__content {
    transition: .3s ease-in-out;
    opacity: 0;
  }

  .modal.modal_show .modal__content {
    opacity: 1;
  }

  .image-container img {
    transition: opacity .3s ease-in-out;
    opacity: 0;
  }

  .image-container.loaded img {
    opacity: 1;
  }

  .body-overflow-auto {
    overflow: auto !important;
  }

</style>
