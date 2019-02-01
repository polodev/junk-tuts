# responsive translate inside constructor
# responsive option panel
# slider option (like auto play, delay)
# generating data (for making json)
# view (for adding json and uniqueid)
# js (custom js for owl)

===================

# responsive translate inside constructor
~~~php
$this->rt_translate = array(
  'cols'  => array(
    '12' => esc_html__( '1 Col', 'koncreate-core' ),
    '6'  => esc_html__( '2 Col', 'koncreate-core' ),
    '4'  => esc_html__( '3 Col', 'koncreate-core' ),
    '3'  => esc_html__( '4 Col', 'koncreate-core' ),
    '2'  => esc_html__( '6 Col', 'koncreate-core' ),
  ),
  'cols_slider'  => array(
    '1'  => __( '1 Col', 'metro-core' ),
    '2'  => __( '2 Col', 'metro-core' ),
    '3'  => __( '3 Col', 'metro-core' ),
    '4'  => __( '4 Col', 'metro-core' ),
    '5'  => __( '5 Col', 'metro-core' ),
    '6'  => __( '6 Col', 'metro-core' ),
  ),
);
~~~

# responsive option panel
~~~php
 // Responsive Columns for slider
array(
  'mode'    => 'section_start',
  'id'      => 'sec_responsive_slider',
  'condition' => array( 'style' => array( 'style6' ) ),
  'label'   => __( 'Number of Responsive Columns for slider', 'metro-core' ),
),
array(
  'type'    => Controls_Manager::SELECT2,
  'id'      => 'col_lg_slider',
  'label'   => __( 'Desktops: > 1199px', 'metro-core' ),
  'options' => $this->rt_translate['cols_slider'],
  'default' => '3',
),
array(
  'type'    => Controls_Manager::SELECT2,
  'id'      => 'col_md_slider',
  'label'   => __( 'Desktops: > 991px', 'metro-core' ),
  'options' => $this->rt_translate['cols_slider'],
  'default' => '3',
),
array(
  'type'    => Controls_Manager::SELECT2,
  'id'      => 'col_sm_slider',
  'label'   => __( 'Tablets: > 767px', 'metro-core' ),
  'options' => $this->rt_translate['cols_slider'],
  'default' => '3',
),
array(
  'type'    => Controls_Manager::SELECT2,
  'id'      => 'col_xs_slider',
  'label'   => __( 'Phones: < 768px', 'metro-core' ),
  'options' => $this->rt_translate['cols_slider'],
  'default' => '1',
),
array(
  'type'    => Controls_Manager::SELECT2,
  'id'      => 'col_mobile_slider',
  'label'   => __( 'Small Phones: < 480px', 'metro-core' ),
  'options' => $this->rt_translate['cols_slider'],
  'default' => '1',
),
array(
  'mode' => 'section_end',
),
~~~

# slider option (like auto play, delay)
~~~php
// Slider options
array(
  'mode'        => 'section_start',
  'id'          => 'sec_slider',
  'condition' => array( 'style' => array( 'style6' ) ),
  'label'       => __( 'Slider Options', 'metro-core' ),
),
array(
  'type'        => Controls_Manager::SWITCHER,
  'id'          => 'slider_autoplay',
  'label'       => __( 'Autoplay', 'metro-core' ),
  'label_on'    => __( 'On', 'metro-core' ),
  'label_off'   => __( 'Off', 'metro-core' ),
  'default'     => 'yes',
  'description' => __( 'Enable or disable autoplay. Default: On', 'metro-core' ),
),
array(
  'type'        => Controls_Manager::SWITCHER,
  'id'          => 'slider_stop_on_hover',
  'label'       => __( 'Stop on Hover', 'metro-core' ),
  'label_on'    => __( 'On', 'metro-core' ),
  'label_off'   => __( 'Off', 'metro-core' ),
  'default'     => 'yes',
  'description' => __( 'Stop autoplay on mouse hover. Default: On', 'metro-core' ),
  'condition'   => array( 'slider_autoplay' => 'yes' ),
),
array(
  'type'    => Controls_Manager::SELECT2,
  'id'      => 'slider_interval',
  'label'   => __( 'Autoplay Interval', 'metro-core' ),
  'options' => array(
    '5000' => __( '5 Seconds', 'metro-core' ),
    '4000' => __( '4 Seconds', 'metro-core' ),
    '3000' => __( '3 Seconds', 'metro-core' ),
    '2000' => __( '2 Seconds', 'metro-core' ),
    '1000' => __( '1 Second',  'metro-core' ),
  ),
  'default' => '5000',
  'description' => __( 'Set any value for example 5 seconds to play it in every 5 seconds. Default: 5 Seconds', 'metro-core' ),
  'condition'   => array( 'slider_autoplay' => 'yes' ),
),
array(
  'type'    => Controls_Manager::NUMBER,
  'id'      => 'slider_autoplay_speed',
  'label'   => __( 'Autoplay Slide Speed', 'metro-core' ),
  'default' => 200,
  'description' => __( 'Slide speed in milliseconds. Default: 200', 'metro-core' ),
  'condition'   => array( 'slider_autoplay' => 'yes' ),
),
array(
  'type'        => Controls_Manager::SWITCHER,
  'id'          => 'slider_loop',
  'label'       => __( 'Loop', 'metro-core' ),
  'label_on'    => __( 'On', 'metro-core' ),
  'label_off'   => __( 'Off', 'metro-core' ),
  'default'     => 'yes',
  'description' => __( 'Loop to first item. Default: On', 'metro-core' ),
),
array(
  'mode' => 'section_end',
),
~~~

# generating data (for making json)
~~~php
$data = $this->get_settings();
$uniqueid = uniqid();
$owl_data = array(
  'nav'                => true,
  'navText'            => ['<i class="flaticon-left-arrow" aria-hidden="true"></i>', '<i class="flaticon-right-arrow" aria-hidden="true"></i>'],
  'navContainer'       => '#'.$uniqueid,
  'dots'               => false,
  'autoplay'           => $data['slider_autoplay'] == 'yes' ? true : false,
  'autoplayTimeout'    => $data['slider_interval'],
  'autoplaySpeed'      => $data['slider_autoplay_speed'],
  'autoplayHoverPause' => $data['slider_stop_on_hover'] == 'yes' ? true : false,
  'loop'               => $data['slider_loop'] == 'yes' ? true : false,
  'margin'             => 30,
  'responsive'         => array(
    '0'    => array(
      'items' => $data['col_mobile_slider'],
      'nav'   => true,
      'dots'  => false,
    ),
    '480'  => array(
      'items' => $data['col_xs_slider'],
      'nav'   => true,
      'dots'  => false,
    ),
    '768'  => array(
      'items' => $data['col_sm_slider'],
      'nav'   => true,
      'dots'  => false,
    ),
    '992'  => array(
      'items' => $data['col_md_slider'],
      'nav'   => true,
      'dots'  => false,
    ),
    '1200' => array(
      'items' => $data['col_lg_slider'],
      'nav'   => true,
      'dots'  => false,
    ),
  )
);
$data['owl_data'] = json_encode( $owl_data );
$data['uniqueid'] = $uniqueid;
~~~

# view (for adding json and uniqueid)
~~~php
<div id="<?php echo esc_attr( $data['uniqueid'] ); ?>" class="smart-nav-layout3"></div>
<div class="owl-theme owl-carousel rt-owl-carousel" data-carousel-options="<?php echo esc_attr( $data['owl_data'] );?>">
  <?php foreach ($posts as $post): ?><?php endforeach; ?>
</div>
~~~

# js (custom js for owl)

~~~js
// forked owl carousel stuff from metro
if (typeof $.fn.owlCarousel == 'function') {
 $(".owl-custom-nav .owl-next").on('click', function () {
   $(this).closest('.owl-wrap').find('.owl-carousel').trigger('next.owl.carousel');
 });
 $(".owl-custom-nav .owl-prev").on('click', function () {
   $(this).closest('.owl-wrap').find('.owl-carousel').trigger('prev.owl.carousel');
 });
 $(".rt-owl-carousel").each(function () {
   var options = $(this).data('carousel-options');
   $(this).owlCarousel(options);
 });
}
~~~
