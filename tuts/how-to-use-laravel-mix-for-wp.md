# importing essential package
~~~js
const mix = require('laravel-mix');
const fsExtra = require("fs-extra");
const archiver = require('archiver');
const path = require("path");
const cliColor = require("cli-color");
const emojic = require("emojic");
const wpPot = require('wp-pot');
const min = Mix.inProduction() ? '.min' : '';
~~~


# generating pot file
~~~js
// package.json
"pot": "cross-env NODE_ENV=pot node_modules/.bin/webpack --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
~~~
~~~js
if (process.env.NODE_ENV === 'pot') {
  let languages = path.resolve('languages');
  fsExtra.ensureDir(languages, function (err) {
      if (err) return console.error(err); // if file or folder does not exist
      wpPot({
          package: 'Koncreate',
          bugReport: '',
          src: '**/*.php',
          domain: 'koncreate',
          destFile: `languages/koncreate.pot`
      });
  });

}

~~~

# bundle whole theme

~~~js
// package.json
"package": "cross-env NODE_ENV=package node_modules/.bin/webpack --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
~~~

~~~js
// mix file
if (process.env.NODE_ENV === 'package') {
  mix.then(function () {
      let bundledir = path.basename(path.resolve(__dirname));
      let copyfrom = path.resolve(__dirname);
      let copyto = path.resolve(`${bundledir}`);
      // Select All file then paste on list
      let includes = [
                  'assets',
                  'inc',
                  'languages',
                  'template-parts',
                  'widgets',
                  'page.php',
                  'index.php',
                  'comments.php',
                  'footer.php',
                  'front-page.php',
                  'functions.php',
                  'header.php',
                  'screenshot.jpg',
                  'sidebar.php',
                  'single-koncreate_project.php',
                  'single-koncreate_team.php',
                  'single.php',
                  'style.css',
                  ];
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

}
~~~

# making a zip folder

~~~js
// package.json
"zip": "cross-env NODE_ENV=zip node_modules/.bin/webpack --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
~~~

~~~js
// mix file

if (process.env.NODE_ENV === 'zip') {
  var bundledir = path.basename(path.resolve(__dirname)); // just for getting name
  let copyto = path.resolve(`${bundledir}`);


  var output = fsExtra.createWriteStream(__dirname + '/koncreate.zip'); // output location

  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

    output.on('close', function() {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');

      // following function for deleting bundle
      fsExtra.remove(copyto, function () {
        console.log('deleted');
      });

    });

    output.on('end', function() {
      console.log('Data has been drained');
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function(err) {
      if (err.code === 'ENOENT') {
        // log warning
        console.log('warning')
      } else {
        console.log('error')
        throw err;
      }
    });

    // good practice to catch this error explicitly
    archive.on('error', function(err) {
      throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);


    // append files from a glob pattern
    archive.directory(bundledir);  // just foldername + /*

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    archive.finalize();

}
~~~

# building whole package

just calling one after another (pot, package, zip)

~~~js
"build": "npm run pot && npm run package && npm run zip"
~~~
