import Vue from 'vue'
import App from './App.vue'

import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';

import VueRouter from 'vue-router';

import Home from "./components/Home";
import About from "./components/About";

Amplify.configure(aws_exports);

Vue.config.productionTip = false
Vue.use(VueRouter)
const routes = [
  { path: "/home", component: Home },
  { path: "/about", component: About},
];

const router = new VueRouter({
  routes // short for `routes: routes`
})


new Vue({
  render: h => h(App),
  router,
}).$mount('#app')