// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Vue1.http.options.root = '/root';
// Vue1.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';
// Vue1.http.options.emulateJSON = true;
// Vue1.http.options.emulateHTTP = true;

import Vue    from 'vue'
import App    from './screens/App'
import Annotation   from './screens/Annotation'
import Signup from './components/signup'
import AnnotationComponent from './components/AnnotationComponent'
import Questionanswers from './components/QuestionAnswers'


var VueRouter = require('vue-router');
Vue.use(VueRouter);
Vue.use(axios);



var router = new VueRouter({
  saveScrollPosition: true,
  history: true
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App},
   http: {
    root: '/root',
    headers: {
      'access-control-allow-origin,content-type': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
});


new Vue({
  el: '#annotation',
  template: '<Annotation/>',
  components: { Annotation, AnnotationComponent, Questionanswers },
   http: {
    root: '/root',
    headers: {
      'access-control-allow-origin,content-type': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

});


router.map({
  '/sign': {
    component: Signup
  }
});


export default router