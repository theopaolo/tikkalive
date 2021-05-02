import Vue from 'vue';
import App from './App.vue';

import VueApollo from "vue-apollo";
import VueRouter from "vue-router";
import VueDraggableResizable from 'vue-draggable-resizable';
import MarqueeText from 'vue-marquee-text-component';


import apolloClient from "./vue-apollo";

Vue.config.productionTip = false;

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
      path: "/article/:id",
      components: require("./containers/Article.vue")
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

