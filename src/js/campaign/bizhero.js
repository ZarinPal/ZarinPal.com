import {MDCTextField} from '@material/textfield';
import Typed from 'typed.js';
import axios from 'axios';
let WOW = require('wowjs');
window.wow = new WOW.WOW({
});

import {MDCSnackbar} from '@material/snackbar';
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
let textFieldAddress= new MDCTextField(
    document.querySelector(`#text-field-address`)
  );
let textFieldMoreinfo= new MDCTextField(
    document.querySelector(`#text-field-moreinfo`)
  )


let typed = new Typed("#content-champion", {
  strings: [" حمایت می خواهد."," آموزش می خواهد."," دیده شدن می خواهد."],
  typeSpeed: 50,
  loop: true,
  showCursor:false

});



/**
 * Scroll page down to content
 */
window.scrollToSection = function (elementId) {
  let timerID = setInterval(function() {
    window.scrollBy(0, 30);

    let sliderHeight = document.getElementById(elementId).offsetTop - 30;

    if (window.pageYOffset >= sliderHeight || (sliderHeight + window.scrollY) >=
      document.body.offsetHeight)
      clearInterval(timerID);
  }, 30);
};

document.getElementById("submit-survey").onclick = ()=>{
  axios.post('https://docs.google.com/forms/d/e/1FAIpQLSdv7kW9FYATfmHh7oBt4UjvpvW6g2ugjP-Rmb8ZFEg9BnWNxA/formResponse ', {
    'entry.1032711555': document.getElementById("firstname-text-field").value,
    'entry.1032640180': document.getElementById("lastname-text-field").value,
    'entry.1692259573': document.getElementById("address-text-field").value,
    'entry.2036282994': document.getElementById("email-text-field").value,
    'entry.1549688892': document.getElementById("text-field-textarea-dense").value,
  })
  .then(function (response) {
    snackbar.show({
      message: 'اطلاعات شما با موفقیت ثبت گردید.',
      actionText: 'باشه',
      actionHandler:()=>{},
      timeout:6000
    });
  })
  .catch(function (error) {
    snackbar.show({
      message: 'درخواست شما با خطا مواجه شد.',
      actionText: 'باشه',
      actionHandler:()=>{},
      timeout:6000
    });
  });
};

