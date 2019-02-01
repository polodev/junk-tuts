# make a class which will extends WP_Widget

~~~php
<?php

/**
 * @author  RadiusTheme
 * @since   1.0
 * @version 1.0
 */
namespace radiustheme\Koncreate;

use \WP_Widget;
use \RT_Widget_Fields;
class Newsletter_Widget extends WP_Widget {

  public function __construct() {
    $id = Constants::$widget_prefix . '_newsletter';
    parent::__construct(
            $id, // Base ID
            __( 'Koncreate: News Letter', 'koncreate' ), // Name
            array( 'description' => __( 'Koncreate: News Letter Widget', 'koncreate' )
              ) );
  }
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
    <div class="newsletter-signup">
      <p><?php if( !empty( $instance['description'] ) ) echo wp_kses_post( $instance['description'] ); ?></p>
      <?php $this->process_form(); $this->render_form(); ?>
    </div>


    <?php
    echo wp_kses_post( $args['after_widget'] );
  }

  public function process_form() {
    if('POST' == $_SERVER['REQUEST_METHOD'] && isset($_POST['koncreate_email_newsletter'])) {

      if( filter_var($_POST['koncreate_email_newsletter'], FILTER_VALIDATE_EMAIL) ){
         echo 'Your email is (' . $_POST['koncreate_email_newsletter'] . ')';

      }else {
       echo 'There was a problem with your e-mail (' . $_POST['koncreate_email_newsletter'] . ')';
      }

    }
  }
  public function render_form () {

    ?>
      <form action="" method="POST">
        <div class="input-group stylish-input-group">
            <input type="text" class="form-control" name="koncreate_email_newsletter" placeholder="Enter your e-mail">
            <span class="input-group-addon">
                <button type="submit">
                    <span class="fas fa-angle-right" aria-hidden="true"></span>
                </button>
            </span>
        </div>
      </form>

    <?php
  }
  public function form( $instance ){
    $defaults = array(
      'title'       => '',
      'description' => '',
    );
    $instance = wp_parse_args( (array) $instance, $defaults );

    $fields = array(
      'title'       => array(
        'label'   => __( 'Title', 'builder' ),
        'type'    => 'text',
      ),
      'description' => array(
        'label'   => __( 'Description', 'builder' ),
        'type'    => 'textarea',
      )
    );

    RT_Widget_Fields::display( $fields, $instance, $this );
  }

}

~~~

## adding action hook for custom widget
~~~php

  public function __construct() {
    add_action( 'widgets_init',        array( $this, 'custom_widgets' ) );
  }
  public function custom_widgets() {
    if ( !class_exists( 'RT_Widget_Fields' ) ) return;
    $namespace = Constants::$theme_namespace;
    register_widget($namespace. 'About_Company_Widget' );
    register_widget($namespace. 'Newsletter_Widget' );
  }
~~~

