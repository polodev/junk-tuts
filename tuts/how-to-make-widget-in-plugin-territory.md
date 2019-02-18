# file
* widget init
* contact info (here just title and description)
* include  inside koncreate-core


# widget init
~~~php
<?php
/**
 * @author  RadiusTheme
 * @since   1.0
 * @version 1.0
 */
namespace radiustheme\Koncreate_Core;
class Koncreate_Widget_Init {
  public $widgets;
  protected static $instance = null;
  public $rt_dir;

  public function __construct() {

    $this->rt_dir      = dirname( ( new \ReflectionClass( $this ) )->getFileName() );

    // Widgets -- filename=>classname /@dev
    $this->widgets =  array(
      'about-company-widget'    => 'About_Company_Widget',
      'contact-info'    => 'Contact_Info',
    );
    add_action( 'widgets_init', array( $this, 'custom_widgets' ) );
  }
  public static function instance() {
    if ( null == self::$instance ) {
      self::$instance = new self;
    }
    return self::$instance;
  }
  public function custom_widgets() {
    if ( !class_exists( 'RT_Widget_Fields' ) ) return;
    foreach ( $this->widgets as $filename => $classname ) {
       $file  = $this->rt_dir . DIRECTORY_SEPARATOR . $filename . '.php';
       $class = __NAMESPACE__ . '\\' . $classname;
      require_once $file;
      register_widget( $class );
    }
  }
}
Koncreate_Widget_Init::instance();

~~~

# contact info
~~~php
<?php

/**
 * @author  RadiusTheme
 * @since   1.0
 * @version 1.0
 */
namespace radiustheme\Koncreate_Core;

use \RT_Widget_Fields;
use \WP_Widget;
use radiustheme\Koncreate\Helper;

class Contact_Info extends WP_Widget {
  public function __construct() {
    $id = Constants::$theme_prefix . '_contact_info';
    parent::__construct(
            $id, // Base ID
            __( 'Koncreate: Contact Info', 'koncreate-core' ), // Name
            array( 'description' => __( 'Koncreate: Contact Info', 'koncreate-core' )
              ) );
  }

  /**
   * for front end view
   */
  public function widget( $args, $instance ){
    echo wp_kses_post( $args['before_widget'] );

    if ( !empty( $instance['title'] ) ) {
      $html = apply_filters( 'widget_title', $instance['title'] );
      $html = $args['before_title'] . $html .$args['after_title'];
    }
    else {
      $html = '';
    }

    echo wp_kses_post( $html );
    ?>
    <div class="about-company">
      <p><?php if( !empty( $instance['description'] ) ) echo wp_kses_post( $instance['description'] ); ?></p>
    </div>


    <?php
    echo wp_kses_post( $args['after_widget'] );
  }

  public function update( $new_instance, $old_instance ){
    $instance                  = array();
    $instance['title']         = ( ! empty( $new_instance['title'] ) ) ? sanitize_text_field( $new_instance['title'] ) : '';
    $instance['description']   = ( ! empty( $new_instance['description'] ) ) ? wp_kses_post( $new_instance['description'] ) : '';
    return $instance;
  }
  public function form( $instance ){
    $defaults = array(
      'title'       => '',
      'description' => '',
    );
    $instance = wp_parse_args( (array) $instance, $defaults );

    $fields = array(
      'title'       => array(
        'label'   => __( 'Title', 'koncreate-core' ),
        'type'    => 'text',
      ),
      'description' => array(
        'label'   => __( 'Description', 'koncreate-core' ),
        'type'    => 'textarea',
      ),
    );

    RT_Widget_Fields::display( $fields, $instance, $this );
  }



}

~~~

# include  inside koncreate-core
~~~php
public function includes()
  {
    require $this->rt_dir . '/inc/constants.php';
    require $this->rt_dir . '/koncreate-widget/init.php';
  }
~~~



