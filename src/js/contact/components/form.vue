<template lang="pug">
	form(onsubmit="event.preventDefault();")
		div.row
			div.col-xs-12.col-md-4
				label
					span نام
					input.form-input(type="text" name="name" v-model="name")
					div {{getError('name')}}
						div.text-danger {{validationErrors.name}}

			div.col-xs-12.col-md-4
				label
					span ایمیل
					input.form-input(type="email" name="email" v-model="email")
					div {{getError('email')}}
						div.text-danger {{validationErrors.email}}

			div.col-xs-12.col-md-4
				label
					span تلفن
					input.form-input(type="text" name="phone" v-model="phone")
					div {{getError('phone')}}
						div.text-danger {{validationErrors.phone}}

		div.row
			div.col-xs-12
				label
					span عنوان
					input.form-input(name="title" v-model="title")
				div {{getError('title')}}
					div.text-danger {{validationErrors.title}}

		div.row
			div.col-xs-12
				label
					span پیام
					textarea.form-input(rows=3 name="content" v-model="content")
				div {{getError('content')}}
					div.text-danger {{validationErrors.content}}

			div.g-recaptcha#contact-g-recaptcha(:data-sitekey="siteKey")

		div.ta-left
			button.btn.btn-gold(@click="sendGuest" :click="{'disable': requesting}")
				span(v-if="!requesting") ارسال پیام
				span(v-else) در حال ارسال
</template>

<script>
export default {
	name: 'contact-form',
    data() {
        return {
            title: null,
            content: null,
            email: null,
            name: null,
            phone: null,
            siteKey: '6Lcrtc4SAAAAAKekvip0yI9Dp2DKXyVtliBXnqHS',
            g_recaptcha: '',

			/**
			 * common
			 */
			requesting: false,

            /**
             * Validation errors
             */
            errors: {},
			validationMessages: {
                required: 'این فیلد الزامی می باشد',
                min: 'این فیلد نباید کمتر از :min کاراکتر باشد',
                max: 'این فیلد نباید بیشتر از :max کاراکتر باشد',
                numeric: 'این فیلد باید در قالب عدد باشد',
                email: 'این فیلد باید در قالب ایمیل',
                regex: 'قالب این فیلد معتبر نمی‌باشد',
			},
			validationErrors: {}
        }
    },
    computed: {
    },
	mounted(){
        let tag = document.createElement("script");
        tag.src = "https://www.google.com/recaptcha/api.js?onload=onloadgrecaptcha&hl=fa-IR";
        let gReCaptchaElement = document.getElementById('contact-g-recaptcha');
        let sitekey = this.siteKey;
        window.onloadgrecaptcha = function(){
            this.rcapt_id = grecaptcha.render(gReCaptchaElement , { sitekey });
        };
        document.getElementsByTagName("head")[0].appendChild(tag);
    },
    methods: {
        sendGuest() {
            this.g_recaptcha = window.grecaptcha.getResponse(this.rcapt_id);
            if (this.g_recaptcha.length === 0) {
                return
            }

            if (!this.requesting) {
                let vm = this;
                vm.requesting = true;
                vm.errors = {};
                vm.validationErrors = {};

                axios.post('https://www.zarinpal.com/rest/v3/ticket/guest.json', {
                    title: this.title,
                    content: this.content,
                    email: this.email,
                    name: this.name,
                    phone: this.phone,
                    ticket_department_id: '3',
                    priority: '0',
                    g_recaptcha: this.g_recaptcha
                })
                    .then(function (response) {
                        let publicId = response.data.data.public_id;
                        vm.requesting = false;

                        window.location.replace("https://my.zarinpal.com/panel/ticket/guest/" + btoa(vm.email) + "/" + btoa(publicId));
                    })
                    .catch(function (error) {
                        vm.requesting = false;
                        vm.errors = error.response.data.validation_errors;
                    });
			}
        },
        getError(field) {
            let vm = this;
            if (vm.errors.length > 0) {
                let error = vm.errors.find(function(error) {
                    return error.input === field;
                });

                if (error) {
                    let validation = error.rule;
                    if (Object.keys(error.params).length > 0) {
                        validation += ':' + error.params[0];
                    }

                    vm.errorMessage(field, validation);
                }
            }
        },
        errorMessage(field, validation) {
            let vm = this;
            let validationRules = validation.split(":");
            let message = vm.validationMessages[validationRules[0]];

            if (validationRules.length > 1) {
				message = vm.validationMessages[validationRules[0]].replace(':' + validationRules[0],  validationRules[1]);
			}

            vm.validationErrors[field] = message;
		}
    },
}
</script>