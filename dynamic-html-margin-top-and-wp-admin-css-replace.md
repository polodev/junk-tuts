~~~js
  /*-------------------------------------
  ## margin-top for html
  -------------------------------------*/
  function htmlMarginTop () {

    // regarding mean menu
    var meanMenu = $('.mean-bar');
    var meanHeight = 0;
    if (meanMenu) {
      meanHeight = meanMenu.outerHeight();
    }
    meanHeight = meanHeight ? meanHeight : 0; // in case of undefined or null handling

    // regarding wpadminbar
    var wpadminbar = $('#wpadminbar');
    var wpadminbarHeight = 0;
    if (wpadminbar) {
      wpadminbarHeight = wpadminbar.outerHeight();
    }
    wpadminbarHeight = wpadminbarHeight ? wpadminbarHeight : 0; // in case of undefined or null handling

    // get the bigger one
    var mt = meanHeight > wpadminbarHeight ? meanHeight : wpadminbarHeight ;

    // assign to html
    var html = $('html');
    html.css({
        marginTop: mt
    });
  }
~~~

## onready invocation

~~~js
htmlMarginTop();
$(window).on('resize', htmlMarginTop);
~~~

## wp hooks

[ref](https://davidwalsh.name/remove-wordpress-admin-bar-css)

~~~php
  public function remove_admin_login_header() {
    remove_action('wp_head', '_admin_bar_bump_cb');
  }
~~~

~~~php
    add_action('get_header',                array( $this, 'remove_admin_login_header' ) );

~~~

