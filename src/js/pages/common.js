let mobileMenu = document.getElementById('mobileMenu');
let mobileMenuBlur = document.getElementById('mobileMenuBlur');

//Open mobile menu
let btnMobileMenu = document.getElementById('btnToggleMobileMenu');
btnMobileMenu.addEventListener('click', function() {
  mobileMenu.classList.remove('fadeOut');
  mobileMenu.classList.remove('hidden');
  mobileMenu.classList.add('disp-block');
  mobileMenu.classList.add('fadeInDown');
  mobileMenuBlur.classList.add('disp-block');
  mobileMenuBlur.classList.add('fadeIn');
});

//Close mobile menu
let btnCloseMobileMenu = document.getElementById('btnCloseMobileMenu');
btnCloseMobileMenu.addEventListener('click', function() {
  closeMobileMenu(mobileMenu);
});

mobileMenuBlur.addEventListener('click', function() {
  closeMobileMenu(mobileMenu);
});

//Go down
let btnGoDown = document.getElementById('btnGoDown');
if (btnGoDown) {
  btnGoDown.addEventListener('click', function() {
    scrollToContent();
  });
}

function closeMobileMenu(mobileMenu) {
  mobileMenu.classList.remove('fadeInDown');
  mobileMenu.classList.remove('disp-block');
  mobileMenuBlur.classList.remove('fadeInDown');
  mobileMenuBlur.classList.remove('disp-block');
  mobileMenu.classList.add('fadeOut');
}

/**
 * Scroll page down to content
 */
function scrollToContent() {
  let timerID = setInterval(function() {
    window.scrollBy(0, 30);

    let sliderHeight = document.getElementById('firstSection').offsetTop - 30;

    if (window.pageYOffset >= sliderHeight || (sliderHeight + window.scrollY) >=
        document.body.offsetHeight)
      clearInterval(timerID);
  }, 16);
}

/**
 * clickoutside
 */
function clickOutside(targetElementId, callBack) {
  function clickOutSideHandler(evt) {
    const flyoutElement = document.getElementById(targetElementId);
    let targetElement = evt.target; // clicked element

    do {
      if (targetElement === flyoutElement) {
        return;
      }
      targetElement = targetElement.parentNode;
    } while (targetElement);
    // This is a click outside.
    document.removeEventListener('click', clickOutSideHandler);
    callBack();
  }

  setTimeout(() => {
    document.addEventListener('click', clickOutSideHandler);
  }, 50);
}

function showMoreMenu() {
  document.getElementById('moreMenu').classList.add('show');
}
function hideMoreMenu() {
  document.getElementById('moreMenu').classList.remove('show');
  document.getElementById('btnShowMoreMenu').addEventListener('click', btnShowMoreMenuHandler);
}
function btnShowMoreMenuHandler() {
  showMoreMenu();
  clickOutside('moreMenu', hideMoreMenu);
  document.getElementById('btnShowMoreMenu').removeEventListener('click', btnShowMoreMenuHandler);
}

hideMoreMenu();