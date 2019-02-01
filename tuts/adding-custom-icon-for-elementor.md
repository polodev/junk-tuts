# write following code in functions.php file
## merging with existing font
~~~php
add_action( 'elementor/controls/controls_registered', 'custom_icon_for_elementor', 10, 1 );
function custom_icon_for_elementor( $controls_registry ) {
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
~~~

## enqueue css for editor

~~~php
add_action( 'elementor/frontend/before_enqueue_styles', 'script_function', 10, 1 );
function script_function()
{
  wp_enqueue_style( 'font-awesome-5', Helper::get_css( 'font-awesome-5.min' ), array('font-awesome-5'), $this->version );
}
~~~

