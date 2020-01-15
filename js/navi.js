(function() {
var CONFIG = {
  'USE_USAGE_UNDERLAYER': false
}

window.addEventListener('load', function() {
  navi.setup();
  navisp.setup();
  setupAccordion();
});

window.addEventListener("orientationchange", function() {
  handleOrientationChange();
});

// accordion
// --------------------------------------------------------------------------------
var CHILD_HEIGHT = 32;
var ARROW_IMAGE_URL = 'https://www.jdsound.co.jp/products/ovo/img/accordion_arrow.png';

var setupAccordion = function() {
  var node = Array.prototype.slice.call(document.querySelectorAll('.menu-accordion'), 0);
  node.forEach(function(e) {new menu_accordion_item(e);});
}
  
var menu_accordion_item = function(el) {
  this.el = {
    'main'    : el,
    'parent'  : Array.prototype.slice.call(el.querySelectorAll('.parent'), 0)[0],
    'children': Array.prototype.slice.call(el.querySelectorAll('.children'), 0)[0],
    'arrow'   : null
  };
  
  if (typeof this.el.children != 'undefined' && this.el.children.children.length >= 1) {
    this.is_opened = false;
    this.el.main.addEventListener('click', this.handleClick.bind(this));
    this.el.arrow = document.createElement('div');
    this.el.arrow.classList.add('accordion-arrow');
    var img = document.createElement('img');
    img.setAttribute('src', ARROW_IMAGE_URL);
    img.setAttribute('width', '12');
    this.el.arrow.appendChild(img);
    this.el.main.appendChild(this.el.arrow);
    this.children_opened_height = CHILD_HEIGHT * this.el.children.children.length;
    Array.prototype.slice.call(el.querySelectorAll('.child'), 0).forEach(function(e) {
      e.addEventListener('click', navisp.close);
    });
  } else {
    this.el.main.addEventListener('click', navisp.close);
  }
}

menu_accordion_item.prototype.handleClick = function() {
  (this.is_opened? this.close: this.open).bind(this)();
}

menu_accordion_item.prototype.open = function() {
  this.is_opened = true;
  this.el.children.style.height = this.children_opened_height + 'px';
  this.el.main.classList.add('opened');
  this.el.arrow.classList.add('upside-down');
}

menu_accordion_item.prototype.close = function() {
  this.is_opened = false;
  this.el.children.style.height = 0;
  this.el.main.classList.remove('opened');
  this.el.arrow.classList.remove('upside-down');
}
// --------------------------------------------------------------------------------




var max_width_tab = 960;
var max_width_sp = 768;

var navi = {
  main: null,
  to_usage: null,
  to_usage_subordinate: null,
  is_opened: false,
  is_transient: false,
  transient_time: 400,
  
  setup: function() {
    navi.main = document.getElementById('navi_main');
    navi.btn = document.getElementById('btn_navi');
    navi.icon = document.getElementById('navi_icon');
  },
  
  handle: function() {
    if (navi.is_transient) {
      return;
    }
    
    navi.is_transient = true;
    setTimeout(function() {
      navi.is_transient = false;
    }, navi.transient_time);
    
    if (navi.is_opened) {
      navi.close();
    } else {
      navi.open();
    }
  },
  
  open: function() {
    var navi_width = window.innerWidth < max_width_tab? '100%': '320px';
    navi.main.style.width = navi_width;
    
    if (window.innerWidth < max_width_tab) {
      navi.icon.style.opacity = 1;
    }
    navi.icon.style.transform = 'rotate(90deg)';
    //se(navi.to_usage_subordinate, navi.transient_time);
    navi.is_opened = true;
  },
  
  close: function() {
    var navi_width = window.innerWidth < max_width_tab? '100%': '160px';
    navi.main.style.width = navi_width;
    if (window.innerWidth < max_width_tab) {
      
    } else {
      //navi.to_usage.style.width = '155px';
    }
    try {
      //navi.to_usage_wrapper.style.height = '40px';
      if (window.innerWidth < max_width_tab) {
        navi.icon.style.opacity = 0;
      }
      navi.icon.style.transform = 'rotate(0)';
      //he(navi.to_usage_subordinate, navi.transient_time);
    } catch (e) {
      
    }
    navi.is_opened = false;
  },
  
  showIcon: function() {
    try {
      navi.icon.style.opacity = 1;
    } catch (e) {
      
    }
  },
  
  hideIcon: function() {
    if (navi.is_opened) return;
    navi.icon.style.opacity = 0;
  },
}


var navisp = {
  btn: {'wrapper': null, 'enter': null, 'exit': null},
  logo: null,
  is_opened: false,
  is_transient: false,
  transient_time: 400,
  tos: null,
  has_opened: false,
  
  setup: function() {
    navisp.btn.wrapper = document.getElementById('btn_navi');
    navisp.btn.wrapper.addEventListener('click', navisp.handle);
    
    navisp.btn.enter = document.getElementById('btn_navi_enter');
    navisp.btn.exit = document.getElementById('btn_navi_exit');
    
    navi.logo = document.getElementById('logo');
    
    navisp.addClose();
    if (window.innerWidth < max_width_tab) {
      he(navi.main, 400);
      he(navi.main.parentNode, 400);
      navi.main.style.left = '-160px';
      navi.main.parentNode.style.left = '-160px';
      navisp.close();
    }
  },

  handle: function() {
    if (navisp.is_transient) {
      return;
    }
    
    navisp.is_transient = true;
    setTimeout(function() {
      navisp.is_transient = false;
    }, navisp.transient_time);
    
    if (navisp.is_opened) {
      navisp.close();
    } else {
      navisp.open();
    }
  },
  
  open: function() {
    navisp.is_opened = true;
    se(navi.main, 400);
    se(navi.main.parentNode, 400);
    time_correction = navisp.has_opened? 0: 100;
    setTimeout(function() {
      navi.main.parentNode.style.left = 0;
      navi.main.parentNode.style.zIndex = 16;
    }, time_correction);
    navi.logo.style.backgroundColor = '#ffffff';
    if (window.innerWidth < max_width_tab) {
      document.body.style.overflow = 'hidden';
    }
    
    se(navisp.btn.exit, 400);
    he(navisp.btn.enter, 400);
    
    navisp.has_opened = true;
  },
  
  close: function() {
    if (window.innerWidth > max_width_tab) return;
    
    setTimeout(function() {
      navi.close();
      navisp.is_opened = false;
      he(navi.main, 400);
      navi.main.parentNode.style.left = '-160px';
      navi.main.parentNode.style.zIndex = 0;
      navi.logo.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      document.body.style.overflow = 'visible';
    }, 160);
    
    se(navisp.btn.enter, 400);
    he(navisp.btn.exit, 400);
  },
  
  addClose: function() {
    if (window.innerWidth < max_width_tab) {
      navisp.tos = document.querySelectorAll('.to');
      navisp.tos = Array.prototype.slice.call(navisp.tos, 0);
      navisp.tos.forEach(function(e) {
        e.addEventListener('click', navisp.close);
      });
    }
  }
}

function handleOrientationChange() {
  setTimeout(function() {
    if (window.innerWidth <= max_width_tab) {
      
      navisp.addClose();
      navi.main.style.width = '100%';
      
      if (navisp.is_opened) {
        
      } else {
        navi.main.style.display = 'none';
        navi.main.style.opacity = 0;
        navi.main.parentNode.style.left = '-160px';
      }
      
      
    } else {
      if (navisp.is_opened) {
        
      } else {
        se(navi.main, 200);
        navi.main.parentNode.style.left = 0;
      }
    }
  }, 100);
}


function se(e, t) {
  e.style.display = 'block';
  e.style.transition = 'all ' + (t / 1000) + 's';
  setTimeout(function() {e.style.opacity = 1}, 100);
}

function he(e, t) {
  e.style.opacity = 0;
  setTimeout(function() {e.style.display = 'none'}, t);
}

})();