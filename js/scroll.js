(function() {
window.addEventListener('load', function() {
  // scroll.setup();
});

var scroll = {
  tos: {
    0: 'top',
    1: 'usage',
    2: 'faq',
    3: 'register',
    4: 'contact'
  },
  btns: {},
  targets: {},
  from: 0,
  to: 0,
  reverse: 1,
  target: {'current': null, 'last': null},
  speed: 20,
  dest: 0,
  x: 0,
  timer: null,
  
  setup: function() {
    setTimeout(function() {
      // scrollTo(0, 0); // 開発中は無効にしておく。
      for (var i in scroll.tos) {
        var to = scroll.tos[i];
        scroll.btns[to] = document.getElementById('to_' + to);
        scroll.btns[to].addEventListener('click', scroll.run);
        scroll.targets[to] = {};
        scroll.targets[to].el = document.getElementById(to);
        scroll.targets[to].top = scroll.targets[to].el.getBoundingClientRect().top;
      }
    }, 10);
  },
  
  run: function(e) {
    scroll.target.last = scroll.target.current;
    scroll.target.current = e.target.id.split('_')[1];
    
    if (scroll.target.current == scroll.target.last) {
      return;
    }
    
    if (scroll.target.current == 'usage') {
      return;
    }
    
    scroll.to = scroll.targets[scroll.target.current].top;
    
    if (scroll.target.current != 'top') scroll.to -= 80;
    scroll.from = window.pageYOffset;
    
    scroll.reverse = scroll.to > scroll.from? 1: -1;
    
    scroll.dest = (scroll.to - scroll.from) * scroll.reverse;
    
    // if (scroll.target.current == scroll.target.last) {
    //   return;
    // }
    
    // if (scroll.to > scroll.from) {
    //   scroll.scrollToBottom();
    // } else {
    //   scroll.scrollToTop();
    // }
    scroll.x = 0;
    scroll.animate();
  },
  
  animate: function() {
    scroll.timer = setInterval(function() {
      
      var candidate = scroll.from + 24 * scroll.reverse;
      
      // var diff = scroll.getDiff(scroll.x);
      // var delta_x = scroll.dest / 100;
      // scroll.x += delta_x;
      // var candidate = scroll.from + diff * scroll.reverse;
      
      // scroll.from += 30 * scroll.reverse; // TODO: ここの増分を調整することにより、滑らかさを出す。
      // if (scroll.from * scroll.reverse > scroll.to * scroll.reverse) {
        
        
        // console.log(candidate * scroll.reverse);
        // console.log(scroll.to * scroll.reverse);
        // console.log('');
        
      if (candidate * scroll.reverse >= (scroll.to - 1) * scroll.reverse) {

        clearInterval(scroll.timer);
        return;
      }
      
      scroll.from = candidate;
      scrollTo(0, scroll.from);
    }, 10);
  },
  
  getDiff: function(x) {
    var y;
    if (x < ~~scroll.dest >> 1) {
      y = (4 * scroll.speed / scroll.dest) * x;
    } else {
      y = 4 * scroll.speed * (1 - x / scroll.dest);
    }
    
    if (y < 0) {
      console.log('clear');
      clearInterval(scroll.timer);
    }
    console.log(y);
    return y;
  },
  
  
  // scrollToTop() {
  //   var t = setInterval(function() {
  //     // var candidate = scroll.from - 30;
  //     // if (candidate >= scroll.to) {
  //     if (scroll.from < scroll.to) {
  //       clearInterval(t);
  //       return;
  //     }
      
  //     // scroll.from = candidate;
  //     scroll.from -= 30;
  //     scrollTo(0, scroll.from);
  //   }, 10);
  // },
  
  // scrollToBottom() {
  //   var t = setInterval(function() {
      
  //     console.log('scrollToBottom');
      
  //     console.log(scroll.from);
  //     console.log(scroll.to);
  //     console.log('');
      
  //     // var candidate = scroll.from + 30;
  //     // if (candidate < scroll.to) {
  //     if (scroll.from > scroll.to) {
  //       clearInterval(t);
  //       return;
  //     }
      
  //     // scroll.from = candidate;
  //     scroll.from += 30;
  //     scrollTo(0, scroll.from);
  //   }, 10);
  // }
  
}
})();