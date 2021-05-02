import Vue from 'vue';
import App from './App.vue';

import VueApollo from "vue-apollo";
import VueRouter from "vue-router";
import VueDraggableResizable from 'vue-draggable-resizable';
import MarqueeText from 'vue-marquee-text-component';

import PrismicVue from '@prismicio/vue'
import linkResolver from './link-resolver' // Update this path if necessary

import Publication from './containers/Publication.vue';

const accessToken = '' // Leave empty if your repo is public
const endpoint = 'https://tikkalive.cdn.prismic.io/api/v2' // Use your repo name

import apolloClient from "./vue-apollo";

Vue.config.productionTip = false;

Vue.use(PrismicVue, {
  endpoint,
  apiOptions: { accessToken },
  linkResolver
})

Vue.use(VueApollo);
Vue.use(VueRouter);

import PerfectScrollbar from 'vue2-perfect-scrollbar';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';
Vue.use(PerfectScrollbar);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/publications/:uid',
      name: "publication",
      component: Publication
    }
  ]
});

Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.component('marquee-text', MarqueeText)

new Vue({
  apolloProvider,
  router,
  render: h => h(App),
}).$mount('#app')

