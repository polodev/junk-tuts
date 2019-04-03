~~~js
  /*-------------------------------------
  ## Koncreate Sticky Menu
  -------------------------------------*/
  var koncreateStickyMenu = {
    init: function () {
      this.domCached();
      this.initialValue();
      this.bindEvents();
    },
    domCached: function () {
      this.headerMenu = $('header.main-header');
      this.header1    = $('#header_1');
      this.body       = $('body');
    },
    initialValue: function () {
      this.menuHeight = 145; // initial
      this.menuHeightWithOffset = this.initialMenuHeight;
      if (this.headerMenu) {
        this.menuHeight = this.headerMenu.height()
        this.menuHeightWithOffset = this.menuHeight + this.headerMenu.offset().top;
      }
    },
    bindEvents: function () {
      $(window).on('scroll', this.scrollEvent.bind(this))
    },
    scrollEvent: function () {
      if ($(window).scrollTop() > this.menuHeightWithOffset) {
        this.appliedStickyMenu();
      }else {
        this.removeStickyMenu();
      }
      this.bodyPaddingForSmoothness();
    },
    appliedStickyMenu: function () {
      this.header1.addClass('menu-sticky');
      this.body.addClass('sticky-applied');
    },
    removeStickyMenu: function () {
      this.header1.removeClass('menu-sticky');
      this.body.removeClass('sticky-applied');
    },
    bodyPaddingForSmoothness: function () {
      var mainNavigationAreaHeight = $('.main-navigation-area').height();
      var body = $('body');
      if (body.hasClass('sticky-applied')) {
        body.css({
          paddingTop: mainNavigationAreaHeight,
        })
      }else {
        body.css({
          paddingTop: 0,
        })
      }
    }
  }
~~~
# used in

~~~js
if ($('body').hasClass('has-sticky-menu')) {
  koncreateStickyMenu.init();
}
~~~
