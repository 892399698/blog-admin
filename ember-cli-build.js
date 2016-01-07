/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('bower_components/jquery-ui/themes/base/jquery-ui.css');
  // app.import('vendor/muban/css/bootstrap.min.css');

  app.import('vendor/muban/fonts/css/font-awesome.min.css');
  // app.import('vendor/muban/css/custom-ico-fonts.css');

  app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');

  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot', {
      destDir: 'fonts'
  });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf', {
      destDir: 'fonts'
  });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg', {
      destDir: 'fonts'
  });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {
      destDir: 'fonts'
  });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', {
      destDir: 'fonts'
  });
  app.import('vendor/muban/css/bootstrap-reset.css');
  app.import('vendor/muban/css/jquery-ui-1.10.3.css');
  app.import('vendor/muban/css/style.css');
  

  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/jquery-migrate/jquery-migrate.min.js');
  app.import('bower_components/jquery-ui/jquery-ui.min.js');
  app.import('bower_components/modernizr/src/Modernizr.js');
  app.import('bower_components/jquery.nicescroll/dist/jquery.nicescroll.min.js');
  

  app.import('bower_components/iCheck/icheck.min.js');
app.import('bower_components/select2/select2.css');

app.import('bower_components/underscore/underscore.js');
app.import('bower_components/ember/ember-template-compiler.js');
app.import('bower_components/select2/select2_locale_zh-CN.js');
app.import('bower_components/webuploader/dist/webuploader.min.js');
app.import('bower_components/webuploader/dist/webuploader.css');
// app.import('bower_components/animate.css/animate.css');
app.import("bower_components/moment/moment.js");
app.import("bower_components/moment/locale/zh-cn.js");
//富文本编辑器
app.import('vendor/tinymce-lang/zh_CN.js'); //rich editor

// app.import("vendor/jBox-0.3.2/Source/jBox.js");
// app.import("vendor/jBox-0.3.2/Source/jBox.css");
// app.import("vendor/jBox-0.3.2/Source/themes/NoticeBorder.css");

// app.import('vendor/jquery.validationEngine/jquery.validationEngine-zh_CN.js');
// app.import('vendor/jquery.validationEngine/jquery.validationEngine.min.js');
// app.import('vendor/jquery.validationEngine/validationEngine.jquery.css');

// app.import("bower_components/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js");
// app.import("bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css");

//zeroclipboard是一款可以通过js代码复制的命令
// app.import("bower_components/zeroclipboard/dist/ZeroClipboard.js");
// app.import("bower_components/zeroclipboard/dist/ZeroClipboard.swf", {
//     destDir: "assets"
// });

//请不要替换为bower_components
// app.import("vendor/bootstrap-daterangepicker/daterangepicker.css");
// app.import("vendor/bootstrap-daterangepicker/daterangepicker.js");


// app.import("bower_components/numeraljs/numeral.js");
// app.import("bower_components/numeraljs/languages/chs.js");

// app.import("bower_components/swfobject/swfobject/swfobject.js");
// app.import("vendor/audiojs/audio.min.js");
// app.import("vendor/audiojs/audiojs.swf");
// app.import("vendor/muban/js/scripts.js");

  return app.toTree();
};
