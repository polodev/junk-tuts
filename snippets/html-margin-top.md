## object for calculating
~~~js
  /*-------------------------------------
  ## margin-top for html
  -------------------------------------*/
  var koncreateHtmlMarginTop = {
    init: function () {
      this.calculateMeanMenuHeight();
      this.calculateWpAdminHeight()
      this.calculateBiggerValueForMarginTop()
      this.assignMarginValueToHtml();
    },
    calculateMeanMenuHeight: function () {
      var meanMenu = $('.mean-bar');
      var meanHeight = 0;
      if (meanMenu) {
        meanHeight = meanMenu.outerHeight();
      }
      this.meanMenuHeight = meanHeight ? meanHeight : 0;
    },
    calculateWpAdminHeight: function () {
      var wpadminbar = $('#wpadminbar');
      var wpadminbarHeight = 0;
      if (wpadminbar) {
        wpadminbarHeight = wpadminbar.outerHeight();
      }
      this.wpadminbarHeight = wpadminbarHeight ? wpadminbarHeight : 0; // in case of undefined or null handling
    },
    calculateBiggerValueForMarginTop: function () {
      this.maxMarginTop = Math.max(this.meanMenuHeight, this.wpadminbarHeight)
    },
    assignMarginValueToHtml: function () {
      console.log('assignMarginValueToHtml', this.maxMarginTop)
      var html = $('html');
      html.css({
          marginTop: this.maxMarginTop
      });
    }
  }

~~~



~~~js
/*-------------------------------------
## only invocation
-------------------------------------*/
koncreateHtmlMarginTop.init();
$(window).on('resize', function () {
  koncreateHtmlMarginTop.init()
});
~~~
