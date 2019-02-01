# helper class for all socials item

~~~php
public static function socials(){
    $rdtheme_socials = array(
      'social_facebook' => array(
        'icon' => 'fab fa-facebook-f',
        'url'  => RDTheme::$options['social_facebook'],
      ),
      'social_twitter' => array(
        'icon' => 'fab fa-twitter',
        'url'  => RDTheme::$options['social_twitter'],
      ),
      'social_gplus' => array(
        'icon' => 'fab fa-google-plus-g',
        'url'  => RDTheme::$options['social_gplus'],
      ),
      'social_linkedin' => array(
        'icon' => 'fab fa-linkedin-in',
        'url'  => RDTheme::$options['social_linkedin'],
      ),
      'social_youtube' => array(
        'icon' => 'fab fa-youtube',
        'url'  => RDTheme::$options['social_youtube'],
      ),
      'social_pinterest' => array(
        'icon' => 'fab fa-pinterest',
        'url'  => RDTheme::$options['social_pinterest'],
      ),
      'social_instagram' => array(
        'icon' => 'fab fa-instagram',
        'url'  => RDTheme::$options['social_instagram'],
      ),
      'social_rss' => array(
        'icon' => 'fas fa-rss',
        'url'  => RDTheme::$options['social_rss'],
      ),
    );
    return array_filter( $rdtheme_socials, array( __CLASS__ , 'filter_social' ) );
  }

  public static function filter_social( $args ){
    return ( $args['url'] != '' );
  }
~~~

# generating in view

 ~~~php
<div class="col-lg-4 header-social-layout1">
  <?php
    $socials = Helper::socials();
    if ($socials) :
   ?>
     <ul>
      <?php foreach ($socials as $social): ?>
          <li>
              <a href="<?php echo esc_url($social['url']) ?>">
                  <i class="<?php echo esc_attr($social['icon']) ?>"></i>
              </a>
          </li>
      <?php endforeach ?>
     </ul>
   <?php endif; ?>

</div>
 ~~~
