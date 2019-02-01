~~~php
mix.less('./koncreate/assets/less/style.less', './koncreate/assets/css/')
.options({
  processCssUrls: false,
})
.webpackConfig({
  devtool: 'source-map'  // this line actually we need
})
.sourceMaps();
~~~
