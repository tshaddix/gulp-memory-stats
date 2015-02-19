var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// Consts
var PLUGIN_NAME = 'gulp-memory-stats';
var SCRIPT_SRC = 'https://rawgit.com/paulirish/memory-stats.js/master/memory-stats.js';

function gulpMemoryStats(opts) {
  opts = opts || {};

  var statScript = '<script>(function(){ var s = new MemoryStats(); stats.domElement.style.position="fixed";';

  switch (opts.position) {
    case 'top-right':
      statScript += ' stats.domElement.style.top=0; stats.domElement.style.right=0;';
      break;
    case 'top-left':
      statScript += ' stats.domElement.style.top=0; stats.domElement.style.left=0;';
      break;
    case 'bottom-left':
      statScript += ' stats.domElement.style.bottom=0; stats.domElement.style.left=0;';
      break;
    default:
      statScript += ' stats.domElement.style.bottom=0; stats.domElement.style.right=0;';
      break;
  }

  statScript += 'document.body.appendChild( stats.domElement ); requestAnimationFrame(function rAFloop(){ stats.update(); requestAnimationFrame(rAFloop); });})();</script>';

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      var fileString = file.contents.toString('utf8');

      fileString = fileString
        .replace('</head>', '<script src="' + SCRIPT_SRC + '"></script>\n</head>')
        .replace('</body>', statScript + '\n</body>');

      file.contents = new Buffer(fileString, 'utf8');
    }

    // make sure the file goes through the next gulp plugin
    this.push(file);

    // tell the stream engine that we are done with this file
    cb();
  });

  // returning the file stream
  return stream;
}

gulpMemoryStats.srcScript = SCRIPT_SRC;

// Exporting the plugin main function
module.exports = gulpMemoryStats;
