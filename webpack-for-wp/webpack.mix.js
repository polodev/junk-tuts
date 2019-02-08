const mix = require('laravel-mix');
const fsExtra = require("fs-extra");
const path = require("path");
const cliColor = require("cli-color");
const emojic = require("emojic");
const wpPot = require('wp-pot');
const min = Mix.inProduction() ? '.min' : '';

if (process.env.NODE_ENV === 'package') {

    mix.then(function () {

        let bundledir = path.basename(path.resolve(__dirname));
        let copyfrom = path.resolve(__dirname);
        let copyto = path.resolve(`${bundledir}`);
        // Select All file then paste on list
        let includes = [
            'app',
            'assets',
            'languages',
            'templates',
            'vendor',
            'views',
            'index.php',
            'README.txt',
            'uninstall.php',
            `${bundledir}.php`];
        fsExtra.ensureDir(copyto, function (err) {
            if (err) return console.error(err); // if file or folder does not exist
            includes.map(include => {
                fsExtra.copy(`${copyfrom}/${include}`, `${copyto}/${include}`, function (err) {
                    if (err) return console.error(err)
                    console.log(cliColor.white(`=> ${emojic.smiley}  ${include} copied...`));
                })
            });
            console.log(cliColor.white(`=> ${emojic.whiteCheckMark}  Build directory created`));
        });
    });

    return;
} else {

    if (Mix.inProduction()) {
        let languages = path.resolve('languages');
        fsExtra.ensureDir(languages, function (err) {
            if (err) return console.error(err); // if file or folder does not exist
            wpPot({
                package: 'Classified Listing',
                bugReport: '',
                src: '**/*.php',
                domain: 'classified-listing',
                destFile: `languages/classified-listing.pot`
            });
        });

    }

    if (!Mix.inProduction()) {
        mix.sourceMaps();
    }
    mix.options({
        processCssUrls: false
    });

    mix.js(`src/js/admin.js`, `assets/js/rtcl-admin${min}.js`)
        .js(`src/js/admin-custom-fields.js`, `assets/js/rtcl-admin-custom-fields${min}.js`)
        .js(`src/js/admin-taxonomy.js`, `assets/js/rtcl-admin-taxonomy${min}.js`)
        .js(`src/js/gallery.js`, `assets/js/rtcl-gallery${min}.js`)
        .js(`src/js/public.js`, `assets/js/rtcl-public${min}.js`)
        .js(`src/js/public-add-post.js`, `assets/js/public-add-post${min}.js`)
        .js(`src/js/admin-settings.js`, `assets/js/rtcl-admin-settings${min}.js`)
        .js(`src/js/admin-ie.js`, `assets/js/rtcl-admin-ie${min}.js`)
        .js(`src/js/credit-card-form.js`, `assets/js/credit-card-form${min}.js`)
        .js(`src/js/rtcl-validator.js`, `assets/js/rtcl-validator${min}.js`);
    mix.sass(`src/sass/bootstrap.scss`, `assets/css/rtcl-bootstrap${min}.css`)
        .sass(`src/sass/admin.scss`, `assets/css/rtcl-admin${min}.css`)
        .sass(`src/sass/admin-custom-fields.scss`, `assets/css/rtcl-admin-custom-fields${min}.css`)
        .sass(`src/sass/gallery.scss`, `assets/css/rtcl-gallery${min}.css`)
        .sass(`src/sass/public.scss`, `assets/css/rtcl-public${min}.css`);


    mix.copy(`src/js/jquery.validate.min.js`, `assets/vendor/jquery.validate.min.js`)
        .copy(`src/js/jquery.payment.min.js`, `assets/vendor/jquery.payment.min.js`)
        .copy(`node_modules/select2/dist/js/select2.min.js`, `assets/vendor/select2/select2.min.js`)
        .copy(`src/vendor/jquery-ui-timepicker-addon.js`, `assets/vendor/jquery-ui-timepicker-addon.js`)
        .copy(`src/vendor/xlsx.full.min.js`, `assets/vendor/xlsx.full.min.js`)
        .copy(`src/vendor/xml2json.min.js`, `assets/vendor/xml2json.min.js`)
        .copy(`node_modules/bootstrap/dist/js/bootstrap.bundle.min.js`, `assets/vendor/bootstrap/bootstrap.bundle.min.js`)
        .copy(`node_modules/owl.carousel/dist/owl.carousel.min.js`, `assets/vendor/owl.carousel/owl.carousel.min.js`)
        .copy('node_modules/owl.carousel/dist/assets/ajax-loader.gif', 'assets/vendor/owl.carousel/ajax-loader.gif')
        .copy('node_modules/owl.carousel/dist/assets/owl.carousel.min.css', 'assets/vendor/owl.carousel/owl.carousel.min.css')
        .copy('node_modules/owl.carousel/dist/assets/owl.theme.default.min.css', 'assets/vendor/owl.carousel/owl.theme.default.min.css')
        .copyDirectory('src/sass/fonts', 'assets/fonts')
        .copyDirectory('src/images', 'assets/images');
}
