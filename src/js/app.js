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
        console.log('closeed');
        mobileMenu.classList.remove("fadeInDown");
        mobileMenu.classList.remove("disp-block");
        mobileMenuBlur.classList.remove("fadeInDown");
        mobileMenuBlur.classList.remove("disp-block");
        mobileMenu.classList.add("fadeOutUp");
    });



})();