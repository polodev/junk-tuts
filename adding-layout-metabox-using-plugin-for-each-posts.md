* make a plugin name with themname + core. eg: `koncreate-core`

in `koncreate-core.php` file following code will be placed

~~~php
<?php
/*
Plugin Name: Koncreate Core
Plugin URI: https://www.radiustheme.com
Description: Koncreate Core Plugin for Builder Theme
Version: 1.0
Author: RadiusTheme
Author URI: https://www.radiustheme.com
*/

if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! defined( 'KONCREATE_CORE' ) ) {
  define( 'KONCREATE_CORE',                   ( WP_DEBUG ) ? time() : '1.0' );
  define( 'KONCREATE_CORE_THEME_PREFIX_VAR',      'koncreate' );
  define( 'KONCREATE_CORE_THEME_PREFIX',  'koncreate' );
}

class Koncreate_Core {

  public $plugin  = 'koncreate-core';
  public $action  = 'koncreate_theme_init';

  public function __construct() {
    $prefix = KONCREATE_CORE_THEME_PREFIX_VAR;

    // add_action( 'plugins_loaded', array( $this, 'demo_importer' ), 15 );
    // add_action( 'plugins_loaded', array( $this, 'load_textdomain' ), 16 );
    add_action( 'after_setup_theme', array( $this, 'post_types' ), 15 );
    // add_action( 'after_setup_theme', array( $this, 'elementor_widgets' ) );

    // Redux Flash permalink after options changed
    add_action( "redux/options/{$prefix}/saved", array( $this, 'flush_redux_saved' ), 10, 2 );
    add_action( "redux/options/{$prefix}/section/reset", array( $this, 'flush_redux_reset' ) );
    add_action( "redux/options/{$prefix}/reset", array( $this, 'flush_redux_reset' ) );
    add_action( 'init', array( $this, 'rewrite_flush_check' ) );
  }

  // public function demo_importer() {
  //   require_once 'demo-importer.php';
  // }

  // public function load_textdomain() {
  //   load_plugin_textdomain( $this->plugin , false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
  // }

  public function post_types(){
    if ( !did_action( $this->action ) || ! defined( 'RT_FRAMEWORK_VERSION' ) ) {
      return;
    }
    // require_once 'post-types.php';
    require_once 'post-meta.php';
  }

  // public function elementor_widgets(){
  //   if ( did_action( $this->action ) && did_action( 'elementor/loaded' ) ) {
  //     require_once 'elementor/init.php';
  //   }
  // }

  // Flush rewrites
  public function flush_redux_saved( $saved_options, $changed_options ){
    if ( empty( $changed_options ) ) {
      return;
    }
    $prefix = KONCREATE_CORE_THEME_PREFIX_VAR;
    $flush  = false;
    $slugs  = array( 'team_slug', 'project_slug' );
    foreach ( $slugs as $slug ) {
      if ( array_key_exists( $slug, $changed_options ) ) {
        $flush = true;
      }
    }

    if ( $flush ) {
      update_option( "{$prefix}_rewrite_flash", true );
    }
  }

  public function flush_redux_reset(){
    $prefix = KONCREATE_CORE_THEME_PREFIX_VAR;
    update_option( "{$prefix}_rewrite_flash", true );
  }

  public function rewrite_flush_check() {
    $prefix = KONCREATE_CORE_THEME_PREFIX_VAR;
    if ( get_option( "{$prefix}_rewrite_flash" ) == true ) {
      flush_rewrite_rules();
      update_option( "{$prefix}_rewrite_flash", false );
    }
  }
}

new Koncreate_Core;

~~~


It require post-meta.php

~~~php
<?php
/**
 * @author  RadiusTheme
 * @since   1.0
 * @version 1.0
 */

namespace radiustheme\Koncreate_Core;

use radiustheme\Koncreate\Helper;
use \RT_Postmeta;

if ( ! defined( 'ABSPATH' ) ) exit;

if ( !class_exists( 'RT_Postmeta' ) ) {
  return;
}

$Postmeta = RT_Postmeta::getInstance();

$prefix = KONCREATE_CORE_THEME_PREFIX_VAR;

/*-------------------------------------
#. Layout Settings
---------------------------------------*/
$nav_menus = wp_get_nav_menus( array( 'fields' => 'id=>name' ) );
$nav_menus = array( 'default' => __( 'Default', 'koncreate-core' ) ) + $nav_menus;
$sidebars  = array( 'default' => __( 'Default', 'koncreate-core' ) ) + Helper::custom_sidebar_fields();

$Postmeta->add_meta_box( "{$prefix}_page_settings", __( 'Layout Settings', 'koncreate-core' ), array( 'page', 'post', "{$prefix}_team", "{$prefix}_project" ), '', '', 'high', array(
  'fields' => array(
    "{$prefix}_layout" => array(
      'label'   => __( 'Layout', 'koncreate-core' ),
      'type'    => 'select',
      'options' => array(
        'default'       => __( 'Default', 'koncreate-core' ),
        'full-width'    => __( 'Full Width', 'koncreate-core' ),
        'left-sidebar'  => __( 'Left Sidebar', 'koncreate-core' ),
        'right-sidebar' => __( 'Right Sidebar', 'koncreate-core' ),
      ),
      'default'  => 'default',
    ),
    "{$prefix}_sidebar" => array(
      'label'    => __( 'Custom Sidebar', 'koncreate-core' ),
      'type'     => 'select',
      'options'  => $sidebars,
      'default'  => 'default',
    ),
    "{$prefix}_page_menu" => array(
      'label'    => __( 'Main Menu', 'koncreate-core' ),
      'type'     => 'select',
      'options'  => $nav_menus,
      'default'  => 'default',
    ),
    "{$prefix}_tr_header" => array(
      'label'       => __( 'Transparent Header', 'koncreate-core' ),
      'type'        => 'select',
      'options'     => array(
        'default' => __( 'Default', 'koncreate-core' ),
        'on'      => __( 'Enabled', 'koncreate-core' ),
        'off'     => __( 'Disabled', 'koncreate-core' ),
      ),
      'default'  => 'default',
    ),
    "{$prefix}_top_bar" => array(
      'label'     => __( 'Top Bar', 'koncreate-core' ),
      'type'      => 'select',
      'options' => array(
        'default' => __( 'Default', 'koncreate-core' ),
        'on'      => __( 'Enabled', 'koncreate-core' ),
        'off'     => __( 'Disabled', 'koncreate-core' ),
      ),
      'default'     => 'default',
    ),
    "{$prefix}_top_bar_style" => array(
      'label'   => __( 'Top Bar Layout', 'koncreate-core' ),
      'type'    => 'select',
      'options' => array(
        'default' => __( 'Default', 'koncreate-core' ),
        '4'       => __( 'Layout 1', 'koncreate-core' ),
        '1'       => __( 'Layout 2', 'koncreate-core' ),
        '2'       => __( 'Layout 3', 'koncreate-core' ),
        '3'       => __( 'Layout 4', 'koncreate-core' ),
      ),
      'default'   => 'default',
    ),
    "{$prefix}_header" => array(
      'label'   => __( 'Header Layout', 'koncreate-core' ),
      'type'    => 'select',
      'options' => array(
        'default' => __( 'Default', 'koncreate-core' ),
        '1'       => __( 'Layout 1', 'koncreate-core' ),
        '6'       => __( 'Layout 2', 'koncreate-core' ),
        '2'       => __( 'Layout 3', 'koncreate-core' ),
        '3'       => __( 'Layout 4', 'koncreate-core' ),
        '4'       => __( 'Layout 5', 'koncreate-core' ),
        '5'       => __( 'Layout 6', 'koncreate-core' ),
      ),
      'default'  => 'default',
    ),
    "{$prefix}_top_padding" => array(
      'label'   => __( 'Content Padding Top', 'koncreate-core' ),
      'type'    => 'select',
      'options' => array(
        'default' => __( 'Default', 'koncreate-core' ),
        '0px'     => __( '0px', 'koncreate-core' ),
        '10px'    => __( '10px', 'koncreate-core' ),
        '20px'    => __( '20px', 'koncreate-core' ),
        '30px'    => __( '30px', 'koncreate-core' ),
        '40px'    => __( '40px', 'koncreate-core' ),
        '50px'    => __( '50px', 'koncreate-core' ),
        '60px'    => __( '60px', 'koncreate-core' ),
        '70px'    => __( '70px', 'koncreate-core' ),
        '80px'    => __( '80px', 'koncreate-core' ),
        '90px'    => __( '90px', 'koncreate-core' ),
        '100px'   => __( '100px', 'koncreate-core' ),
      ),
      'default'  => 'default',
    ),
    "{$prefix}_bottom_padding" => array(
      'label'   => __( 'Content Padding Bottom', 'koncreate-core' ),
      'type'    => 'select',
      'options' => array(
        'default' => __( 'Default', 'koncreate-core' ),
        '0px'     => __( '0px', 'koncreate-core' ),
        '10px'    => __( '10px', 'koncreate-core' ),
        '20px'    => __( '20px', 'koncreate-core' ),
        '30px'    => __( '30px', 'koncreate-core' ),
        '40px'    => __( '40px', 'koncreate-core' ),
        '50px'    => __( '50px', 'koncreate-core' ),
        '60px'    => __( '60px', 'koncreate-core' ),
        '70px'    => __( '70px', 'koncreate-core' ),
        '80px'    => __( '80px', 'koncreate-core' ),
        '90px'    => __( '90px', 'koncreate-core' ),
        '100px'   => __( '100px', 'koncreate-core' ),
      ),
      'default'  => 'default',
    ),
    "{$prefix}_banner" => array(
      'label'   => __( 'Banner', 'koncreate-core' ),
      'type'    => 'select',
      'options' => array(
        'default' => __( 'Default', 'koncreate-core' ),
        'on'    => __( 'Enable', 'koncreate-core' ),
        'off'   => __( 'Disable', 'koncreate-core' ),
      ),
      'default'  => 'default',
    ),
    "{$prefix}_breadcrumb" => array(
      'label'   => __( 'Breadcrumb', 'koncreate-core' ),
      'type'    => 'select',
      'options' => array(
        'default' => __( 'Default', 'koncreate-core' ),
        'on'      => __( 'Enable', 'koncreate-core' ),
        'off'   => __( 'Disable', 'koncreate-core' ),
      ),
      'default'  => 'default',
    ),
    "{$prefix}_banner_type" => array(
      'label'   => __( 'Banner Background Type', 'koncreate-core' ),
      'type'    => 'select',
      'options' => array(
        'default' => __( 'Default', 'koncreate-core' ),
        'bgimg'   => __( 'Background Image', 'koncreate-core' ),
        'bgcolor' => __( 'Background Color', 'koncreate-core' ),
      ),
      'default' => 'default',
    ),
    "{$prefix}_banner_bgimg" => array(
      'label' => __( 'Banner Background Image', 'koncreate-core' ),
      'type'  => 'image',
      'desc'  => __( 'If not selected, default will be used', 'koncreate-core' ),
    ),
    "{$prefix}_banner_bgcolor" => array(
      'label' => __( 'Banner Background Color', 'koncreate-core' ),
      'type'  => 'color_picker',
      'desc'  => __( 'If not selected, default will be used', 'koncreate-core' ),
    ),
  ),
) );


/*-------------------------------------
#. Team
---------------------------------------*/
$Postmeta->add_meta_box( "{$prefix}_team_settings", __( 'Team Member Settings', 'koncreate-core' ), array( "{$prefix}_team" ), '', '', 'high', array(
  'fields' => array(
    "{$prefix}_team_designation" => array(
      'label' => __( 'Designation', 'koncreate-core' ),
      'type'  => 'text',
    ),
    "{$prefix}_team_socials_header" => array(
      'label' => __( 'Socials', 'koncreate-core' ),
      'type'  => 'header',
      'desc'  => __( 'Enter your social links here', 'koncreate-core' ),
    ),
    "{$prefix}_team_socials" => array(
      'type'  => 'group',
      'value'  => Helper::team_socials()
    ),
  )
) );

$Postmeta->add_meta_box( "{$prefix}_team_skills", __( 'Team Member Skills', 'koncreate-core' ), array( "{$prefix}_team" ), '', '', 'high', array(
  'fields' => array(
    "{$prefix}_team_skill" => array(
      'type'  => 'repeater',
      'button' => __( 'Add New Skill', 'koncreate-core' ),
      'value'  => array(
        'skill_name' => array(
          'label' => __( 'Skill Name', 'koncreate-core' ),
          'type'  => 'text',
          'desc'  => __( 'eg. Marketing', 'koncreate-core' ),
        ),
        'skill_value' => array(
          'label' => __( 'Skill Percentage (%)', 'koncreate-core' ),
          'type'  => 'text',
          'desc'  => __( 'eg. 75', 'koncreate-core' ),
        ),
        'skill_color' => array(
          'label' => __( 'Skill Color', 'koncreate-core' ),
          'type'  => 'color_picker',
          'desc'  => __( 'If not selected, primary color will be used', 'koncreate-core' ),
        ),
      )
    ),
  )
) );


/*-------------------------------------
#. Project
---------------------------------------*/
$Postmeta->add_meta_box( "{$prefix}_project_info", __( 'Project Info', 'koncreate-core' ), array( "{$prefix}_project" ), '', '', 'high', array(
  'fields' => array(
    "{$prefix}_project_header" => array(
      'label' => 'Custom Fields',
      'type'  => 'header',
      'desc'  => __( "Click on 'Add New Field' button to create new field", 'koncreate-core' ),
      ),
    "{$prefix}_project_fields" => array(
      'type'  => 'repeater',
      'button' => __( 'Add New Field', 'koncreate-core' ),
      'value'  => array(
        'project_label' => array(
          'label' => __( 'Field Name', 'koncreate-core' ),
          'type'  => 'text',
        ),
        'project_value' => array(
          'label' => __( 'Field Value', 'koncreate-core' ),
          'type'  => 'textarea',
        ),
      )
    ),
  ),
) );


/*-------------------------------------
#. Testimonial
---------------------------------------*/
$Postmeta->add_meta_box( "{$prefix}_testimonial_info", __( 'Testimonial Info', 'koncreate-core' ), array( "{$prefix}_testimonial" ), '', '', 'high', array(
  'fields' => array(
    "{$prefix}_tes_designation" => array(
      'label' => __( 'Designation', 'koncreate-core' ),
      'type'  => 'text',
    ),
  )
) );

~~~

