


~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>svg test</title>
</head>
<body>
<h1>Svg test</h1>
<style type="text/css">
body {
  height: 100vh;
  width: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
}
.item {
  height: 400px;
  width: 400px;
  background: tomato;
  color: white;
}
.item svg {
  width: 100%;
  height: auto;
}
.item img {
  max-width: 100%;
}
.item svg path {
    fill: white;
}
.item:hover svg path {
    fill: red;
}


</style>
<div class="item">
  <img class="myimg svg" src="astronaut.svg">
</div>

<script src="jquery-3.3.1.min.js"></script>
<script type="text/javascript">
  jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');

});
</script>
</body>
</html>
~~~
