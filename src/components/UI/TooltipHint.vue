<template>
  <div class="flex items-center gap-2">
    <HintFigure :hint="hint" v-if="!hideFigure" class="hint-figure"/>
    <TooltipElement :contacts="contacts"/>
  </div>
</template>

<script>
import HintFigure from "@/components/UI/HintFigure.vue";
import TooltipElement from "@/components/UI/TooltipElement.vue";

export default {
  components: {TooltipElement, HintFigure},
  props: {
    hint: {
      type: Object,
      required: true,
    },
    contacts: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    showAndHideAnimation(hintElementClass, hintElementClassActive) {
      const hintElements = document.querySelectorAll(hintElementClass)
      if(!hintElements) return
      hintElements.forEach(hintElement => {
        hintElement.classList.add(hintElementClassActive)
      })
    }
  },
  watch: {
    contacts: {
      immediate: true,
      handler(newValue) {
        if(!newValue) {
          this.showAndHideAnimation('.hint-figure', 'hint-figure_hide')
          setTimeout(() => {
            this.hideFigure = true;
          }, 200)
        } else {
          this.hideFigure = false;
        }
      }
    }
  },
  data() {
    return {
      hideFigure: false
    };
  },
}
</script>

<style scoped>
  .hint-figure {
    opacity: 1;
    transition: all .2s ease-in-out;
  }
  .hint-figure.hint-figure_hide {
    opacity: 0;
  }
</style>