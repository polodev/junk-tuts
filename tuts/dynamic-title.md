~~~php
public static function the_title() {
  if ( is_404() ) {
    $title = esc_html__( 'Page not Found', 'text_domain_name' );
  }
  elseif ( is_search() ) {
    $title = esc_html__( 'Search Results for : ', 'text_domain_name' ) . get_search_query();
  }
  elseif ( is_home() ) {
    if ( get_option( 'page_for_posts' ) ) {
      $title = get_the_title( get_option( 'page_for_posts' ) );
    }
    else {
      $title = apply_filters( "rdtheme_blog_title", esc_html__( 'All Posts', 'text_domain_name' ) );
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
