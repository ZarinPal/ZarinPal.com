import {MDCTextField} from '@material/textfield';
import Typed from 'typed.js';
import {MDCSnackbar} from '@material/snackbar';

let WOW = require('wowjs');
window.wow = new WOW.WOW({});

const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));


window.wow.init();
let textFieldName = new MDCTextField(
    document.querySelector(`#text-field-name`)
);
let textFieldLastName = new MDCTextField(
    document.querySelector(`#text-field-lastname`)
);
let textFieldEmail = new MDCTextField(
    document.querySelector(`#text-field-email`)
);
let textFieldAddress = new MDCTextField(
    document.querySelector(`#text-field-address`)
);
let textFieldMoreinfo = new MDCTextField(
    document.querySelector(`#text-field-moreinfo`)
)


let typed = new Typed("#content-champion", {
    strings: [" حمایت می خواهد.", " آموزش می خواهد.", " دیده شدن می خواهد."],
    typeSpeed: 50,
    loop: true,
    showCursor: false

});


/**
 * Scroll page down to content
 */
window.scrollToSection = function (elementId) {
    let timerID = setInterval(function () {
        window.scrollBy(0, 30);

        let sliderHeight = document.getElementById(elementId).offsetTop - 30;

        if (window.pageYOffset >= sliderHeight || (sliderHeight + window.scrollY) >=
            document.body.offsetHeight)
            clearInterval(timerID);
    }, 30);
};

document.getElementById("submit-survey").onclick = () => {
    let http = new XMLHttpRequest();
    let url = 'https://docs.google.com/forms/d/e/1FAIpQLSdv7kW9FYATfmHh7oBt4UjvpvW6g2ugjP-Rmb8ZFEg9BnWNxA/formResponse';
    let params =
         'entry.1032711555=' + document.getElementById("firstname-text-field").value +
        '&entry.1032640180=' + document.getElementById("lastname-text-field").value +
        '&entry.1692259573=' + document.getElementById("address-text-field").value +
        '&entry.2036282994=' + document.getElementById("email-text-field").value +
        '&entry.1549688892=' + document.getElementById("text-field-textarea-dense").value;
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        snackbar.show({
            message: 'اطلاعات شما با موفقیت ثبت گردید.',
            actionText: 'باشه',
            actionHandler: () => {},
            timeout: 6000
        });
        document.getElementById("submit-survey").disabled = true;
    };
    http.send(params);

};

