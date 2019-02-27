
# sample dynamic style php file

# adding dynamic style
~~~php
$this->dynamic_style();// Dynamic style
private function dynamic_style(){
  // $dynamic_css  = $this->template_style();
  $dynamic_css = $this->generacte_responsive_css();
  $dynamic_css .= "
    body {
      background-color: salmon;
      color: white;
    }
   ";
  ob_start();
  Helper::requires( 'dynamic-style.php' );
  // Helper::requires( 'dynamic-style-elementor.php' );
  $dynamic_css .= ob_get_clean();
  $dynamic_css  = $this->minified_css( $dynamic_css );
  wp_register_style( $this->prefix . '-dynamic', false );
  wp_enqueue_style( $this->prefix . '-dynamic' );
  wp_add_inline_style( $this->prefix . '-dynamic', $dynamic_css );
}
~~~

~~~php
<?php
/**
 * @author  RadiusTheme
 * @since   1.0
 * @version 1.0
 */

namespace radiustheme\Koncreate;

/*-------------------------------------
INDEX
=======================================
#. Defaults
#. Typography
#. Header
#. Breadcrumb
#. Footer
#. Theme Defaults
#. Widgets
#. Contents Area
-------------------------------------*/

$prefix = Constants::$theme_prefix;
$primary_color    = apply_filters( "{$prefix}_primary_color", RDTheme::$options['primary_color'] ); // #1aa78e
$primary_rgb      = Helper::hex2rgb( $primary_color ); // 26, 167, 142
$secondery_color = '';

$typo_body     = RDTheme::$options['typo_body'];
$typo_h1       = RDTheme::$options['typo_h1'];
$typo_h2       = RDTheme::$options['typo_h2'];
$typo_h3       = RDTheme::$options['typo_h3'];
$typo_h4       = RDTheme::$options['typo_h4'];
$typo_h5       = RDTheme::$options['typo_h5'];
$typo_h6       = RDTheme::$options['typo_h6'];

$menu_typo     = RDTheme::$options['menu_typo'];
$submenu_typo  = RDTheme::$options['submenu_typo'];
$resmenu_typo  = RDTheme::$options['resmenu_typo'];
?>

<?php
/*-------------------------------------
#. Defaults
---------------------------------------*/
?>
.primary-color {
  color: <?php echo esc_html( $primary_color ); ?>;
}
.secondery-color {
  color: <?php echo esc_html( $secondery_color ); ?>;
}
.primary-bgcolor {
  background-color: <?php echo esc_html( $primary_color ); ?>;
}
.secondery-bgcolor {
  background-color: <?php echo esc_html( $secondery_color ); ?>;
}

<?php
/*-------------------------------------
#. Typography
---------------------------------------*/
?>
body, ul li {
  font-family: <?php echo esc_html( $typo_body['font-family'] ); ?>, sans-serif;
  font-size: <?php echo esc_html( $typo_body['font-size'] ); ?>;
  line-height: <?php echo esc_html( $typo_body['line-height'] ); ?>;
  font-weight : <?php echo esc_html( $typo_body['font-weight'] ); ?>;
  font-style: <?php echo empty( $typo_body['font-style'] ) ? 'normal' : $typo_body['font-style']; ?>;
}
h1 {
  font-family: <?php echo esc_html( $typo_h1['font-family'] ); ?>, sans-serif;
  font-size: <?php echo esc_html( $typo_h1['font-size'] ); ?>;
  line-height: <?php echo esc_html( $typo_h1['line-height'] ); ?>;
  font-weight : <?php echo esc_html( $typo_h1['font-weight'] ); ?>;
  font-style: <?php echo empty( $typo_h1['font-style'] ) ? 'normal' : $typo_h1['font-style']; ?>;
}
h2 {
  font-family: <?php echo esc_html( $typo_h2['font-family'] ); ?>, sans-serif;
  font-size: <?php echo esc_html( $typo_h2['font-size'] ); ?>;
  line-height: <?php echo esc_html( $typo_h2['line-height'] ); ?>;
  font-weight : <?php echo esc_html( $typo_h2['font-weight'] ); ?>;
  font-style: <?php echo empty( $typo_h2['font-style'] ) ? 'normal' : $typo_h2['font-style']; ?>;
}
h3 {
  font-family: <?php echo esc_html( $typo_h3['font-family'] ); ?>, sans-serif;
  font-size: <?php echo esc_html( $typo_h3['font-size'] ); ?>;
  line-height: <?php echo esc_html( $typo_h3['line-height'] ); ?>;
  font-weight : <?php echo esc_html( $typo_h3['font-weight'] ); ?>;
  font-style: <?php echo empty( $typo_h3['font-style'] ) ? 'normal' : $typo_h3['font-style']; ?>;
}
h4 {
  font-family: <?php echo esc_html( $typo_h4['font-family'] ); ?>, sans-serif;
  font-size: <?php echo esc_html( $typo_h4['font-size'] ); ?>;
  line-height: <?php echo esc_html( $typo_h4['line-height'] ); ?>;
  font-weight : <?php echo esc_html( $typo_h4['font-weight'] ); ?>;
  font-style: <?php echo empty( $typo_h4['font-style'] ) ? 'normal' : $typo_h4['font-style']; ?>;
}
h5 {
  font-family: <?php echo esc_html( $typo_h5['font-family'] ); ?>, sans-serif;
  font-size: <?php echo esc_html( $typo_h5['font-size'] ); ?>;
  line-height: <?php echo esc_html( $typo_h5['line-height'] ); ?>;
  font-weight : <?php echo esc_html( $typo_h5['font-weight'] ); ?>;
  font-style: <?php echo empty( $typo_h5['font-style'] ) ? 'normal' : $typo_h5['font-style']; ?>;
}
h6 {
  font-family: <?php echo esc_html( $typo_h6['font-family'] ); ?>, sans-serif;
  font-size: <?php echo esc_html( $typo_h6['font-size'] ); ?>;
  line-height: <?php echo esc_html( $typo_h6['line-height'] ); ?>;
  font-weight : <?php echo esc_html( $typo_h6['font-weight'] ); ?>;
  font-style: <?php echo empty( $typo_h6['font-style'] ) ? 'normal' : $typo_h6['font-style']; ?>;
}

.main-header .main-navigation-area .main-navigation ul li a {
  font-family: <?php echo esc_html( $menu_typo['font-family'] ); ?>, sans-serif;
  font-size : <?php echo esc_html( $menu_typo['font-size'] ); ?>;
  font-weight : <?php echo esc_html( $menu_typo['font-weight'] ); ?>;
  line-height : <?php echo esc_html( $menu_typo['line-height'] ); ?>;
  text-transform : <?php echo esc_html( $menu_typo['text-transform'] ); ?>;
  font-style: <?php echo empty( $menu_typo['font-style'] ) ? 'normal' : $menu_typo['font-style']; ?>;
}
.main-header .main-navigation-area .main-navigation ul li ul li a {
  font-family: <?php echo esc_html( $submenu_typo['font-family'] ); ?>, sans-serif;
  font-size : <?php echo esc_html( $submenu_typo['font-size'] ); ?>;
  font-weight : <?php echo esc_html( $submenu_typo['font-weight'] ); ?>;
  line-height : <?php echo esc_html( $submenu_typo['line-height'] ); ?>;
  text-transform : <?php echo esc_html( $submenu_typo['text-transform'] ); ?>;
  font-style: <?php echo empty( $submenu_typo['font-style'] ) ? 'normal' : $submenu_typo['font-style']; ?>;
}
.mean-container .mean-nav ul li a {
  font-family: <?php echo esc_html( $resmenu_typo['font-family'] ); ?>, sans-serif;
  font-size : <?php echo esc_html( $resmenu_typo['font-size'] ); ?>;
  font-weight : <?php echo esc_html( $resmenu_typo['font-weight'] ); ?>;
  line-height : <?php echo esc_html( $resmenu_typo['line-height'] ); ?>;
  text-transform : <?php echo esc_html( $resmenu_typo['text-transform'] ); ?>;
  font-style: <?php echo empty( $resmenu_typo['font-style'] ) ? 'normal' : $resmenu_typo['font-style']; ?>;
}

~~~

