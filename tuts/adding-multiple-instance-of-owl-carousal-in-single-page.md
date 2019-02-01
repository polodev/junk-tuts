# php part
~~~php
<?php
/**
 * @author  RadiusTheme
 * @since   1.0
 * @version 1.0
 */

namespace radiustheme\Koncreate_Core;

use \WP_Query;
use radiustheme\Koncreate\RDTheme;
use radiustheme\Koncreate\Helper;
$prefix      = KONCREATE_CORE_THEME_PREFIX;
$thumb_size  = "{$prefix}-size3";

$args = array(
  'post_type'        => "{$prefix}_project",
  'posts_per_page'   => $data['posts_per_page'],
  'suppress_filters' => false,
  'orderby'          => $data['orderby'],
);

switch ( $data['orderby'] ) {
  case 'title':
  case 'menu_order':
  $args['order'] = 'ASC';
  break;
}

$posts = get_posts( $args );
$uniqueid = uniqid();


?>
<div class="rt-el-project-gallery rt-el-project-gallery-6">
  <div id="owl-<?php echo esc_attr( $uniqueid ); ?>" class="smart-nav-layout3">
      <span class="rt-prev">
          <i class="flaticon-left-arrow"></i>
      </span>
      <span class="rt-next">
          <i class="flaticon-right-arrow"></i>
      </span>
  </div>
    <div
      data-items="<?php echo esc_attr( $data['no_of_items'] ); ?>"
      data-r-x-small="1"
      data-r-x-medium="1"
      data-r-small="<?php echo esc_attr( ceil( $data['no_of_items'] /2 ) ); ?>"
      data-r-medium="<?php echo esc_attr( $data['no_of_items'] ); ?>"
      data-r-large="<?php echo esc_attr( $data['no_of_items'] ); ?>"
      class="rc-carousel" data-loop="true" data-margin="10" data-autoplay="false" data-autoplay-timeout="5000"
      data-smart-speed="2000" data-custom-nav="#owl-<?php echo esc_attr( $uniqueid ); ?>" data-dots="false" data-nav="false" data-nav-speed="false" data-r-x-small-nav="false"
      data-r-x-small-dots="false" data-r-x-medium-nav="false" data-r-x-medium-dots="false"
      data-r-small-nav="false" data-r-small-dots="false" data-r-medium-nav="false" data-r-medium-dots="false"
      data-r-large-nav="false" data-r-large-dots="false">
    <?php foreach ($posts as $post): ?>
      <?php
        $img   = get_the_post_thumbnail_url( $post, $thumb_size );
        $project_type  = get_post_meta( $post->ID, "{$prefix}_project_type", true );
        $permalink = get_the_permalink($post);
        if ( !$img ) {
          if( !empty( RDTheme::$options['no_preview_image']['id'] ) ) {
            $img = wp_get_attachment_image_src( RDTheme::$options['no_preview_image']['id'], $thumb_size, true );
            $img = $img[0];
          }
          else {
            $img  = Helper::get_img( 'noimage_500x400.jpg' );
          }
        }
        if ( !has_excerpt($post) ) {
          $content = $post->post_content;
        }
        else {
          $content = $post->post_excerpt;
        }
        $content = wp_trim_words( $content, 10 );
       ?>
      <div class="project-box-layout6">
          <img src="<?php echo esc_attr( $img ); ?>" alt="Project Img" class="img-fluid">
          <div class="item-content">
              <h3 class="item-title">
                <a href="<?php echo esc_url( $permalink ); ?>"><?php echo esc_html( $post->post_title ); ?></a>
              </h3>
              <p><?php echo esc_html( $content ); ?></p>
          </div>
      </div>

      <?php endforeach; ?>
  </div>
</div>

~~~


# js part
~~~js
/*-------------------------------------
Carousel slider initiation
-------------------------------------*/
$('.rc-carousel').each(function() {
    var carousel = $(this),
        loop = carousel.data('loop'),
        Canimate = carousel.data('animate'),
        items = carousel.data('items'),
        margin = carousel.data('margin'),
        stagePadding = carousel.data('stage-padding'),
        autoplay = carousel.data('autoplay'),
        autoplayTimeout = carousel.data('autoplay-timeout'),
        smartSpeed = carousel.data('smart-speed'),
        dots = carousel.data('dots'),
        nav = carousel.data('nav'),
        navSpeed = carousel.data('nav-speed'),
        rXsmall = carousel.data('r-x-small'),
        rXsmallNav = carousel.data('r-x-small-nav'),
        rXsmallDots = carousel.data('r-x-small-dots'),
        rXmedium = carousel.data('r-x-medium'),
        rXmediumNav = carousel.data('r-x-medium-nav'),
        rXmediumDots = carousel.data('r-x-medium-dots'),
        rSmall = carousel.data('r-small'),
        rSmallNav = carousel.data('r-small-nav'),
        rSmallDots = carousel.data('r-small-dots'),
        rMedium = carousel.data('r-medium'),
        rMediumNav = carousel.data('r-medium-nav'),
        rMediumDots = carousel.data('r-medium-dots'),
        rLarge = carousel.data('r-large'),
        rLargeNav = carousel.data('r-large-nav'),
        rLargeDots = carousel.data('r-large-dots'),
        center = carousel.data('center'),
        custom_nav = carousel.data('custom-nav') || '';
    carousel.owlCarousel({
        loop: (loop ? true : false),
        animateOut: Canimate,
        items: (items ? items : 4),
        lazyLoad: true,
        margin: (margin ? margin : 0),
        autoplay: (autoplay ? true : false),
        autoplayTimeout: (autoplayTimeout ? autoplayTimeout : 1000),
        smartSpeed: (smartSpeed ? smartSpeed : 250),
        dots: (dots ? true : false),
        nav: (nav ? true : false),
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        navSpeed: (navSpeed ? true : false),
        center: (center ? true : false),
        responsiveClass: true,
        responsive: {
            0: {
                items: (rXsmall ? rXsmall : 1),
                nav: (rXsmallNav ? true : false),
                dots: (rXsmallDots ? true : false)
            },
            576: {
                items: (rXmedium ? rXmedium : 2),
                nav: (rXmediumNav ? true : false),
                dots: (rXmediumDots ? true : false)
            },
            768: {
                items: (rSmall ? rSmall : 3),
                nav: (rSmallNav ? true : false),
                dots: (rSmallDots ? true : false)
            },
            992: {
                items: (rMedium ? rMedium : 4),
                nav: (rMediumNav ? true : false),
                dots: (rMediumDots ? true : false)
            },
            1200: {
                items: (rLarge ? rLarge : 5),
                nav: (rLargeNav ? true : false),
                dots: (rLargeDots ? true : false)
            }
        }
    });
    var owl = carousel.data('owlCarousel');


    if (custom_nav) {
        var nav = $(custom_nav),
            nav_next = $('.rt-next', nav),
            nav_prev = $('.rt-prev', nav);

        nav_next.on('click', function(e) {
            e.preventDefault();
            owl.next();
            return false;
        });

        nav_prev.on('click', function(e) {
            e.preventDefault();
            owl.prev();
            return false;
        });
    }
});
~~~

