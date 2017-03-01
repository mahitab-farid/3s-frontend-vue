// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Vue1.http.options.root = '/root';
// Vue1.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';
// Vue1.http.options.emulateJSON = true;
// Vue1.http.options.emulateHTTP = true;

import Vue    from 'vue'
import VueRouter from 'vue-router'
import App    from './screens/App'
import Annotation   from './screens/Annotation'
import Checker   from './screens/Checker'
import Home   from './screens/Home'
import AdminHome   from './screens/AdminHome'
import Lexicon   from './screens/Lexicon'
import Questions   from './screens/Questions'
import LexiconSearch from './screens/LexiconSearch'
import Signup from './components/signup'
import AnnotationComponent from './components/AnnotationComponent'
import CheckCookiesComponent from './components/CheckCookiesComponent'
import StatisticsDashboard from './screens/StatisticsDashboard'
import ApprovedNewUsers from './screens/ApprovedNewUsers'
import CheckerComponent from './components/CheckerComponent'
import Questionanswers from './components/QuestionAnswers'
import Routes from './routes.js'

import Paginate from 'vuejs-paginate'

Vue.use(Paginate);
Vue.use(VueRouter);
Vue.use(axios);
window.hostname = 'http://45.56.100.181/:9010';
// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
/* eslint-disable no-new */

if (document.querySelector('#app')){
  new Vue({
    el: '#app',
    template: '<App/>',
    components: { App, CheckCookiesComponent},
     http: {
      root: '/root',
      headers: {
        'access-control-allow-origin,content-type': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  });
}

if (document.querySelector('#questions')){
  new Vue({
    el: '#questions',
    template: '<Questions/>',
    components: { Questions },
     http: {
      root: '/root',
      headers: {
        'access-control-allow-origin,content-type': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  });
}

if (document.querySelector('#lexiconSearch')){
  new Vue({
    el: '#lexiconSearch',
    template: '<LexiconSearch/>',
    components: { LexiconSearch },
     http: {
      root: '/root',
      headers: {
        'access-control-allow-origin,content-type': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  });
}


if (document.querySelector('#statisticsDashboard')){
  new Vue({
    el: '#statisticsDashboard',
    template: '<StatisticsDashboard/>',
    components: {StatisticsDashboard},
     http: {
      root: '/root',
      headers: {
        'access-control-allow-origin,content-type': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  });
}


if (document.querySelector('#approvedNewUsers')){
  new Vue({
    el: '#approvedNewUsers',
    template: '<ApprovedNewUsers/>',
    components: {ApprovedNewUsers},
     http: {
      root: '/root',
      headers: {
        'access-control-allow-origin,content-type': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  });
}


if (document.querySelector('#annotation')) {
new Vue({
  el: '#annotation',
  template: '<Annotation/>',
  components: { Annotation, AnnotationComponent, Questionanswers},
   http: {
    root: '/root',
    headers: {
      'access-control-allow-origin,content-type': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

});
}

if (document.querySelector('#checker')){
new Vue({
  el: '#checker',
  template: '<Checker/>',
  components: { Checker, Questionanswers , CheckerComponent},
   http: {
    root: '/root',
    headers: {
      'access-control-allow-origin,content-type': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

});
}

if (document.querySelector('#home')){
    new Vue({
      el: '#home',
      template: '<Home/>',
      components: {Home, Lexicon},
       http: {
        root: '/root',
        headers: {
          'access-control-allow-origin,content-type': '*',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

    });
}

if (document.querySelector('#lexicon')){
new Vue({
  el: '#lexicon',
  template: '<Lexicon/>',
  components: {Lexicon},
   http: {
    root: '/root',
    headers: {
      'access-control-allow-origin,content-type': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

});
}

if (document.querySelector('#adminHome')){
new Vue({
  el: '#adminHome',
  template: '<AdminHome/>',
  components: {AdminHome},
   http: {
    root: '/root',
    headers: {
      'access-control-allow-origin,content-type': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

});
}

