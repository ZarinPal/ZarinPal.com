let mobileMenu = document.getElementById("mobileMenu");
let mobileMenuBlur = document.getElementById("mobileMenuBlur");

//Open mobile menu
let btnMobileMenu = document.getElementById("btnToggleMobileMenu");
btnMobileMenu.addEventListener("click", function () {
    mobileMenu.classList.remove("fadeOut");
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("disp-block");
    mobileMenu.classList.add("fadeInDown");
    mobileMenuBlur.classList.add("disp-block");
    mobileMenuBlur.classList.add("fadeIn");
});

//Close mobile menu
let btnCloseMobileMenu = document.getElementById("btnCloseMobileMenu");
btnCloseMobileMenu.addEventListener("click", function () {
    closeMobileMenu(mobileMenu);
});

mobileMenuBlur.addEventListener("click", function () {
    closeMobileMenu(mobileMenu);
});


//Go down
let btnGoDown = document.getElementById("btnGoDown");
if (btnGoDown) {
    btnGoDown.addEventListener("click", function () {
        scrollToContent();
    });
}

function closeMobileMenu(mobileMenu) {
    mobileMenu.classList.remove("fadeInDown");
    mobileMenu.classList.remove("disp-block");
    mobileMenuBlur.classList.remove("fadeInDown");
    mobileMenuBlur.classList.remove("disp-block");
    mobileMenu.classList.add("fadeOut");
}

/**
 * Scroll page down to content
 */
function scrollToContent() {
    let timerID = setInterval(function () {
        window.scrollBy(0, 30);

        let sliderHeight = document.getElementById('sectionPg').offsetTop - 30;

        if (window.pageYOffset >= sliderHeight || (sliderHeight + window.scrollY) >= document.body.offsetHeight)
            clearInterval(timerID);
    }, 16);
}