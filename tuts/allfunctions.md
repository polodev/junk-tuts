## list of essential functions
* `wp_get_attachment_image_src( $instance['logo'], 'full' );`
* `wp_kses_post( $args['before_widget'] );`
* `sanitize_text_field()`
* `wp_kses_post()`
* `wp_parse_args()`


# how to make a widget in rtfamework

first make a widget class
added widget class in `inc/includes`
call widget class inside `inc/general.php` file . when call we have to pass namespace
~~~php
$namespace = Constants::$theme_namespace;
register_widget($namespace. 'About_Company_Widget' );
~~~


# dynamic title

~~~php
  public static function the_title() {
    if ( is_404() ) {
      $title = esc_html__( 'Page not Found', 'metro' );
    }
    elseif ( is_search() ) {
      $title = esc_html__( 'Search Results for : ', 'metro' ) . get_search_query();
    }
    elseif ( is_home() ) {
      if ( get_option( 'page_for_posts' ) ) {
        $title = get_the_title( get_option( 'page_for_posts' ) );
      }
      else {
        $title = apply_filters( "rdtheme_blog_title", esc_html__( 'All Posts', 'metro' ) );
      }
    }
    elseif ( is_archive() ) {
      $title = get_the_archive_title();
    }
    elseif ( is_page() ) {
      $title = get_the_title();
    }
    else{
      $title = get_the_title();
    }

    echo wp_kses_post( $title );
  }
~~~

# dynamic breadcrumb

~~~php
  public static function the_breadcrumb() {
    // if ( function_exists( 'bcn_display') ) {
    //   bcn_display();
    // }
      self::requires( 'breadcrumbs.php' );
      $args = array(
        'show_browse' => false,
        'post_taxonomy' => array( 'rtcl_listing' =>'rtcl_category' )
      );
      $breadcrumb = new RDTheme_Breadcrumb( $args );
      return $breadcrumb->trail();
  }
~~~

breadcrumb script inside include folder

~~~php
very big so I ignore it. will be available in following file
inc/breadcrumbs.php
~~~



# how to add comments in wp

~~~php

if ( comments_open() || get_comments_number() ){
  ?>

  <div class="comments-wrapper">
   <?php comments_template(); ?>
  </div>

   <?php

}
~~~


# how to position comments textarea in bottom

~~~php

function move_comment_form_below( $fields ) {
    $comment_field = $fields['comment'];
    unset( $fields['comment'] );
    $fields['comment'] = $comment_field;
    return $fields;
}
add_filter( 'comment_form_fields', Constants::$theme_namespace . 'move_comment_form_below' );
~~~

# how to show gravater in wp

~~~php
echo get_avatar( $id_or_email, $size, $default, $alt, $args );
echo get_avatar( get_the_author_meta('ID'), null, null, 'blog author', ['class' => 'media-img-auto'] ) ?>
the_author();
the_author_meta('description') ;
~~~

# some function batches
~~~php
has_post_thumbnail()
get_the_post_thumbnail_url()
the_date('F j, Y')
the_author()
comments_number()
the_category(', ')
the_content()
the_tags( '<ul><li>', '</li> <li>', '</li></ul>' )
get_avatar( get_the_author_meta('ID'), null, null, 'blog author', ['class' => 'media-img-auto'] )
the_author()
the_author_meta('description')
~~~

# for showing `reply form` beneath each comment. Have to enqueue following conditional scripts

~~~php
if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
  wp_enqueue_script( 'comment-reply' );
}
~~~

# customizing search widget in wordpress

~~~php
  public function __construct() {
    add_filter( 'get_search_form',     array( $this, 'search_form' ) );
  }

  public function search_form(){

    // form action and name attribute for search input field
    $output = '
        <div class="widget widget-search">
            <form role="search" method="get" class="search-form" action="' . esc_url( home_url( '/' ) ) . '">
              <div class="input-group stylish-input-group">
                  <input type="text" class="form-control" name="s" placeholder="' . esc_attr__( 'Search here ...', 'builder' ) . '" value="' . get_search_query() . '">
                  <span class="input-group-addon">
                      <button type="submit">
                          <span class="flaticon-magnifying-glass" aria-hidden="true"></span>
                      </button>
                  </span>
              </div>
            </form>
        </div>

    ';
    return $output;
  }
~~~


~~~php
wp_localize_script($old_handle, $object_name, $array)
~~~


# post helper class

~~~php
<div id="post-<?php the_ID(); ?>" <?php post_class('blog-box-layout3') ?> >
~~~

# author posts link inside loop

~~~php
the_author_posts_link()
~~~

# escaping + echoing

~~~php
<?php esc_html_e( 'By', 'builder' );?>
~~~

# for showing template pagination (single post pagination)
form gutenburg we will use `page break` for different page
~~~php
<?php wp_link_pages( array( 'before' => '<div class="page-links">', 'after'  => '</div>' ) );?>
~~~

# important file for creating post types and taxonomies in our rtfamework

~~~bash
rtfamework/inc/rt-postmeta-fields.php
~~~

# we will give user `Duplicate Post Page Menu & Custom Post Type`

It will help users to create project quickly


# get the project category (custom taxonomies)

~~~php
$terms_array = get_the_terms( get_the_ID(), $prefix . '_project_category' );
~~~
# get the custom post type archive page

~~~php
echo get_post_type_archive_link( $prefix . '_project' )
~~~

# next post and previous post with font awesome icon

~~~php
<?php echo get_previous_post_link('<i class="fas fa-arrow-left"></i> %link') ?>
<?php echo get_next_post_link('%link <i class="fas fa-arrow-right"></i>', '%title') ?>
~~~

# get the meta field value

~~~php
$socials  = get_post_meta( get_the_ID(), "{$prefix}_team_socials", true );
~~~

#

~~~php
in functions file
    add_image_size( "{$prefix}-size4", 300,  300, true ); // Team archive

in view file
$thumb_size  = "{$prefix}-size4"; //
<img src="<?php echo esc_attr($thumb); ?>" alt="Team" class="img-fluid">
~~~

# getting smaller excerpt value

~~~php
if ( !has_excerpt() ) {
  $content = get_the_content();
}
else {
  $content = get_the_excerpt();
}
$content = wp_trim_words( $content, 10 );
~~~

# to show javascript change in elementor editor

~~~php
// Elementor Frontend Load
$(window).on('elementor/frontend/init', function () {
  if (elementorFrontend.isEditMode()) {
    elementorFrontend.hooks.addAction('frontend/element_ready/widget', function () {
      rdtheme_content_ready_scripts();
      rdtheme_content_load_scripts();
    });
  }
});
~~~

# sticky sidebar for showing advertisement
~~~php
theiastickysidebar
~~~
soledad theme






