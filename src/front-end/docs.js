import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

var get = function (selector, scope) {
    scope = scope ? scope : document;
    return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
    scope = scope ? scope : document;
    return scope.querySelectorAll(selector);
};

//in page scrolling for documentaiton page
var btns = getAll('.js-btn');
var sections = getAll('.js-section');

function smoothScrollTo(element, event) {
    setActiveLink(event);
  
    window.scrollTo({
      'behavior': 'smooth',
      'top': element.offsetTop - 20,
      'left': 0
    });
}

if (btns.length && sections.length > 0) {
    for (var i = 0; i<btns.length; i++) {
        btns[i].addEventListener('click', function(event) {
            smoothScrollTo(sections[i], event);
        });
    }
}

function setActiveLink(event) {
  // remove all active tab classes
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('selected');
  }

  event.target.classList.add('selected');
}

/* Higlight JS: for javascript */
hljs.registerLanguage('javascript', javascript);
hljs.highlightAll();

// fix menu to page-top once user starts scrolling
window.addEventListener('scroll', function () {
    var docNav = get('.doc__nav > ul');
  
    if( docNav) {
      if (window.pageYOffset > 63) {
        docNav.classList.add('fixed');
      } else {
        docNav.classList.remove('fixed');
      }
    }
  });
  
  // responsive navigation
  var topNav = get('.menu');
  var icon = get('.toggle');
  
  window.addEventListener('load', function(){
    function showNav() {
      if (topNav.className === 'menu') {
        topNav.className += ' responsive';
        icon.className += ' open';
      } else {
        topNav.className = 'menu';
        icon.classList.remove('open');
      }
    }
    icon.addEventListener('click', showNav);
  });
  