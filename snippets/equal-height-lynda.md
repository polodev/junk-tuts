~~~php
  $.fn.equalizeHeights = function(options) {
    var defaultOptions = {
      selector: this
    }
    var settings = $.extend(defaultOptions, options);

    var maxHeight = this.map(function( i, e ) {
      return $( e ).height();
    }).get();
    var $selector = $(settings.selector);
    console.log('maxHeight', maxHeight)
    if ($selector) {
      $selector.height( Math.max.apply( this, maxHeight ) );
    }
    return this;
  };
~~~
