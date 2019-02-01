# class
~~~php
<?php
/**
 * @author  RadiusTheme
 * @since   1.0
 * @version 1.0
 */

namespace radiustheme\Koncreate_Core;

use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit;

class Isotope_Project extends Custom_Widget_Base {

  public function __construct( $data = [], $args = null ){
    $this->rt_name = esc_html__( 'Isotope Gallery', 'koncreate-core' );
    $this->rt_base = 'rt-isotope-gallery';
    $this->rt_translate = array(
      'cols'  => array(
        '12' => esc_html__( '1 Col', 'koncreate-core' ),
        '6'  => esc_html__( '2 Col', 'koncreate-core' ),
        '4'  => esc_html__( '3 Col', 'koncreate-core' ),
        '3'  => esc_html__( '4 Col', 'koncreate-core' ),
        '2'  => esc_html__( '6 Col', 'koncreate-core' ),
      ),
    );
    parent::__construct( $data, $args );
  }

  // private function rt_load_scripts(){
  //   wp_enqueue_script( 'isotope-js' );
  // }

  public function rt_fields(){
    $fields = array(
      array(
        'mode'    => 'section_start',
        'id'      => 'sec_general',
        'label'   => esc_html__( 'General', 'koncreate-core' ),
      ),
      // array(
      //   'type'    => Controls_Manager::SELECT2,
      //   'id'      => 'style',
      //   'label'   => esc_html__( 'Style', 'koncreate-core' ),
      //   'options' => array(
      //     'style1' => esc_html__( 'Style 1', 'koncreate-core' ),
      //     'style2' => esc_html__( 'Style 2', 'koncreate-core' ),
      //     'style3' => esc_html__( 'Style 3', 'koncreate-core' ),
      //     'style4' => esc_html__( 'Style 4', 'koncreate-core' ),
      //   ),
      //   'default' => 'style1',
      // ),
      array(
        'type'    => Controls_Manager::SELECT2,
        'id'      => 'orderby',
        'label'   => esc_html__( 'Order By', 'koncreate-core' ),
        'options' => array(
          'date'        => esc_html__( 'Date (Recents comes first)', 'koncreate-core' ),
          'title'       => esc_html__( 'Title', 'koncreate-core' ),
          'menu_order'  => esc_html__( 'Custom Order (Available via Order field inside Page Attributes box)', 'koncreate-core' ),
        ),
        'default' => 'date',
      ),

      array(
        'type'        => Controls_Manager::SWITCHER,
        'id'          => 'filter',
        'label'       => esc_html__( 'Filter Tabs', 'koncreate-core' ),
        'label_on'    => esc_html__( 'On', 'koncreate-core' ),
        'label_off'   => esc_html__( 'Off', 'koncreate-core' ),
        'default'     => 'yes',
        'description' => esc_html__( 'Filter Tabs. Default: On', 'koncreate-core' ),
      ),
      array(
        'mode' => 'section_end',
      ),

      // Responsive Columns
      array(
        'mode'    => 'section_start',
        'id'      => 'sec_responsive',
        'label'   => esc_html__( 'Number of Responsive Columns', 'koncreate-core' ),
      ),
      array(
        'type'    => Controls_Manager::SELECT2,
        'id'      => 'col_lg',
        'label'   => esc_html__( 'Desktops: > 1199px', 'koncreate-core' ),
        'options' => $this->rt_translate['cols'],
        'default' => '4',
      ),
      array(
        'type'    => Controls_Manager::SELECT2,
        'id'      => 'col_md',
        'label'   => esc_html__( 'Desktops: > 991px', 'koncreate-core' ),
        'options' => $this->rt_translate['cols'],
        'default' => '4',
      ),
      array(
        'type'    => Controls_Manager::SELECT2,
        'id'      => 'col_sm',
        'label'   => esc_html__( 'Tablets: > 767px', 'koncreate-core' ),
        'options' => $this->rt_translate['cols'],
        'default' => '6',
      ),
      array(
        'type'    => Controls_Manager::SELECT2,
        'id'      => 'col_xs',
        'label'   => esc_html__( 'Phones: < 768px', 'koncreate-core' ),
        'options' => $this->rt_translate['cols'],
        'default' => '12',
      ),
      array(
        'mode' => 'section_end',
      ),
    );
    return $fields;
  }
  protected function render() {
    $data = $this->get_settings();

    // $this->rt_load_scripts();

    // switch ( $data['style'] ) {
    //   case 'style2':
    //   $template = 'gallrey-2';
    //   break;
    //   case 'style3':
    //   $template = 'gallrey-3';
    //   break;
    //   case 'style4':
    //   $template = 'gallrey-4';
    //   break;
    //   default:
    //   $template = 'gallrey-1';
    //   break;
    // }
    $template = 'view';
    return $this->rt_template( $template, $data );
  }
}

~~~


# view

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
<div class="rt-el-isotope-project">
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
