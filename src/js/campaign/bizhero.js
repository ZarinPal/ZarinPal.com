import {MDCTextField} from '@material/textfield';
import Typed from 'typed.js';
let WOW = require('wowjs');
window.wow = new WOW.WOW({
});


window.wow.init();
let textFieldName = new MDCTextField(
    document.querySelector(`#text-field-name`)
  );
let textFieldLastName = new MDCTextField(
    document.querySelector(`#text-field-lastname`)
  );
let textFieldMoreInfo = new MDCTextField(
    document.querySelector(`#text-field-moreinfo`)
  );



let typed = new Typed("#content-champion", {
  strings: ["قهرمان کسب و کار بودن حمایت می خواهد","قهرمان کسب و کار بودن آموزش میخواهد","قهرمان کسب و کار بودن دیده شدن می خواهد."],
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
}
