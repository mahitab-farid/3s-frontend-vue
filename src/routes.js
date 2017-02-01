import VueRouter from 'vue-router';


let routes = [

	{

		path: '/',

		component: require('./component/signup.vue')


	}

];


export default new VueRouter ({

	  saveScrollPosition: true,
 	  history: true
});