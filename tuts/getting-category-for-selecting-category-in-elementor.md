~~~php
    $categories = get_categories();
    $category_dropdown = array( '0' => __( 'All Categories', 'builder-core' ) );

    foreach ( $categories as $category ) {
      $category_dropdown[$category->term_id] = $category->name;
    }
~~~

## uses

~~~php
array(
  'type'    => Controls_Manager::SELECT2,
  'id'      => 'cat',
  'label'   => __( 'Categories', 'builder-core' ),
  'options' => $category_dropdown,
  'default' => '0',
),
~~~
