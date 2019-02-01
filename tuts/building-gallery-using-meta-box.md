
~~~php
$gallery_ids  = get_post_meta( $post->ID, "{$prefix}_project_gallery", true );
$gallery_ids = explode(',', $gallery_ids);
$galleries = [];
foreach ($gallery_ids as $key) {
	$galleries[] = wp_get_attachment_url($key);
}

$galleries  = $galleries ? $galleries : array();

~~~

~~~php
<?php if(count($galleries)): ?>
    <div class="single-project-carousel">
        <div class="rc-carousel nav-control-layout3" >  
		  		<?php foreach ($galleries as $image): ?>
		          <div class="single-item">
		              <img src="<?php echo esc_attr($image) ?>" alt="Single Project" class="img-fluid">
		          </div>
		  		<?php endforeach ?>
        </div>
    </div>
<?php endif; ?>
~~~

