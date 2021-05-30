import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

/** Function for changing current loaded Map */
import { newCurrentMap } from '../mapbox/map_list.js';

var get = function (selector, scope) {
    scope = scope ? scope : document;
    return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
    scope = scope ? scope : document;
    return scope.querySelectorAll(selector);
};

//in page scrolling for documentation page
var btns = getAll('.js-btn');
var sections = getAll('.js-section');

function smoothScrollTo(i, event) {
  var element = sections[i];
  setActiveLink(event);

  window.scrollTo({
    'behavior': 'smooth',
    'top': element.offsetTop - 20,
    'left': 0
  });
}

if (btns.length && sections.length > 0) {
    for (var i = 0; i<btns.length; i++) {
      btns[i].addEventListener('click', smoothScrollTo.bind(this,i));
    }
}

function setActiveLink(event) {

  // remove all active tab classes
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('selected');
  }

  // Load new Current Map
  let arg = event.target.innerHTML.replace(/\s/g, '');
  newCurrentMap(arg);
  
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
  