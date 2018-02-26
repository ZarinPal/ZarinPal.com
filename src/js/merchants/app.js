import Vue from "vue";
import VueRouter from "vue-router";
import MerchantList from '../merchants/components/MerchantList.vue';
import Main from '../merchants/components/Main.vue';
import app from '../merchants/components/App.vue';

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