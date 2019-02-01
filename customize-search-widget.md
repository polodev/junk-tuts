# add filter for search widget
~~~php
add_filter( 'get_search_form',     array( $this, 'search_form' ) );
~~~

# function it self

~~~php
public function search_form(){

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

