# tasklist
* register menu
* add menu in view
* add css
* make further customization


# register menu
~~~php
add_action( 'after_setup_theme',   array( $this, 'theme_setup' ) );
public function theme_setup() {
  register_nav_menus( array(
    'primary'  => esc_html__( 'Primary', 'koncreate' ),
    'topright' => esc_html__( 'Header Right', 'koncreate' ),
    'bottom' => esc_html__( 'Bottom Menu', 'koncreate' ),
  ) );
}

~~~

# add menu in view
~~~php
<header class='main-header'>
.......
  <div class="main-navigation-area">
    <div class="main-navigation">
      <?php
        $nav_menu_args = Helper::nav_menu_args2();
        wp_nav_menu($nav_menu_args);
       ?>
    </div>
  </div
.......
</header>
~~~
~~~php
  public static function nav_menu_args2(){
    $prefix   = Constants::$theme_prefix ;
    $pagemenu = false;
    if ( ( is_single() || is_page() ) ) {
      $menuid = get_post_meta( get_the_id(), "{$prefix}_page_menu", true );
      if ( !empty( $menuid ) && $menuid != 'default' ) {
        $pagemenu = $menuid;
      }
    }
    $common_args = [
      'container' => 'nav',
      // 'container_id' => 'dropdown',
      // 'container_class' => 'main-navigation-area',
      'fallback_cb' => false,
       ];
    if ( $pagemenu ) {
      $nav_menu_args = array( 'menu' => $pagemenu);
    }
    else {
      $nav_menu_args = array( 'theme_location' => 'primary');
    }
    $nav_menu_args = array_merge($nav_menu_args, $common_args);
    return $nav_menu_args;
  }
~~~

# add css
~~~
/* Main Navigation */
.main-header {
    background-color: #fff;
    transition: all 0.5s ease-out;
    ul {
        .ul0();
    }
    .main-navigation-area {
        min-height: 90px;
        display: flex;
        align-items: center;
        @media all and (max-width: 767.98px) {
            display: block !important;
            text-align: center;
        }
        .main-navigation {
            flex: 1;
            ul {
                transition: all 0.5 ease-out 0s;
                @media all and (max-width: 767.98px) {
                    text-align: center;
                }
                li {
                    display: inline-block;
                    position: relative;
                    a {
                        display: block;
                        position: relative;
                        text-decoration: none;
                        font-weight: 500;
                        transition: all 0.5s ease-out;
                        color: #111111;
                        padding: 32px 15px;
                        @media all and (max-width: 1199.98px) {
                            padding-left: 12px;
                            padding-right: 12px;
                        }
                    }
                }
                &.menu > li.menu-item-has-children:after {
                    color: #111;
                    content: "\f107";
                    font-family: FontAwesome;
                    font-size: 13px;
                    position: absolute;
                    right: 2px;
                    bottom: 40px;
                    line-height: 1;
                }
                &.menu > li > a:after {
                    opacity: 0;
                    visibility: hidden;
                    position: absolute;
                    content: "";
                    height: 2px;
                    width: 63%;
                    width: calc(~"100% - "40px);
                    left: 20px;
                    bottom: 0;
                    background-color: #111111;
                    z-index: 10;
                    transition: all 0.1s ease-out;
                }
                &.menu > li > a:hover {
                    animation: toBottomFromTop10 0.3s forwards;
                }
                &.menu > li:hover > a:after {
                    opacity: 1;
                    visibility: visible;
                    transition: all 0.5s ease-out;
                }
                &.menu > li.current-menu-item > a,
                &.menu > li.current > a {
                    // color: @primaryColor;
                }
            }
        }
    }
}

/* Submenu */
.main-header .main-navigation-area .main-navigation ul {
    > li > ul {
        border-top: 1px solid #111111;
        ul {
            border: none;
        }
    }
    li ul {
        left: 0;
        opacity: 0;
        visibility: hidden;
        transform: scaleY(0);
        position: absolute;
        top: 100%;
        background-color: #fff;
        padding-top: 20px;
        padding-bottom: 20px;
        transform-origin: 0 0 0;
        transition: all 0.3s ease 0s;
        z-index: 99 !important;
        width: 210px;
        text-align: left;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
        &.sub-menu li.menu-item-has-children:after {
            color: #111;
            content: "\f105";
            font-family: FontAwesome;
            font-size: 16px;
            position: absolute;
            right: 25px;
            top: 9px;
        }
        li {
            display: block;
            padding: 0 20px;
            &:hover > a {
                background-color: #222;
                color: #fff;
            }
            &:last-child {
                border-bottom: none;
            }
            a {
                display: block;
                color: #111;
                border-radius: 4px;
                padding: 10px 15px !important;
            }
        }
    }
    > li:hover > ul {
        opacity: 1;
        visibility: visible;
        transform: scaleY(1);
    }
}

/* 3rd Level Menu */
.main-header .main-navigation-area .main-navigation ul {
    li ul li ul {
        left: 211px;
        top: 0;
        width: 210px;
    }
    > li > ul > li:hover > ul {
        opacity: 1;
        visibility: visible;
        transform: scaleY(1);
    }
}

/* Multi Column Menu */
.main-header .main-navigation-area .main-navigation ul li.mega-menu {
    &:hover ul {
        opacity: 1;
        visibility: visible;
        transform: scaleY(1);
    }
    > ul.sub-menu {
        background-color: #fff;
        padding: 10px 0;
        width: 460px;
        > li {
            display: block;
            float: left;
            margin: 0 5px;
            width: 210px;
            border: none;
            > a {
                background-color: #222;
                color: #fff;
                border-bottom: 1px solid rgba(255,255,255,.3);
            }
            ul {
                position: relative;
                width: 100%;
                left: inherit;
                box-shadow: none;
                background: inherit;
                li {
                    padding: 0;
                }
            }
        }
        li:after {
            content: '';
        }
    }
    &.hide-header > ul.sub-menu > li > a {
        display: none;
    }
}

/* Mobile Multi Column Menu */
.mean-container .mega-menu.hide-header > ul > li {
    border-top: none;
    > a {
        display: none;
    }
    > ul {
        display: block !important;
    }
}

~~~


# make further customization

customize as like as you want
