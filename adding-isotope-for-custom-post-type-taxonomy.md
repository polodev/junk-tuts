[helpful tutorial](https://www.aliciaramirez.com/2014/03/integrating-isotope-with-wordpress/)
~~~php
<?php

/**
 * @author  RadiusTheme
 * @since   1.0
 * @version 1.0
 */

namespace radiustheme\Koncreate;
$prefix        = Constants::$theme_prefix;
$thumb_size  = "{$prefix}-size2"; // _use_later
$thumb = esc_url( helper::get_img( 'noimage.jpg' ) );
?>

<section class="project-wrap-layout4">
    <div class="container">
        <div class="isotope-wrap">
            <div class="text-center">
                <div class="isotope-classes-tab isotop-btn1">
                    <a class="current nav-item" data-filter="*">All Projects</a>
                    <?php
                      $terms = get_terms( $prefix . '_project_category' );
                      $count = count( $terms );
                     ?>
                     <?php if ( $count ): ?>
                      <?php foreach ( $terms as $term ): ?>
                        <a class="nav-item" data-filter=".<?php echo esc_attr($term->slug); ?>"><?php echo esc_html( $term->name );  ?></a>
                      <?php endforeach ?>
                     <?php endif ?>
                </div>
            </div>
            <div class="row featuredContainer">

              <?php
              while(have_posts()):
                the_post();
                $terms_array = get_the_terms( get_the_ID(), $prefix . '_project_category' );
                $term_string = '';
                foreach ($terms_array as $term) {
                  $term_string .= $term->slug . ' ';
                }

                if ( has_post_thumbnail() ){
                  $thumb = get_the_post_thumbnail_url();
                }
               ?>
                <div class="col-lg-4 col-md-6 col-sm-6 col-12 <?php echo esc_attr($term_string); ?>">
                    <div class="project-box-layout2">
                        <div class="item-img">
                            <img src="<?php echo esc_attr($thumb); ?>" alt="Project">
                            <div class="item-btn-wrap1">
                                <a href="<?php the_permalink(); ?>" class="item-btn"><i class="flaticon-link-interface-symbol-of-chain-in-diagonal"></i></a>
                            </div>
                        </div>
                        <div class="item-content">
                            <h3 class="title text-row-1">
                                <a href="#"><?php the_title(); ?></a>
                            </h3>
                            <?php if ($project_type  = get_post_meta( get_the_ID(), "{$prefix}_project_type", true )): ?>
                              <span class="subtitle"><?php echo esc_html($project_type); ?></span>
                            <?php endif ?>
                        </div>
                    </div>
                </div>
              <?php endwhile;  ?>


            </div>
        </div>
    </div>
</section>

~~~
