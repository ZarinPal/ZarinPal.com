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


            /**
             * Validation errors
             */
            errors: {}
        }
    },
    methods: {
        sendGuest() {
            let vm = this;
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
                    window.location.replace("/guestTicket/reply/" + vm.email + "/139612270127");
                })
                .catch(function (error) {
                    vm.errors = error.response.data.validation_errors;
                    console.log(error);
                });
        }
    },
});