import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter)


import Home   from './screens/Home'
import Lexicon   from './screens/Lexicon'


export default new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [

    { path: '/home', component: Home },
    { path: '/lexicon', component: Lexicon },
    { path: '/', redirect: '/home' }
  ]
})