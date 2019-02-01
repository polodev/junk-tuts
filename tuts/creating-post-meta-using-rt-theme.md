# getting instance and calling add_meta_box

~~~php
$Postmeta = RT_Postmeta::getInstance();
// add_meta_box rt theme custom functions which last arguments is fields
$Postmeta->add_meta_box( $id, $title, $post_types, $callback = '', $context = '', $priority = '', $fields = '' );
~~~

# fields
type: array
all key will be array like following

## select
~~~php
"{$prefix}_layout" => array(
  'label'   => __( 'Layout', 'koncreate-core' ),
  'type'    => 'select',
  'options' => array(
    'default'       => __( 'Default', 'koncreate-core' ),
    'full-width'    => __( 'Full Width', 'koncreate-core' ),
    'left-sidebar'  => __( 'Left Sidebar', 'koncreate-core' ),
    'right-sidebar' => __( 'Right Sidebar', 'koncreate-core' ),
  ),
  'default'  => 'default',
),
~~~


## image
~~~php
"{$prefix}_banner_bgimg" => array(
  'label' => __( 'Banner Background Image', 'koncreate-core' ),
  'type'  => 'image',
  'desc'  => __( 'If not selected, default will be used', 'koncreate-core' ),
),
~~~

## color_picker
~~~php
"{$prefix}_banner_bgcolor" => array(
  'label' => __( 'Banner Background Color', 'koncreate-core' ),
  'type'  => 'color_picker',
  'desc'  => __( 'If not selected, default will be used', 'koncreate-core' ),
),
~~~

## text
~~~php
'skill_name' => array(
  'label' => __( 'Skill Name', 'koncreate-core' ),
  'type'  => 'text',
  'desc'  => __( 'eg. Marketing', 'koncreate-core' ),
),
~~~

## header
~~~php
"{$prefix}_team_socials_header" => array(
  'label' => __( 'Socials', 'koncreate-core' ),
  'type'  => 'header',
  'desc'  => __( 'Enter your social links here', 'koncreate-core' ),
),
~~~



## repeater ( will have nested field)

~~~php
"{$prefix}_team_skill" => array(
  'type'  => 'repeater',
  'button' => __( 'Add New Skill', 'koncreate-core' ),
  'value'  => array(
    'skill_name' => array(
      'label' => __( 'Skill Name', 'koncreate-core' ),
      'type'  => 'text',
      'desc'  => __( 'eg. Marketing', 'koncreate-core' ),
    ),
    'skill_value' => array(
      'label' => __( 'Skill Percentage (%)', 'koncreate-core' ),
      'type'  => 'text',
      'desc'  => __( 'eg. 75', 'koncreate-core' ),
    ),
    'skill_color' => array(
      'label' => __( 'Skill Color', 'koncreate-core' ),
      'type'  => 'color_picker',
      'desc'  => __( 'If not selected, primary color will be used', 'koncreate-core' ),
    ),
  )
),
~~~

## group

~~~php
"{$prefix}_team_socials" => array(
  'type'  => 'group',
  'value'  => Helper::team_socials()
),

public static function team_socials(){
  $team_socials = array(
    'facebook' => array(
      'label' => __( 'Facebook', 'builder' ),
      'type'  => 'text',
      'icon'  => 'fa-facebook',
    ),
    'twitter' => array(
      'label' => __( 'Twitter', 'builder' ),
      'type'  => 'text',
      'icon'  => 'fa-twitter',
    ),
    'linkedin' => array(
      'label' => __( 'Linkedin', 'builder' ),
      'type'  => 'text',
      'icon'  => 'fa-linkedin',
    ),
    'gplus' => array(
      'label' => __( 'Google Plus', 'builder' ),
      'type'  => 'text',
      'icon'  => 'fa-google-plus',
    ),
    'youtube' => array(
      'label' => __( 'Youtube', 'builder' ),
      'type'  => 'text',
      'icon'  => 'fa-youtube-play',
    ),
    'pinterest' => array(
      'label' => __( 'Pinterest', 'builder' ),
      'type'  => 'text',
      'icon'  => 'fa-pinterest-p',
    ),
    'instagram' => array(
      'label' => __( 'Instagram', 'builder' ),
      'type'  => 'text',
      'icon'  => 'fa-instagram',
    ),
    'github' => array(
      'label' => __( 'Github', 'builder' ),
      'type'  => 'text',
      'icon'  => 'fa-github',
    ),
    'stackoverflow' => array(
      'label' => __( 'Stackoverflow', 'builder' ),
      'type'  => 'text',
      'icon'  => 'fa-stack-overflow',
    ),
  );

  return apply_filters( 'team_socials', $team_socials );
}
~~~



