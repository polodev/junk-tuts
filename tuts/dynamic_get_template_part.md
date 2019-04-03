## get_post_format()

    <div class="blog-details">
      <?php while(have_posts()): the_post(); get_template_part( 'template-parts/blog/content-single', get_post_format() ); ?>
          <?php if ( comments_open() || get_comments_number() ): ?>
              <div class="comments-wrapper">
               <?php comments_template(); ?>
              </div>
          <?php endif ?>
      <?php endwhile; ?>
    </div>

