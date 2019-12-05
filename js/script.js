// 메뉴 애니메이션
var menu = {
  
    el: {
      $burger: $('.menu-icon'),
      $menuTop: $('.menu-top'),
      $menuMiddle: $('.menu-middle'),
      $menuBottom: $('.menu-bottom')
    },
    
    init: function() {
      menu.bindUIactions();
    },
    
    bindUIactions: function() {
      menu.el.$burger
          .on(
            'click',
          function(e) {
          menu.activateMenu(e);
          event.preventDefault();
        }
      );
    },
    
    activateMenu: function() {
      menu.el.$menuTop.toggleClass('menu-top-click');
      menu.el.$menuMiddle.toggleClass('menu-middle-click');
      menu.el.$menuBottom.toggleClass('menu-bottom-click'); 
    }
};
  
menu.init();




// 메뉴 클릭 애니메이션
var menuClickAni = {
    el: {
        $burgerMenu: $('.menu .burger-menu'),
        $menuIcon: $('.menu-icon'),
        $menuList: $('.menu-list')
    },

    init: function() {
        menuClickAni.menuIconClick();
    },

    menuIconClick: function() {
        menuClickAni.el.$burgerMenu.on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass('active');

            menuClickAni.el.$menuIcon.toggleClass('open');

            if ($(this).hasClass('active')) {
                TweenMax.fromTo(menuClickAni.el.$menuList, 0.65, {x: 3 + 'vw'}, {x: 0, autoAlpha: 1, ease: Expo.easeInOut})
            } else {
                TweenMax.to(menuClickAni.el.$menuList, 0.65, {x: 3 + 'vw', autoAlpha: 0, ease: Expo.easeInOut})
            }
        });
    }
};

menuClickAni.init();