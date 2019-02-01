~~~js
mix.less('./assets/less/style.less', './assets/css/')
.less( './assets/less/elementor.less', './assets/css/')
.options({
       processCssUrls: false
   })
.browserSync({
    proxy: 'localhost/medilink',
    files: [
        './assets/css/style.css',
        './assets/css/elementor.css',
        './*'
    ]
});
~~~
