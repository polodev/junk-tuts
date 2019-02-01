# How to add google using `functions.php` file
~~~php
public function fonts_url(){
  $fonts_url = '';
  if ( 'off' !== _x( 'on', 'Google fonts - Rubik and Roboto : on or off', 'koncreate' ) ) {
    $fonts_url = add_query_arg( 'family', urlencode( 'Rubik:300,400,500,700|Roboto:300,400,500,700&subset=latin,latin-ext' ), "//fonts.googleapis.com/css" );
  }
  return $fonts_url;
}


~~~

# enqueue that functions to load
~~~php
wp_enqueue_style( $this->prefix . '-gfonts',     $this->fonts_url(), array(), $this->version ); // Google fonts
~~~
