import Vue from 'vue';
import App from './app/App.vue';

import { store } from './store';
import { router } from './helpers';
import EventDetails from './components/EventDetails'
import './assets/css/styles.css';
Vue.config.productionTip = true;

Vue.component('EventDetails', EventDetails);

// setup fake backend
//import { configureFakeBackend } from './helpers';
//configureFakeBackend();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
