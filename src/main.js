// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var Vue1 = require('vue');
window.Vue = Vue1;
Vue1.use(require('vue-resource'));
Vue1.http.options.xhr = {withCredentials: true};
Vue1.http.headers.common['Access-Control-Request-Method'] = '*'
// Vue1.http.options.root = '/root';
// Vue1.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';
// Vue1.http.options.emulateJSON = true;
// Vue1.http.options.emulateHTTP = true;

import Vue from 'vue'
import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
   http: {
    root: '/root',
    headers: {
      'access-control-allow-origin,content-type': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

})
