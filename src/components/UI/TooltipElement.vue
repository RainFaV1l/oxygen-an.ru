<template>
  <div class="
      flex justify-center items-center w-14 h-14
      rounded-full bg-white text-sm font-medium
      text-black cursor-pointer tooltip-element-shadow transition-shadow
      tooltip-element-icon
  ">
    <span v-if="showIcon" class="close-icon">
      <XMarkIcon class="cursor-pointer h-6 w-6 text-dark stroke-1 close-icon"></XMarkIcon>
    </span>
    <span class="answer-icon" v-else>?</span>
  </div>
</template>

<script>
import {XMarkIcon} from "@heroicons/vue/24/outline";

export default {
  components: {XMarkIcon},
  props: {
    contacts: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      showIcon: false,
    }
  },
  methods: {
    showAndHideAnimation(hintElementClass, hintElementClassActive, hide = false) {
      const hintElements = document.querySelectorAll(hintElementClass)
      if(!hintElements) return
      hintElements.forEach(hintElement => {
        if(hide) {
          hintElement.classList.remove(hintElementClassActive)
        } else {
          hintElement.classList.add(hintElementClassActive)
        }
      })
    }
  },
  watch: {
    contacts: {
      immediate: true,
      handler(newValue) {
        if(!newValue) {
          setTimeout(() => {
            this.showAndHideAnimation('.tooltip-element-icon', 'tooltip-element-icon_show')
          }, 1)
          this.showIcon = true;
        } else {
          this.showAndHideAnimation('.tooltip-element-icon', 'tooltip-element-icon_show', true)
          setTimeout(() => {
            this.showIcon = false;
          }, 300)
        }
      }
    }
  },
}
</script>

<style scoped>
  .tooltip-element-shadow:hover {
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  }
  .tooltip-element-icon .answer-icon {
    opacity: 1;
    transition: .3s ease-in-out;
  }
  .tooltip-element-icon .close-icon {
    opacity: 0;
    scale: 0;
    transition: .3s ease-in-out;
  }
  .tooltip-element-icon.tooltip-element-icon_show .close-icon {
    opacity: 1;
    scale: 1;
  }
</style>