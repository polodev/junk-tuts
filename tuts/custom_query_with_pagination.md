# custom query with pagination
~~~php
public static function set_args_orderby($args, $rd_field)
  {
    $orderby = '';
    $order   = 'DESC';
    switch ( RDTheme::$options[ $rd_field ] ) {
      case 'title':
      case 'menu_order':
      $orderby = RDTheme::$options[ $rd_field ];
      $order = 'ASC';
      break;
    }
    if ( $orderby ) {
      $args['orderby'] = $orderby;
      $args['order'] = $order;
    }
    return $args;
  }

  /**
   * for setting up pagination for custom post type
   * we have to pass paged key
   */
  public static function set_args_paged ($args) {
    if ( get_query_var('paged') ) {
      $args['paged'] = get_query_var('paged');
    }
    elseif ( get_query_var('page') ) {
      $args['paged'] = get_query_var('page');
    }
    else {
      $args['paged'] = 1;
    }
    return $args;
  }


  /**
   * it will generate archive page for a post type
   * task breakdown -
   * 1. setting archive style,
   * 2. adding args for custom post type,
   * 3. make wp query & return
   * @param  string $post_type    - post type short name eg. project, team, service
   * @param  [type] $archive_style e.g: 1, 2, 3
   * @return [type]                it will return bool
   */
  public static function custom_query($post_type='post', $archive_style) {
    $prefix         = Constants::$theme_prefix;
    $full_post_type = "{$prefix}_{$post_type}";
    if ($post_type == 'post') {
      $full_post_type = 'post';
    }
    $archive_number = "{$post_type}_archive_number";
    $orderby_field  = "{$post_type}_archive_orderby";
    $args = array(
      'post_type'      => $full_post_type,
      'posts_per_page' => RDTheme::$options[$archive_number],
    );
    $args   = self::set_args_orderby( $args, $orderby_field);
    $args   = self::set_args_paged( $args );
    $query  = new WP_Query( $args );
    return $query;
  }

  /**
   * 4. showing template
   * 5. reset reset_postdata
   * @param  [type] $post_type     [description]
   * @param  [type] $archive_style [description]
   * @return [type]                [description]
   */
  public static function generate_custom_archive_page($post_type, $archive_style)
  {
    RDTheme::$options["${post_type}_archive_style"] = $archive_style;
    $query = self::custom_query($post_type, $archive_style);
    global $wp_query;
    $wp_query = NULL;
    $wp_query = $query;
    get_template_part('index');
    wp_reset_postdata();
  }
~~~
