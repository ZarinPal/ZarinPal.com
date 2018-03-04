import Vue from "vue";
import axios from 'axios';
window.axios = axios;

new Vue({
    el: '#app',
    data() {
        return {
            title: null,
            content: null,
            email: null,
            name: null,
            phone: null,
        }
    },
    methods: {
        sendGuest() {
            axios.post('https://www.zarinpal.com/rest/v3/ticket/guest.json', {
                title: this.title,
                content: this.content,
                email: this.email,
                name: this.name,
                phone: this.phone,
                ticket_department_id: '1',
                priority: '0'
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
});