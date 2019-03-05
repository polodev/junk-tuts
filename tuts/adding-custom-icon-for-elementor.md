# write following code in functions.php file
## merging with existing font
~~~php
add_action( 'elementor/controls/controls_registered', array( $this, 'custom_icon_for_elementor' ), 10, 1 );
public function custom_icon_for_elementor( $controls_registry ) {
  // Get existing icons
  $icons = $controls_registry->get_control( 'icon' )->get_settings( 'options' );
  // Append new icons
  $new_icons = array_merge(
    array(
      "fas fa-acorn" => "fas fa-acorn",
      "fab fa-accusoft" => "fab fa-accusoft",
      "fas fa-ad" => "fas fa-ad",
      "fas fa-air-freshener" => "fas fa-air-freshener",
      "fab fa-amazon-pay" => "fab fa-amazon-pay",
      "fab fa-angular" => "fab fa-angular",
      "fab fa-angrycreative" => "fab fa-angrycreative",
    ),
    $icons
  );
  // Then we set a new list of icons as the options of the icon control
  $controls_registry->get_control( 'icon' )->set_settings( 'options', $new_icons );
}
~~~

## enqueue css for editor

~~~php
    add_action( 'elementor/editor/after_enqueue_styles', array( $this, 'after_enqueue_styles_elementor_editor' ), 10, 1 );
  public function after_enqueue_styles_elementor_editor()
  {
    wp_dequeue_script('font-awesome');
    wp_enqueue_style('font-awesome-5', Helper::get_css( 'all' ), array(), $this->version);
    wp_enqueue_style( 'flaticon_service', Helper::get_file( 'vendor/flaticon_service/flaticon_service.css' ), array(), $this->version );
    wp_enqueue_style( 'main-admin-style', Helper::get_css( 'style.admin' ), array(), $this->version );
  }
~~~

