<template>
  <div class="fixed bottom-10 right-5 sm:right-16 sm:bottom-16 flex flex-col items-end gap-4 ask-question z-10">
    <div class="flex flex-col gap-2 self-end mr-0.5">
      <div class="flex justify-center items-center">
        <div class="flex flex-col gap-2" v-if="contacts">
          <a href="tel:+79128213599" class="flex items-center justify-end gap-2 contacts-list">
            <HintFigure class="hint-element" v-if="hintPhone" :hint="{ name: 'Телефон', xs: true }"/>
            <div @mouseover="showEl('hintPhone', '.hint-element', 'hint-element_show')" @mouseleave="hideEl('hintPhone', '.hint-element', 'hint-element_show', 200)">
              <PhoneLogo class="cursor-pointer logo-shadow transition-shadow" :new-height="50" :new-width="50"/>
            </div>
          </a>
          <a href="mailto:store@oxygen-an.ru" class="flex items-center justify-end gap-2 contacts-list">
            <HintFigure class="hint-element" v-if="hintMail" :hint="{ name: 'Почта', xs: true }"/>
            <div @mouseover="showEl('hintMail', '.hint-element', 'hint-element_show')" @mouseleave="hideEl('hintMail', '.hint-element', 'hint-element_show', 200)">
              <MailLogo class="cursor-pointer logo-shadow transition-shadow" :new-height="50" :new-width="50"/>
            </div>
          </a>
          <a href="#" class="hidden flex items-center justify-end gap-2 contacts-list">
            <HintFigure class="hint-element" v-if="hintVk" :hint="{ name: 'Vk', xs: true }"/>
            <div @mouseover="showEl('hintVk', '.hint-element', 'hint-element_show')" @mouseleave="hideEl('hintVk', '.hint-element', 'hint-element_show', 200)">
              <VkLogo class="cursor-pointer logo-shadow transition-shadow" :new-height="50" :new-width="50"/>
            </div>
          </a>
          <a href="#" class="hidden flex items-center justify-end gap-2 contacts-list">
            <HintFigure class="hint-element" v-if="hintWhatsApp" :hint="{ name: 'WhatsApp', xs: true }"/>
            <div @mouseover="showEl('hintWhatsApp', '.hint-element', 'hint-element_show')" @mouseleave="hideEl('hintWhatsApp', '.hint-element', 'hint-element_show', 200)">
              <WhatsAppLogo class="cursor-pointer logo-shadow transition-shadow" :new-height="50" :new-width="50"/>
            </div>
          </a>
          <a href="#" class="hidden flex items-center justify-end gap-2 contacts-list">
            <HintFigure class="hint-element" v-if="hintTelegram" :hint="{ name: 'Telegram', xs: true }"/>
            <div @mouseover="showEl('hintTelegram', '.hint-element', 'hint-element_show')" @mouseleave="hideEl('hintTelegram', '.hint-element', 'hint-element_show', 200)">
              <TelegramLogo class="cursor-pointer logo-shadow transition-shadow" :new-height="50" :new-width="50"/>
            </div>
          </a>
          <a href="#" class="hidden flex items-center justify-end gap-2 contacts-list">
            <HintFigure class="hint-element" v-if="hintInstagram" :hint="{ name: 'Instagram', xs: true }"/>
            <div @mouseover="showEl('hintInstagram', '.hint-element', 'hint-element_show')" @mouseleave="hideEl('hintInstagram', '.hint-element', 'hint-element_show', 200)">
              <InstagramLogo class="cursor-pointer logo-shadow transition-shadow" :new-height="50" :new-width="50"/>
            </div>
          </a>
        </div>
      </div>
    </div>
    <TooltipHint :contacts="!contacts" @click="toggleEl('contacts', '.contacts-list', 'contacts-list_show', 200)" :hint="{ name: 'Задать вопрос' }"/>
  </div>
</template>

<script>
import TooltipHint from "@/components/UI/TooltipHint.vue";
import HintFigure from "@/components/UI/HintFigure.vue";
import PhoneLogo from "@/components/UI/Logos/PhoneLogo.vue";
import MailLogo from "@/components/UI/Logos/MailLogo.vue";
import VkLogo from "@/components/UI/Logos/VkLogo.vue";
import WhatsAppLogo from "@/components/UI/Logos/WhatsAppLogo.vue";
import TelegramLogo from "@/components/UI/Logos/TelegramLogo.vue";
import InstagramLogo from "@/components/UI/Logos/InstagramLogo.vue";

export default {
  components: {PhoneLogo, HintFigure, TooltipHint, MailLogo, VkLogo, WhatsAppLogo, TelegramLogo, InstagramLogo},
  data() {
    return {
      hintPhone: false,
      hintMail: false,
      hintVk: false,
      hintWhatsApp: false,
      hintTelegram: false,
      hintInstagram: false,
      contacts: false,
    }
  },
  methods: {
    showEl(value, animClass, animClassActive) {
      this[value] = true
      setTimeout(() => {
        this.showAndHideAnimation(animClass, animClassActive)
      }, 1)
    },
    hideEl(value, animClass, animClassActive, time) {
      this.showAndHideAnimation(animClass, animClassActive, true)
      setTimeout(() => {
        this[value] = false
      }, time)
    },
    toggleEl(value, animClass, animClassActive, time) {
      if(this[value]) {
        this.hideEl(value, animClass, animClassActive, time)
        return true
      }
      this.showEl(value, animClass, animClassActive)
    },
    showAndHideAnimation(hintElementClass, hintElementClassActive, hide) {
      const hintElements = document.querySelectorAll(hintElementClass)
      if(!hintElements) return
      hintElements.forEach(hintElement => {
        if(hide) {
          hintElement.classList.remove(hintElementClassActive)
          return
        }
        hintElement.classList.add(hintElementClassActive)
      })
    }
  }
}
</script>

<style scoped>
  .logo-shadow:hover {
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  }
  .contacts-list {
    opacity: 0;
    transform: translateY(100px);
    transition: all .3s ease-in-out;
  }
  .hint-element {
    opacity: 0;
    transition: all .3s ease-in-out;
  }
  .contacts-list.contacts-list_show {
    opacity: 1;
    transform: translateY(0px);
  }
  .hint-element.hint-element_show {
    opacity: 1;
  }
</style>