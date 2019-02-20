// inc/rt-post-meta-fields.php
~~~php
public function icon_select( $key, $field, $default, $class ){
      echo '<select class="select2_font_awesome" name="' . esc_attr( $key ) . '" id="' . esc_attr( $key ) . '">';
      foreach ( $field['options'] as $key => $value ) {
        echo '<option',
        $default == $key ? ' selected="selected"' : '',
        ' value="' . esc_attr( $key ) . '"'.
        ' data-icon="' . esc_attr( $key ) . '"'.
        '>' .
        esc_html( $value ) .
        '</option>';
      }
      echo '</select>';
    }
~~~
