# posts-per-page-for-custom-post-types using `pre_get_posts` hooks
# fork from manik vi

~~~php
add_action( 'pre_get_posts', array($this, 'wp_speaker_query' ), 999);
public function wp_speaker_query( $query ) {
  if ( is_post_type_archive( "eventalk_speaker" ) || is_tax( "eventalk_speaker_category" ) ) {
   $query->set( 'posts_per_page', RDTheme::$options['speakers_arc_number']);;
  }
}
~~~

# dynamically used for my case , lot of custom post type

~~~php
 add_action( 'pre_get_posts', array($this, 'posts_per_page_for_custom_post_type' ), 999);

public function posts_per_page_for_custom_post_type( $query )
{
  $prefix = Constants::$theme_prefix;
  $post_types = ['project', 'service', 'team'];
  foreach ($post_types as $post_type) {
    $post_type_full            = "{$prefix}_{$post_type}";
    $taxonnomy                 = "{$prefix}_{$post_type}_category";
    $redux_posts_per_page_id   = "{$post_type}_archive_number";
    $redux_order_by_id         = "{$post_type}_archive_orderby";
    // main code is following
    if ( is_post_type_archive( $post_type_full ) || is_tax( $taxonnomy ) ) {
      $query->set( 'posts_per_page', RDTheme::$options[ $redux_posts_per_page_id ]);;
      $query->set( 'orderby', RDTheme::$options[ $redux_order_by_id ]);;
    }
  }
}
~~~

