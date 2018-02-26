/**
 * FAQ collapsing.
 *
 * @type {HTMLCollectionOf<Element>}
 */
let faqs = document.getElementsByClassName("faq-item");

let event = function () {
    let icon = this.querySelector("span.icon");
    if (this.classList.contains('show')) {
        icon.classList.add('icon-plus');
        icon.classList.remove('icon-close');
        this.classList.remove('show');
    } else {
        this.classList.add('show');
        icon.classList.remove('icon-plus');
        icon.classList.add('icon-close');
    }
};

Array.from(faqs).forEach(function (element) {
    element.addEventListener('click', event);
});