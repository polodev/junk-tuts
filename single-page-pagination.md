# from gutenburg next page link will be achieve through `layout elements > page break` block
## added pagination for single post
~~~php
  wp_link_pages(
    array(
      'before' => '<div class="post-pagination">' . __('Pages:', 'koncreate'), 'after'  => '</div>',
      'link_before'      => '<span>',
     'link_after'       => '</span>'
    )
  )
~~~

## style

~~~css
.post-pagination {
  text-align: center;
  span {
    display: inline-block;
    border: 1px solid #dddddd;
    padding: 4px 15px;
    border-radius: 4px;
    transition: all 0.3s ease-out;
    font-size: 20px;

    background-color: var(--primary-color);
    color: #ffffff;
  }
  a span {
    background-color: #ffffff;
    color: #111111;
  }
}

~~~
