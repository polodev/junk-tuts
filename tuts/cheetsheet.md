# getting dynamic version name in wordpress
# getting author uri dynamically


~~~php
// here ns means namespace
$theme_data = wp_get_theme( get_template() );
define( NS . 'THEME_VERSION',     ( WP_DEBUG ) ? time() : $theme_data->get( 'Version' ) );
define( NS . 'THEME_AUTHOR_URI',  $theme_data->get( 'AuthorURI' ) );
~~~

# class based enqueue

~~~php

namespace radiustheme\Builder;


class Helper {
  public static function get_css( $file ){
    $file = get_stylesheet_directory_uri() . '/assets/css/' . $file . '.css';
    return $file;
  }
}

~~~


~~~php
namespace radiustheme\Builder;
class Scripts {
  public $version = 'version from constant file  which will be dynamically ';
  public function __construct()
  {
    add_action('wp_enqueue_scripts', [$this, 'register_scripts', 10]);
    add_action( 'wp_enqueue_scripts', [$this, 'enqueue_scripts'], 15 );
  }

  public function register_scripts()
  {
    wp_register_style( 'owl-carousel', Helper::get_css( 'owl.carousel.min' ), array(), $this->version );

  }
  public function enqueue_scripts()
  {
    wp_enqueue_style( 'bootstrap', Helper::get_css( 'bootstrap.min' ), array(), $this->version );

  }
}
new Scripts;
~~~


~~~md
<html <?php language_attributes(); ?>>
~~~

# adding walker nav menu for custom navigation class and attributes

[https://developer.wordpress.org/reference/classes/walker_nav_menu/](https://developer.wordpress.org/reference/classes/walker_nav_menu/) .

~~~php
namespace radiustheme\Koncreate;

class My_Walker_Nav_Menu extends \Walker_Nav_Menu {

  public function start_lvl( &$output, $depth = 0, $args = array() ){
    if ($depth == 0) {
      $class_name = 'dropdown-menu-col-1';
    }
    else if ($depth == 1) {
      $class_name = 'third-level';
    }
    else {
      $class_name = 'dropdown-menu-col-1';
    }
    $indent = str_repeat("\t", $depth);
    $output .= "\n$indent<ul class=\"" . $class_name ."\">\n";
  }
  public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
    //....existing code....
    if ($depth == 1) {
      $children = get_posts(array('post_type' => 'nav_menu_item', 'nopaging' => true, 'numberposts' => 1, 'meta_key' => '_menu_item_menu_item_parent', 'meta_value' => $item->ID));
      if (!empty($children)) {
        $attributes .= " class=\"third-level-arrow\"";  // just for adding this I have added this
      }
    }
    //....existing code...

  }

}

~~~

## instantiating walker in nav_menu_args `walker` key.

~~~php

$nav_menu_args = [
      'container' => 'nav',
      'container_id' => 'dropdown',
      'walker' => new My_Walker_Nav_Menu(),
      'theme_location' => 'primary',
      'fallback_cb' => false,
       ];
wp_nav_menu($nav_menu_args);
~~~


# going to home url

~~~php
<a href="<?php echo  home_url(); ?>" class="temp-logo">logo</a>
~~~

# install envato theme check plugin (Theme Check)
# install monstar widget plugin

# for custom post 3 things we have to add
* custom post type
* taxonomies
* metabox

# when I need to use both font awesome version. I have to add font awesome 5 in top and font awesome 4 in bottom
I have to add fontawesome 5 on top
and fontawesome 4 on bottom

# getting your theme gutenburg ready
[https://www.billerickson.net/getting-your-theme-ready-for-gutenberg/](https://www.billerickson.net/getting-your-theme-ready-for-gutenberg/)
~~~php
https://www.billerickson.net/getting-your-theme-ready-for-gutenberg/
~~~

# sublime cheetsheet
for selecting sigle word repetition (ctrl + d)
for selecting all word repetition (alt + f3)



# for layout setting in redux

inc/option/layout.php
inc/layout-settings.php

type will be declare in layout.php
use in layout-settings.php file


