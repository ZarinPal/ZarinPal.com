(function() {

    let mobileMenu = document.getElementById("mobileMenu");
    let mobileMenuBlur = document.getElementById("mobileMenuBlur");

    //Open mobile menu
    let btnMobileMenu = document.getElementById("btnToggleMobileMenu");
    btnMobileMenu.addEventListener("click", function () {
        mobileMenu.classList.remove("fadeOutUp");
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("disp-block");
        mobileMenu.classList.add("fadeInDown");
        mobileMenuBlur.classList.add("disp-block");
        mobileMenuBlur.classList.add("fadeInDown");
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
        mobileMenu.classList.add("fadeOutUp");
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

})();