(function() {
    require('./pages/common');
    require('./pages/faq');
})();

import Vue from "vue";
import VueRouter from "vue-router";
import MerchantList from '../js/merchants/components/MerchantList.vue';
import Main from '../js/merchants/components/Main.vue';
import app from '../js/merchants/components/App.vue';

Vue.use(VueRouter);
import axios from 'axios';
window.axios = axios;

const router = new VueRouter({
    base: __dirname,
    routes: [
        {
            path: '/cat/:cat/page/:page',
            name: 'MerchantList',
            component: MerchantList
        },
        {
            path: '/main',
            name: 'Main',
            component: Main
        },
        {
            path: '/',
            redirect: {
                name: 'Main'
            }
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

new Vue({
    el: '#app',
    router,
    components: {
        app
    }
});
