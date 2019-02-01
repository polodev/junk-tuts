# how to add comments in wp theme

we have to have `comments.php` in our theme root.
~~~php

if ( comments_open() || get_comments_number() ){
  ?>

  <div class="comments-wrapper">
   <?php comments_template(); ?>
  </div>

   <?php

}
~~~

# content inside `comments.php`
~~~php
<?php
/**
 * @author  RadiusTheme
 * @since   1.0
 * @version 1.0
 */

namespace radiustheme\Koncreate;

if ( post_password_required() ) {
    return;
}

if ( !have_comments() && !comments_open() ) {
    return;
}


$comments_number = get_comments_number();
$comments_text   = $comments_number < 2 ? esc_html__( 'Comment' , 'koncreate' ) : esc_html__( 'Comments' , 'koncreate' );
$zero_or_not   = $comments_number < 10 ? esc_html__( '0' , 'koncreate' ) : '';
$comments_html   = 'Comments ('. $zero_or_not . number_format_i18n( $comments_number ) .')';
$has_avatar      = get_option( 'show_avatars' );
$comment_class   = !$has_avatar ? ' avatar-disabled' : '';
$comment_args    = array(
    'callback'     => 'radiustheme\Koncreate\Helper::comments_callback',
    'reply_text'   => esc_html__( 'Reply', 'koncreate' ),
    'avatar_size'  => 100,
    'style'        => 'ul',
);


function move_comment_form_below( $fields ) {
    $comment_field = $fields['comment'];
    unset( $fields['comment'] );
    $fields['comment'] = $comment_field;
    return $fields;
}
add_filter( 'comment_form_fields', Constants::$theme_namespace . 'move_comment_form_below' );

$rdtheme_commenter = wp_get_current_commenter();
$rdtheme_req       = get_option( 'require_name_email' );
$rdtheme_aria_req  = ( $rdtheme_req ? " required" : '' );

$comment_form_fields =  array(
    'author' =>
    '<div class="row gutters-15"><div class="col-sm-4"><div class="form-group comment-form-author"><input type="text" id="author" name="author" value="' . esc_attr( $rdtheme_commenter['comment_author'] ) . '" placeholder="'.esc_attr__( 'Name', 'koncreate' ).( $rdtheme_req ? ' *' : '' ).'" class="form-control"' . $rdtheme_aria_req . '></div></div>',

    'email' =>
    '<div class="col-sm-4 comment-form-email"><div class="form-group"><input id="email" name="email" type="email" value="' . esc_attr(  $rdtheme_commenter['comment_author_email'] ) . '" class="form-control" placeholder="'.esc_attr__( 'Email', 'koncreate' ).( $rdtheme_req ? ' *' : '' ).'"' . $rdtheme_aria_req . '></div></div>',

    'url' =>
    '<div class="col-sm-4 comment-form-website"><div class="form-group"><input id="website" name="website" type="text" value="' . esc_attr(  $rdtheme_commenter['comment_author_url'] ) . '" class="form-control" placeholder="'.esc_attr__( 'Website', 'koncreate' ).( $rdtheme_req ? '' : '' ).'"' . $rdtheme_aria_req . '></div></div></div>',
);

$comment_form_args = array(
    'title_reply'=>'<h3 class="title title-bar-xl1">Leave a Messgage</h3>',

    'class_submit'  => 'submit btn-send',
    'submit_field'  => '<div class="form-group form-submit">%1$s %2$s</div>',
    // 'submit_field'  => '<div class="form-group form-submit"><button class="item-btn" type="submit">Post Comment</button></div>',
    'comment_field' =>  '<div class="form-group comment-form-comment"><textarea id="comment" name="comment" required placeholder="'.esc_attr__( 'Comment *', 'koncreate' ).'" class="textarea form-control" rows="10" cols="40"></textarea></div>',
    'fields' => apply_filters( 'comment_form_default_fields', $comment_form_fields ),
);
?>

<div id="comments" class="comments-area">
    <?php if ( have_comments() ): ?>
        <h3 class="title title-bar-xl1"><?php echo esc_html( $comments_html );?></h3>

        <ul class="comment-list<?php echo esc_attr( $comment_class );?>">
          <?php wp_list_comments( $comment_args ); ?>
        </ul>

        <?php the_comments_navigation(); ?>

    <?php endif;?>

    <?php if ( comments_open() ) : ?>
        <?php
        comment_form( $comment_form_args );
         ?>
    <?php else: ?>

        <div class="comments-closed"><?php esc_html_e( 'Comments are closed.', 'koncreate' ); ?></div>
    <?php endif;?>
</div>

~~~

# comments callback (comments-callback.php)

~~~php
<?php
/**
 * @author  RadiusTheme
 * @since   1.0
 * @version 1.0
 */

namespace radiustheme\Koncreate;

$date = get_comment_date( '', $comment );
$time = get_comment_time();
$human_time = human_time_diff( get_comment_time( 'U' ), current_time( 'timestamp' ) );
?>
<?php $tag = ( 'div' === $args['style'] ) ? 'div' : 'li';?>
<<?php echo esc_html( $tag ); ?> id="comment-<?php comment_ID(); ?>" <?php comment_class( $args['has_children'] ? 'parent main-comments' : 'main-comments', $comment ); ?>>

<div id="respond-<?php comment_ID(); ?>" class="each-comment media">

  <?php if ( get_option( 'show_avatars' ) ): ?>
    <div class="pull-left imgholder">
      <?php if ( 0 != $args['avatar_size'] ) echo get_avatar( $comment, $args['avatar_size'], "", false, array( 'class'=>'media-object' ) ); ?>
    </div>
  <?php endif; ?>

  <div class="media-body comments-body">
    <div class="comment-meta clearfix">
      <div class="comment-meta-left">
        <h3 class="comment-author"><?php echo get_comment_author_link( $comment );?></h3>
        <div class="comment-time"><?php printf( esc_html__( ' %1$s / %2$s ago', 'classipost'),  $date, $human_time);?></div>
      </div>
      <?php
      comment_reply_link(
        array_merge( $args, array(
          'add_below' => 'respond',
          'depth'     => $depth,
          'max_depth' => $args['max_depth'],
          'before'    => '<div class="reply-area">',
          'after'     => '</div>'
          ) )
      );
      ?>
    </div>
    <div class="comment-text">
      <?php if ( '0' == $comment->comment_approved ) : ?>
        <p class="comment-awaiting-moderation"><?php esc_html_e( 'Your comment is awaiting moderation.', 'classipost' ); ?></p>
      <?php endif; ?>
      <?php comment_text(); ?>
    </div>
  </div>
  <div class="clear"></div>
</div>

~~~


# for placing textarea comments box in bottom
~~~php
function move_comment_form_below( $fields ) {
    $comment_field = $fields['comment'];
    unset( $fields['comment'] );
    $fields['comment'] = $comment_field;
    return $fields;
}
add_filter( 'comment_form_fields', Constants::$theme_namespace . 'move_comment_form_below' );

~~~

# adding conditional_scripts for reply

~~~php
private function conditional_scripts(){
  if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
    wp_enqueue_script( 'comment-reply' );
  }
}
~~~
