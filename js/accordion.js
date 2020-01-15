(function() {
window.addEventListener('load', function() {
  accordion.setup();
});

window.addEventListener('resize', function() {
  for (var i in accordion.items) {
    accordion.items[i].el.children[1].children[0].style.height = 'auto';
    accordion.items[i].el.children[1].children[1].style.height = 'auto';
  }
  
  accordion.setup();
  
  var correction = window.innerWidth <= 768? 4: 20;
  for (var i in accordion.items) {
    accordion.items[i].height += correction;
  }
});

var accordion = {
  items: {},
  idx  : null,
  
  setup: function() {
    var items = document.querySelectorAll('.faq-item');
    var node = Array.prototype.slice.call(items, 0);
    node.forEach(function(e, i) {
      e.children[0].addEventListener('click', accordion.handle);
      e.setAttribute('data-idx', i);
      if (accordion.items[i] == undefined) accordion.items[i] = {};
      accordion.items[i].is_opened = false;
      accordion.items[i].el        = e;
      accordion.items[i].el.children[1].style.display = 'block';
      accordion.items[i].height    = e.children[1].children[1].clientHeight;
      accordion.init(i);
    });
  },
  
  init: function(idx) {
    var p = accordion.items[idx].el.children[1];
    var c = p.children;
    c[0].style.height              = 0;
    c[0].children[0].style.opacity = 0;
    c[1].style.height              = 0;
    c[1].style.opacity             = 0;
    c[1].style.padding             = 0;
    
    setTimeout(function() {
      c[0].style.transition             = 'all 0.4s';
      c[0].children[0].style.transition = 'all 0.4s';
      c[1].style.transition             = 'all 0.4s';
    }, 128);
    
    var correction = window.innerWidth <= 768? 4: 0;
    for (var i in accordion.items) {
      accordion.items[i].height += correction;
    }
  },
  
  handle: function() {
    accordion.idx = this.parentNode.getAttribute('data-idx');
    
    if (accordion.items[accordion.idx].is_opened) {
      accordion.close();
    } else {
      accordion.open();
    }
  },
  
  open: function() {
    var p = accordion.items[accordion.idx].el.children[1];
    var c = p.children;
    c[0].style.height              = '40px';
    c[0].children[0].style.opacity = 1;
    c[1].style.height              = accordion.items[accordion.idx].height + 'px';
    c[1].style.opacity             = 1;
    c[1].style.padding             = '10px 10px 10px 0';
    
    accordion.items[accordion.idx].is_opened= true;
  },
  
  close: function() {
    var p = accordion.items[accordion.idx].el.children[1];
    var c = p.children;
    c[0].style.height              = 0;
    c[0].children[0].style.opacity = 0;
    c[1].style.height              = 0;
    c[1].style.opacity             = 0;
    c[1].style.padding             = 0;
    
    accordion.items[accordion.idx].is_opened = false;
  },
  
  handleOrientationChange: function() {
    setTimeout(function() {
      for (var i in accordion.items) {
        accordion.items[i].el.children[1].children[0].style.height = 'auto';
        accordion.items[i].el.children[1].children[1].style.height = 'auto';
      }
      
      accordion.setup();
      
      var correction = window.innerWidth <= 768? 4: 20;
      for (var i in accordion.items) {
        accordion.items[i].height += correction;
      }
    }, 100);
  }
}
})();