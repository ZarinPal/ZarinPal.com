import Vue from "vue";
import axios from 'axios';
import contactForm from '../contact/components/form.vue';

window.axios = axios;

new Vue({
    el: '#app',
    components: {
        contactForm
    }
});
