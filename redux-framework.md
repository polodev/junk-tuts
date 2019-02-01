
# field type

* section
* image_select
* switch
* color
* button_set
* media
* text
* textarea
* gallery
* select
* slider
* checkbox
* typography

## section

~~~php
array(
    'id'       => 'section-color-sitewide',
    'type'     => 'section',
    'title'    => esc_html__( 'Sitewide Colors', 'koncreate' ),
    'indent'   => true,
),
~~~


## media
( for uploading image)
~~~php
array(
    'id'       => 'logo',
    'type'     => 'media',
    'title'    => esc_html__( 'Main Logo', 'koncreate' ),
    'default'  => array(
        'url'=> URI_Helper::get_img( 'logo-dark.png' )
    ),
),
~~~

## select

~~~php
array(
    'id'       => 'logo_width',
    'type'     => 'select',
    'title'    => esc_html__( 'Logo Area Width', 'koncreate'),
    'subtitle' => esc_html__( 'Width is defined by the number of bootstrap columns. Please note, navigation menu width will be decreased with the increase of logo width', 'koncreate' ),
    'options'  => array(
        '1' => esc_html__( '1 Column', 'koncreate' ),
        '2' => esc_html__( '2 Column', 'koncreate' ),
        '3' => esc_html__( '3 Column', 'koncreate' ),
        '4' => esc_html__( '4 Column', 'koncreate' ),
    ),
    'default'  => '3',
),
~~~


## switch

for basic switch like enable and disable
~~~php

array(
    'id'       => 'breadcrumb',
    'type'     => 'switch',
    'title'    => esc_html__( 'Breadcrumb', 'koncreate' ),
    'on'       => esc_html__( 'Enabled', 'koncreate' ),
    'off'      => esc_html__( 'Disabled', 'koncreate' ),
    'default'  => true,
),
~~~

## text

~~~php

array(
    'id'       => 'team_slug',
    'type'     => 'text',
    'title'    => esc_html__( 'Team Slug', 'builder' ),
    'subtitle' => esc_html__( 'Will be used in URL', 'builder' ),
    'default'  => 'team',
),
~~~

## button_set
~~~php
array(
    'id'       => $prefix. '_layout',
    'type'     => 'button_set',
    'title'    => esc_html__( 'Layout', 'koncreate' ),
    'options'  => array(
        'left-sidebar'  => esc_html__( 'Left Sidebar', 'koncreate' ),
        'full-width'    => esc_html__( 'Full Width', 'koncreate' ),
        'right-sidebar' => esc_html__( 'Right Sidebar', 'koncreate' ),
    ),
    'default'  => 'right-sidebar'
),
~~~



## slider

~~~php
array(
    'id'       => 'resmenu_width',
    'type'     => 'slider',
    'title'    => esc_html__( 'Responsive Header Screen Width', 'koncreate' ),
    'subtitle' => esc_html__( 'Screen width in which mobile menu activated. Recommended value is: 992', 'koncreate' ),
    'default'  => 992,
    'min'      => 0,
    'step'     => 1,
    'max'      => 2000,
),
~~~


## image_select

~~~php
array(
    'id'       => 'top_bar_style',
    'type'     => 'image_select',
    'title'    => esc_html__( 'Top Bar Layout', 'koncreate' ),
    'default'  => '1',
    'options' => array(
        '1' => array(
            'title' => '<b>'. esc_html__( 'Layout 1', 'koncreate' ) . '</b>',
            'img' => URI_Helper::get_img( 'top1.png' ),
        ),
        '2' => array(
            'title' => '<b>'. esc_html__( 'Layout 2', 'koncreate' ) . '</b>',
            'img' => URI_Helper::get_img( 'top2.png' ),
        ),
        '3' => array(
            'title' => '<b>'. esc_html__( 'Layout 3', 'koncreate' ) . '</b>',
            'img' => URI_Helper::get_img( 'top3.png' ),
        ),
    ),
    'required' => array( 'top_bar', '=', true )
),
~~~


## color

~~~php

array(
    'id'       => 'bgcolor',
    'type'     => 'color',
    'title'    => esc_html__( 'Banner Background Color', 'koncreate'),
    'validate' => 'color',
    'transparent' => false,
    'default' => '#606060',
    'required' => array( 'bgtype', 'equals', 'bgcolor' )
),
~~~

## textarea

~~~php
array(
    'id'       => 'copyright_text',
    'type'     => 'textarea',
    'title'    => esc_html__( 'Copyright Text', 'koncreate' ),
    'default'  => '&copy; Copyright Metro 2018. Designed and Developed by <a target="_blank" href="' . esc_url( Constants::$theme_author_uri ) . '">RadiusTheme</a>',
    'required' => array( 'copyright_area', 'equals', true )
),
~~~

## gallery ( for uploading gallery images)

~~~php
array(
    'id'       => 'payment_img',
    'type'     => 'gallery',
    'title'    => esc_html__( 'Payment Icons Gallery', 'koncreate' ),
    'required' => array( 'payment_icons', 'equals', true )
),
~~~

## checkbox

~~~php
array(
    'id'      => 'post_share',
    'type'    => 'checkbox',
    'class'   => 'redux-custom-inline',
    'title'   => esc_html__( 'Social Sharing Icons', 'koncreate'),
    'options' => array(
        'facebook'  => 'Facebook',
        'twitter'   => 'Twitter',
        'gplus'     => 'Google Plus',
        'linkedin'  => 'Linkedin',
        'pinterest' => 'Pinterest',
        'tumblr'    => 'Tumblr',
        'reddit'    => 'Reddit',
        'vk'        => 'Vk',
    ),
    'default' => array(
        'facebook'  => '1',
        'twitter'   => '1',
        'gplus'     => '1',
        'linkedin'  => '1',
        'pinterest' => '1',
        'tumblr'    => '0',
        'reddit'    => '0',
        'vk'        => '0',
    ),
    'required' => array( 'post_social', '=', true )
),
~~~

## typography

~~~php
array(
    'id'       => 'typo_body',
    'type'     => 'typography',
    'title'    => esc_html__( 'Body', 'koncreate' ),
    'text-align'  => false,
    'font-weight' => false,
    'color'   => false,
    'subsets'  => false,
    'default' => array(
        'google'      => true,
        'font-family' => 'Roboto',
        'font-weight' => '400',
        'font-size'   => '16px',
        'line-height' => '28px',
    ),
),
~~~

## set parent menu and sub menu

~~~php
// main option which will be viewed directly
Redux::setSection( $opt_name,
    array(
        'title' => esc_html__( 'Layout Defaults', 'koncreate' ),
        'id'    => 'layout_defaults',
        'icon'  => 'el el-th',
    )

// Page - sub option, which will be viewed under main option
$rdtheme_page_fields = rdtheme_redux_post_type_fields( 'page' ); // just for generating whole page
$rdtheme_page_fields[0]['default'] = 'full-width'; // replace - its a clever idea
Redux::setSection( $opt_name,
    array(
        'title'      => esc_html__( 'Page', 'koncreate' ),
        'id'         => 'pages_section',
        'subsection' => true,
        'fields'     => $rdtheme_page_fields
    )
);
// Error 404 Layout - sub section. here unset a field
$rdtheme_error_fields = rdtheme_redux_post_type_fields( 'error' );
unset($rdtheme_error_fields[0]);
Redux::setSection( $opt_name,
    array(
        'title'      => esc_html__( 'Error 404 Layout', 'koncreate' ),
        'id'         => 'error_section',
        'subsection' => true,
        'fields'     => $rdtheme_error_fields
    )
);
~~~


## conditionally loading option based on earlier option
#### + required option in field

~~~php

array(
    'id'       => 'bgtype',
    'type'     => 'button_set',
    'title'    => esc_html__( 'Banner Background Type', 'koncreate' ),
    'options'  => array(
        'bgcolor'  => esc_html__( 'Background Color', 'koncreate' ),
        'bgimg'    => esc_html__( 'Background Image', 'koncreate' ),
    ),
    'default' => 'bgcolor',
    'required' => array( 'banner', 'equals', true )
),
array(
    'id'       => 'bgcolor',
    'type'     => 'color',
    'title'    => esc_html__( 'Banner Background Color', 'koncreate'),
    'validate' => 'color',
    'transparent' => false,
    'default' => '#606060',
    'required' => array( 'bgtype', 'equals', 'bgcolor' )
),
array(
    'id'       => 'bgimg',
    'type'     => 'media',
    'title'    => esc_html__( 'Banner Background Image', 'koncreate' ),
    'default'  => array(
        'url'=> URI_Helper::get_img( 'banner.jpg' )
    ),
    'required' => array( 'bgtype', 'equals', 'bgimg' )
),
array(
    'id'       => 'bgopacity',
    'type'     => 'slider',
    'title'    => esc_html__( 'Banner Background Opacity (in %)', 'koncreate' ),
    'min'      => 0,
    'max'      => 100,
    'step'     => 1,
    'default'  => 70,
    'display_value' => 'label',
    'required' => array( 'bgtype', 'equals', 'bgimg' )
),
~~~
