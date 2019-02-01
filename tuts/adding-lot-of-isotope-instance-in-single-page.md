# php part
~~~php
<?php
namespace radiustheme\Koncreate_Core;

use \WP_Query;
use radiustheme\Koncreate\RDTheme;
use radiustheme\Koncreate\Helper;

$prefix      = KONCREATE_CORE_THEME_PREFIX;
$thumb_size  = "{$prefix}-size2";

$args = array(
  'post_type'        => "{$prefix}_project",
  'posts_per_page'   => -1,
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

$uniqueid = time() . rand( 1, 99 );

$gallery = array();
$cats    = array();

foreach ( $posts as $post ) {
  $cats_comma       = array();
  $img              = get_the_post_thumbnail_url( $post, $thumb_size );
  $terms            = get_the_terms( $post, "{$prefix}_project_category" );
  $terms            = $terms ? $terms : array();
  $terms_html       = '';
  $terms_comma_html = '';
  if ( !$terms ) {
    continue;
  }
  if ( !$img ) {
    if( !empty( RDTheme::$options['no_preview_image']['id'] ) ) {
      $img = wp_get_attachment_image_src( RDTheme::$options['no_preview_image']['id'], $thumb_size, true );
      $img = $img[0];
    }
    else {
      $img  = Helper::get_img( 'noimage_500x400.jpg' );
    }
  }
  foreach ( $terms as $term ) {
    $terms_html  .= " {$uniqueid}-{$term->slug}";
    $cats_comma[] = $term->name;
    if ( !isset( $cats[$term->slug] ) ) {
      $cats[$term->slug] = $term->name;
    }
  }
  $project_type  = get_post_meta( $post->ID, "{$prefix}_project_type", true );
  $gallery[] = array(
    'img'        => $img,
    'title'      => $post->post_title,
    'url'        => get_the_permalink( $post ),
    'cats'       => $terms_html,
    'cats_comma' => implode(", ", $cats_comma ),
    'project_type' => $project_type,
  );
}
$col_class = "col-lg-{$data['col_lg']} col-md-{$data['col_md']} col-sm-{$data['col_sm']} col-xs-{$data['col_xs']}";

?>
<div class="rt-el-project-gallery rt-el-project-gallery-1">
  <div class="isotope-wrap">
    <?php if ($data['filter'] == 'yes'): ?>
      <div class="text-center">
          <div class="isotope-classes-tab isotop-btn">
              <a href="#" class="current nav-item" data-filter="*"><?php esc_html_e( 'All', 'koncreate-core' );?></a>

              <?php foreach ( $cats as $key => $value): ?>
                <?php $cat_filter = "{$uniqueid}-{$key}";?>
                <a href="#" class="nav-item" data-filter=".<?php echo esc_attr( $cat_filter );?>">
                  <?php echo esc_html( $value );?>
                </a>
              <?php endforeach; ?>

          </div>

      </div>
    <?php endif ?>
      <div class="row featuredContainer">
        <?php foreach ($gallery as $single): ?>
          <div class="<?php echo esc_attr( $col_class . $single['cats'] );?>">
              <div class="project-box-layout1">
                  <div class="item-img">
                      <img
                        src="<?php echo esc_url( $single['img'] );?>"
                        alt="<?php echo esc_attr( $single['title'] );?>" class="img-fluid">
                  </div>
                  <div class="item-content">
                      <h3 class="title text-row-1">
                          <a href="<?php echo esc_url( $single['url'] ); ?>">
                            <?php echo esc_html( $single['title'] ); ?>
                          </a>
                      </h3>
                      <?php if ($single['project_type']): ?>
                        <span class="sub-title">
                          <?php echo esc_html( $single['project_type'] ); ?>
                        </span>
                      <?php endif ?>
                  </div>
              </div>
          </div>
        <?php endforeach ?>

      </div>
  </div>
</div>

~~~

# js part
~~~js
$('.isotope-wrap').each( function (){
    var $container = $(this);
    var $isotope = $container.find('.featuredContainer').imagesLoaded(function() {
        $isotope.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
    });
    $container.find('.isotope-classes-tab').on('click', 'a', function () {
        var $this = $(this);
        $this.parent('.isotope-classes-tab').find('a').removeClass('current');
        $this.addClass('current');
        var selector = $this.attr('data-filter');
        $isotope.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });
});
~~~
