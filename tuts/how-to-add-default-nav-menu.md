
~~~php
public static function default_top_bar_menu() 
  {
echo '<nav id="dropdown">
	<ul>
		<li> <a href="#">Home</a> </li>
		<li> <a href="#">About</a> </li>
		<li> <a href="#">Contact</a> </li>
	  <li>
	      <a href="#">Project</a>
	      <ul class="dropdown-menu-col-1">
	          <li>
	              <a href="service.html">Project 1</a>
	          </li>
	          <li>
	              <a href="service1.html">Project 2</a>
	          </li>
	          <li>
	              <a href="#" class="third-level-arrow">Third Level</a>
	              <ul class="third-level">
	                  <li>
	                      <a href="#">Third Level 1</a>
	                  </li>
	                  <li>
	                      <a href="#">Third Level 2</a>
	                  </li>
	                  <li>
	                      <a href="#">Third Level 3</a>
	                  </li>
	              </ul>
	          </li>
	      </ul>
	  </li>
	</ul>
</nav>'
  }
~~~

~~~php
public function nav_menu_args2()
{
	$common_args = [
		'container' => 'nav',
		'container_id' => 'dropdown',
		'fallback_cb' => array( __CLASS__ , 'default_top_bar_menu' ),
		'walker' => new My_Walker_Nav_Menu()
	];
	return $common_args;
}

~~~

# adding menu in view
~~~php
$nav_menu_args = Helper::nav_menu_args2();
wp_nav_menu($nav_menu_args);
~~~
