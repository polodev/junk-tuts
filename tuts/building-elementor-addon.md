create a `elementor` folder inside `theme_name-core` plugin

create 2 file
* init.php
* base.php

create a folder for a addon & and keep following 2 file there
* class.php
* view.php


adding elementor init file inside core plugin file

~~~php
add_action( 'after_setup_theme', array( $this, 'elementor_widgets' ) );
public function elementor_widgets(){
  if ( did_action( $this->action ) && did_action( 'elementor/loaded' ) ) {
    require_once 'elementor/init.php';
  }
}
~~~

# custom wrapper for elementor widget
`base.php`
~~~php
/**
 * @author  RadiusTheme
 * @since   1.0
 * @version 1.0
 */

namespace radiustheme\Koncreate_Core;

use \ReflectionClass;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

abstract class Custom_Widget_Base extends Widget_Base {
  public $rt_name;
  public $rt_base;
  public $rt_category;
  public $rt_icon;
  public $rt_translate;
  public $rt_dir;

  public function __construct( $data = [], $args = null ) {
    $this->rt_category = KONCREATE_CORE_THEME_PREFIX . '-widgets'; // Category /@dev
    $this->rt_icon     = 'fa fa-registered';
    $this->rt_dir      = dirname( ( new ReflectionClass( $this ) )->getFileName() );
    parent::__construct( $data, $args );
  }

  abstract public function rt_fields();

  public function get_name() {
    return $this->rt_base;
  }

  public function get_title() {
    return $this->rt_name;
  }

  public function get_icon() {
    return $this->rt_icon;
  }

  public function get_categories() {
    return array( $this->rt_category );
  }

  protected function _register_controls() {
    $fields = $this->rt_fields();
    foreach ( $fields as $field ) {
      if ( isset( $field['mode'] ) && $field['mode'] == 'section_start' ) {
        $id = $field['id'];
        unset( $field['id'] );
        unset( $field['mode'] );
        $this->start_controls_section( $id, $field );
      }
      elseif ( isset( $field['mode'] ) && $field['mode'] == 'section_end' ) {
        $this->end_controls_section();
      }
      elseif ( isset( $field['mode'] ) && $field['mode'] == 'group' ) {
        $type = $field['type'];
        unset( $field['mode'] );
        unset( $field['type'] );
        $this->add_group_control( $type, $field );
      }
      elseif ( isset( $field['mode'] ) && $field['mode'] == 'responsive' ) {
        $id = $field['id'];
        unset( $field['id'] );
        unset( $field['mode'] );
        $this->add_responsive_control( $id, $field );
      }
      else {
        $id = $field['id'];
        unset( $field['id'] );
        $this->add_control( $id, $field );
      }
    }
  }

  public function rt_template( $template, $data ) {
    $template_name = DIRECTORY_SEPARATOR . 'elementor-custom' . DIRECTORY_SEPARATOR . basename( $this->rt_dir ) . DIRECTORY_SEPARATOR . $template . '.php';
    if ( file_exists( STYLESHEETPATH . $template_name ) ) {
      $file = STYLESHEETPATH . $template_name;
    }
    elseif ( file_exists( TEMPLATEPATH . $template_name ) ) {
      $file = TEMPLATEPATH . $template_name;
    }
    else {
      $file = $this->rt_dir . DIRECTORY_SEPARATOR . $template . '.php';
    }

    ob_start();
    include $file;
    echo ob_get_clean();
  }
}

~~~
`init.php`
~~~php
<?php
/**
 * @author  RadiusTheme
 * @since   1.0
 * @version 1.0
 */

namespace radiustheme\Koncreate_Core;

use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Custom_Widget_Init {

  public function __construct() {
    add_action( 'elementor/widgets/widgets_registered',     array( $this, 'init' ) );
    add_action( 'elementor/elements/categories_registered', array( $this, 'widget_categoty' ) );
  }

  public function init() {
    require_once __DIR__ . '/base.php';

    // Widgets -- dirname=>classname /@dev
    $widgets1 = array(
      'experience-action'      => 'Experience_Action',
      'homepage-title-content-button'   => 'Homepage_Title_Content_Button',
      'service-widget-box'     => 'Service_Widget_Box',
      'progress-counter'       => 'Progress_Counter',
      'call-to-action'         => 'Call_To_Action',
      'project-gallery'        => 'Project_Gallery',
      'section-title'        => 'Section_Title',
      'koncreate-accordion'        => 'Koncreate_Accordion',
    );


    $widgets = array_merge( $widgets1);

    foreach ( $widgets as $dirname => $class ) {

      /**
       * following "if else" for cheeking user defined custom style
       * @var [type]
       */
      $template_name = DIRECTORY_SEPARATOR . 'elementor-custom' . DIRECTORY_SEPARATOR . $dirname . DIRECTORY_SEPARATOR . 'class.php';
      if ( file_exists( STYLESHEETPATH . $template_name ) ) {
        $file = STYLESHEETPATH . $template_name;
      }
      elseif ( file_exists( TEMPLATEPATH . $template_name ) ) {
        $file = TEMPLATEPATH . $template_name;
      }
      else {
        $file = __DIR__ . DIRECTORY_SEPARATOR . $dirname . DIRECTORY_SEPARATOR . 'class.php';
      }

      require_once $file;

      $classname = __NAMESPACE__ . '\\' . $class;
      Plugin::instance()->widgets_manager->register_widget_type( new $classname );
    }
  }

  public function widget_categoty( $class ) {
    $id         = KONCREATE_CORE_THEME_PREFIX . '-widgets'; // Category /@dev
    $properties = array(
      'title' => __( 'RadiusTheme Elements', 'koncreate-core' ),
    );

    Plugin::$instance->elements_manager->add_category( $id, $properties );
  }
}

new Custom_Widget_Init();

~~~



# field of elementor I have used


## media
~~~php
  array(
    'type'        => Controls_Manager::MEDIA,
    'id'          => 'bg_image',
    'label'       => __( 'Background Image', 'koncreate-core' ),
    'default'     => array(
      'url' => URI_Helper::get_img('banner/banner3.jpg'),
    ),
  ),

~~~

## url
~~~php

      array(
        'type'        => Controls_Manager::URL,
        'id'          => 'button_url',
        'label'       => __( 'Button Url', 'koncreate-core' ),
        'default'     => array( 'url' => 'https://www.radiustheme.com/'),
      ),
~~~

## text
~~~php

      array(
        'type'        => Controls_Manager::TEXT,
        'id'          => 'button_text',
        'label'       => __( 'Button Text', 'koncreate-core' ),
        'default'     => 'Read More',
      ),
~~~

## section
~~~php

      array(
        'mode'    => 'section_start',
        'id'      => 'sec_general',
        'label'   => __( 'General', 'koncreate-core' ),
      ),
~~~
## mode
~~~php

      array(
        'mode' => 'section_end',
      ),
~~~

# number

~~~php
array(
  'type'        => Controls_Manager::NUMBER,
  'id'          => 'post_per_page',
  'label'       => __( 'Post Per Page', 'koncreate-core' ),
  'default'     => 3,
  'condition'   => array( 'style' => array( 'style4', 'style5', 'style6') ),
),
~~~
# condition

~~~php
array(
  'type'        => Controls_Manager::NUMBER,
  'id'          => 'post_per_page',
  'label'       => __( 'Post Per Page', 'koncreate-core' ),
  'default'     => 3,
  'condition'   => array( 'style' => array( 'style4', 'style5', 'style6') ),
),
~~~

## SELECT2 or SELECT
SELECT2 has wrap functionality
~~~php
array(
  'type'    => Controls_Manager::SELECT2,
  'id'      => 'orderby',
  'label'   => esc_html__( 'Order By', 'koncreate-core' ),
  'options' => array(
    'date'        => esc_html__( 'Date (Recent comes first)', 'koncreate-core' ),
    'title'       => esc_html__( 'Title', 'koncreate-core' ),
    'menu_order'  => esc_html__( 'Custom Order (Available via Order field inside Page Attributes box)', 'koncreate-core' ),
  ),
  'default' => 'date',
),
~~~

## adding typography

Unique Name was essential

~~~php
array(
  'type'    => Group_Control_Typography::get_type(),
  'name' => 'content_typography_title',
  'mode'    => 'group',
  'id'      => 'title_typography',
  'label'   => __( 'Title Typography', 'koncreate-core' ),
  'scheme' => Scheme_Typography::TYPOGRAPHY_1,
  'selector' => '{{WRAPPER}} .rtin-title',
  'fields_options' => [
    // Inner control name
    'font_weight' => [
        // Inner control settings
        'default' => '400',
      ],
      'font_family' => [
        'default' => 'Rubik',
      ],
      'font_size'   => [
        'default' => '14px',
      ],
    ],
),
~~~

## CHOOSE
~~~php
      array(
        'type'    => Controls_Manager::CHOOSE,
        'options' => array(
          'left' => [
            'title' => __( 'Left', 'elementor' ),
            'icon' => 'fa fa-align-left',
          ],
          'center' => [
            'title' => __( 'Center', 'elementor' ),
            'icon' => 'fa fa-align-center',
          ],
          'right' => [
            'title' => __( 'Right', 'elementor' ),
            'icon' => 'fa fa-align-right',
          ],
          'justify' => [
            'title' => __( 'Justified', 'elementor' ),
            'icon' => 'fa fa-align-justify',
          ],
        ),
        'id'      => 'title_text_align',
        'label'   => __( 'Title Text Align', 'koncreate-core' ),
        'default' => 'center',
        'selectors' => array( '{{WRAPPER}} .rtin-title' => 'text-align: {{VALUE}}' ),
      ),

~~~


## adding tab for addon
[https://developers.elementor.com/elementor-element-panel-tabs/](https://developers.elementor.com/elementor-element-panel-tabs/)

~~~php
array(
  'mode'    => 'section_start',
  'id'      => 'sec_colors',
  'label'   => __( 'Colors', 'koncreate-core' ),
  'tab'     => Controls_Manager::TAB_STYLE,
),
~~~


Available tab style

* Content Tab – the tab name is `content`, its called using `\Elementor\Controls_Manager::TAB_CONTENT`
* Style Tab – the tab name is `style`, its called using `\Elementor\Controls_Manager::TAB_STYLE`
* Advanced Tab – the tab name is `advanced`, its called using `\Elementor\Controls_Manager::TAB_ADVANCED`
* Responsive Tab – the tab name is `responsive`, its called using `\Elementor\Controls_Manager::TAB_RESPONSIVE`
* Layout Tab – the tab name is `layout`, its called using `\Elementor\Controls_Manager::TAB_LAYOUT`
* Settings Tab – the tab name is `settings`, its called using `\Elementor\Controls_Manager::TAB_SETTINGS`


# switcher
~~~php
array(
  'type'        => Controls_Manager::SWITCHER,
  'id'          => 'has_line_break',
  'label_on' => __( 'yes', 'koncreate-core' ),
  'label_off' => __( 'no', 'koncreate-core' ),
  'label'       => __( 'Has Line Break', 'koncreate-core' ),
  'default'     => "yes",
),
~~~
