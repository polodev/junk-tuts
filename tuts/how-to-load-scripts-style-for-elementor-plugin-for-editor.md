# load in constructor
~~~php
$this->elementor_scripts();
~~~

# make function
have to use `use Elementor\Plugin;`


public function elementor_scripts() {
  if ( !did_action( 'elementor/loaded' ) ) {
    return;
  }
  if ( Plugin::$instance->preview->is_preview_mode() ) {
    wp_enqueue_style(  'owl-carousel' );
    wp_enqueue_style(  'owl-theme-default' );
    wp_enqueue_script(  'owl-carousel-js' );
    wp_enqueue_script(  'imagesloaded-js' );
    wp_enqueue_script(  'isotope-js' );
    wp_enqueue_script(  'waypoints-js' );
    wp_enqueue_script(  'counterup-js' );
  }
}
