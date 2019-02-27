# social share template-parts

~~~php
<?php
namespace radiustheme\Koncreate;

$url   = urlencode( get_permalink() );
$title = urlencode( get_the_title() );

$defaults = array(
  'facebook' => array(
    'url'  => "http://www.facebook.com/sharer.php?u=$url",
    'icon' => 'fa-facebook',
  ),
  'twitter'  => array(
    'url'  => "https://twitter.com/intent/tweet?source=$url&text=$title:$url",
    'icon' => 'fa-twitter'
  ),
  'gplus'    => array(
    'url'  => "https://plus.google.com/share?url=$url",
    'icon' => 'fa-google-plus'
  ),
  'linkedin' => array(
    'url'  => "http://www.linkedin.com/shareArticle?mini=true&url=$url&title=$title",
    'icon' => 'fa-linkedin'
  ),
  'pinterest'=> array(
    'url'  => "http://pinterest.com/pin/create/button/?url=$url&description=$title",
    'icon' => 'fa-pinterest'
  ),
  'tumblr'   => array(
    'url'  => "http://www.tumblr.com/share?v=3&u=$url &quote=$title",
    'icon' => 'fa-tumblr'
  ),
  'reddit'   => array(
    'url'  => "http://www.reddit.com/submit?url=$url&title=$title",
    'icon' => 'fa-reddit'
  ),
  'vk'       => array(
    'url'  => "http://vkontakte.ru/share.php?url=$url",
    'icon' => 'fa-vk'
  ),
);

foreach ( RDTheme::$options['post_share'] as $key => $value ) {
  if ( !$value ) {
    unset( $defaults[$key] );
  }
}

$sharers = apply_filters( 'rdtheme_social_sharing_icons', $defaults );
?>
<div class="blog-social">
  <ul>
  <?php foreach ( $sharers as $key => $sharer ): ?>
    <li class="blog-<?php echo esc_attr( $key ); ?>">
      <a href="<?php echo esc_attr( $sharer['url'] ); ?>">
        <i class="fa <?php echo esc_attr( $sharer['icon'] );?>"></i>
      </a>
    </li>
  <?php endforeach ?>
  </ul>
</div>
~~~

# css color for social
~~~css

.blog-facebook {
  a {
    background: #405d9b;
  }
}
.blog-twitter {
  a {
    background: #00b0ff;
  }
}
.blog-gplus {
  a {
    background: #ff3d00;
  }
}
.blog-linkedin {
  a {
    background: #066ed5;
  }
}
.blog-pinterest {
  a {
    background: #d50000;
  }
}
.blog-tumblr {
  a {
    background: #34465d;
  }
}
.blog-reddit {
  a {
    background: #ff5700;
  }
}
.blog-vk {
  a {
    background: #4c75a3;
  }
}


~~~
