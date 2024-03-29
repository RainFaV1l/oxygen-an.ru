<template>
  <div class="absolute search-modal h-full w-full z-10" @click="closeSearchModal">
    <div class="search-modal__content fixed top-0 left-0 w-full flex flex-col justify-center items-center p-6 sm:p-12 z-20 gap-7" style="background-color: rgb(227, 217, 210);">
      <div class="flex justify-center sm:justify-start items-center w-full xl:w-1/2 2xl:w-1/3 gap-7">
        <div class="relative w-full h-full">
          <div class="absolute top-1/2 left-6 -translate-y-1/2">
            <MagnifyingGlassIcon class="h-6 w-6 text-dark stroke-1 cursor-pointer rotate-90"/>
          </div>
          <div v-if="clearSearch" @click="clearSearchForm" class="absolute top-1/2 right-6 -translate-y-1/2 bg-white rounded-full p-2 h-7 w-7 flex justify-center items-center cursor-pointer">
            <XMarkIcon class="text-dark stroke-1"></XMarkIcon>
          </div>
          <input v-model="searchQuery" @input="showClearSearchButton" type="text" class="placeholder-dark placeholder-opacity-40 bg-transparent border border-dark border-opacity-25 py-4 px-16 appearance-none w-full text-base font-medium" placeholder="Искать">
        </div>
        <div class="h-9 w-9 close-icon cursor-pointer">
          <XMarkIcon class="h-9 w-9 text-dark stroke-1"></XMarkIcon>
        </div>
      </div>
      <!-- <ul class="flex flex-wrap sm:justify-start gap-4 justify-center w-1/3">
        <li class="text-sm border border-dark border-opacity-25 px-3 py-2 rounded-full cursor-pointer">тренч</li>
        <li class="text-sm border border-dark border-opacity-25 px-3 py-2 rounded-full cursor-pointer">платье</li>
        <li class="text-sm border border-dark border-opacity-25 px-3 py-2 rounded-full cursor-pointer">пиджак</li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import {MagnifyingGlassIcon, XMarkIcon} from "@heroicons/vue/24/outline";
import {mapGetters, mapActions} from "vuex";

export default {
  components: {MagnifyingGlassIcon, XMarkIcon},
  data() {
    return {
      clearSearch: false,
      searchQuery: '',
    }
  },
  computed: {
    ...mapGetters('product', ['getFilteredProducts', 'getSearchQuery']),
  },
  watch: {
    searchQuery(newQuery) {
      this.setSearchQuery(newQuery)
      if(newQuery !== '') {
        this.clearSearch = true
      } else {
        this.clearSearch = false
      }
    }
  },
  mounted() {
    this.searchQuery = this.getSearchQuery
  },
  methods: {
    ...mapActions('product', ['setSearchQuery']),
    closeSearchModal(event) {
      if (event.target.classList.contains('search-modal') || event.target.closest('.close-icon')) {
        this.$emit('closeSearchModalMenu');
      }
    },
    clearSearchForm() {
      this.searchQuery = ''
      this.setSearchQuery('')
      this.clearSearch = false
    },
    showClearSearchButton() {
      if(this.getSearchQuery !== '') {
        this.clearSearch = true
        return
      }
      this.clearSearch = false
    },
  }
}
</script>

<style scoped>

</style>