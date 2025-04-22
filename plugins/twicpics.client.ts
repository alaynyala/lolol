import { createApp } from 'vue';
import TwicPics from '@twicpics/components/vue3';
import '@twicpics/components/style.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(TwicPics, {
    domain: 'https://alainahunt.twic.pics', // Replace with your actual TwicPics domain
    anticipation: 0.5,
    step: 100,
  });
}); 