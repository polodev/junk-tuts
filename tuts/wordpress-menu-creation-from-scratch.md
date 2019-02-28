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
~~~css
/* Main Navigation */

.hover_style_1 {
  li a {
  // animation: none;
  &:before, &:after {
    height: 3px;
    position: absolute;
    content: '';
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    background-color: @primaryColor;
    width: 0;
  }
  &:before {
    top: 0;
    left: 0;
  }
  &:after {
    bottom: 0;
    right: 0;
  }
  &:hover{
    color: inherit;
     &:before, &:after {
        width: 100%;
      }
    }
  }
}

.hover_style_2 {
  li {
    display: inline-block;
    list-style: outside none none;
    margin: 0 1.5em;
    padding: 0;
  }
  li a {
    padding: 0.5em 0;
    color: #111;
    position: relative;
    letter-spacing: 1px;
    text-decoration: none;
  }
  li a:before,
  li a:after {
    position: absolute;
    -webkit-transition: all 0.35s ease;
    transition: all 0.35s ease;
  }
  li a:before {
    top: 0;
    display: block;
    height: 3px;
    width: 0%;
    content: "";
    background-color: @primaryColor;
  }
  li a:after {
    left: 0;
    top: 0;
    padding: 0.5em 0;
    position: absolute;
    content: attr(data-hover);
    color: #111;
    white-space: nowrap;
    max-width: 0%;
    overflow: hidden;
  }
  li a:hover:before,
  li .current a:before {
    opacity: 1;
    width: 100%;
  }
  li a:hover:after,
  li .current a:after {
    max-width: 100%;
  }
}

.hover_style_3 {
  li {
    display: inline-block;
    list-style: outside none none;
    margin: 0 1.5em;
    padding: 0;
  }
  li a {
    padding: 0.5em 0;
    color: #111;
    position: relative;
    letter-spacing: 1px;
    text-decoration: none;
  }
  li a:before,
  li a:after {
    position: absolute;
    -webkit-transition: all 0.35s ease;
    transition: all 0.35s ease;
  }
  li a:before {
    bottom: 0;
    display: block;
    height: 3px;
    width: 0%;
    content: "";
    background-color: @primaryColor;
  }
  li a:after {
    left: 0;
    top: 0;
    padding: 0.5em 0;
    position: absolute;
    content: attr(data-hover);
    color: #111;
    white-space: nowrap;
    max-width: 0%;
    overflow: hidden;
  }
  li a:hover:before {
    opacity: 1;
    width: 100%;
  }
  li a:hover:after,
  li .current a:after {
    max-width: 100%;
  }

}


.main-header {
    background-color: #fff;
    transition: all 0.3s ease-out;
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

           nav > ul > li > a {
              text-transform: uppercase;
            }

            ul {
                transition: all 0.3 ease-out 0s;
                @media all and (max-width: 767.98px) {
                    text-align: center;
                }
                li {
                    display: inline-block;
                    position: relative;
                    a {


                        &:hover {
                            animation: toBottomFromTop10 0.3s forwards;
                            color: @primaryColor;
                            @keyframes toBottomFromTop10 {
                                49% {
                                    transform: translateY(10%);
                                }
                                50% {
                                    opacity: 0;
                                    transform: translateY(-10%);
                                }
                                51% {
                                    opacity: 1;
                                }
                            }
                        }



                        display: block;
                        position: relative;
                        text-decoration: none;
                        font-weight: 500;
                        transition: all 0.3s ease-out;
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
                    background-color: @primaryColor;
                    z-index: 10;
                    transition: all 0.3s ease-out;
                }
                &.menu > li > a:hover {
                    animation: toBottomFromTop10 0.3s forwards;
                }
                &.menu > li:hover > a:after {
                    opacity: 1;
                    visibility: visible;
                    transition: all 0.3s ease-out;
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
        border-top: 1px solid @primaryColor;
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
            &:hover > a {
                background-color: @primaryColor;
                color: #fff;
            }
            &:last-child {
                border-bottom: none;
            }
            a {
                display: block;
                color: #111;
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
        padding-top: 0;
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
        width: inherit;
        display: flex;
        transform: translateX(-50%);
        left: 50%;
        > li {
            display: block;
            float: left;
            margin-right: 10px;
            &:last-child {
              margin: 0;
            }
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
                    &:hover {
                      a {
                        background: inherit;
                        color: inherit;
                      }
                    }
                }
                // hover style inside submenu
                // it contains li a before&after
                .hover_style_1();



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

