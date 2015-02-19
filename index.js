var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// Consts
var PLUGIN_NAME = 'gulp-prefixer';
var BOOKMARLET_SCRIPT = '<script>(function(){var script=document.createElement("script");script.src="https://rawgit.com/paulirish/memory-stats.js/master/bookmarklet.js";document.head.appendChild(script);})()</script>';

function gulpMemoryStats() {
  prefixText = new Buffer(BOOKMARLET_SCRIPT);

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      var fileString = file.contents.toString('utf8');

      fileString = fileString.replace('</body>', BOOKMARLET_SCRIPT + '\n' + '</body>');

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

gulpMemoryStats.bookmarkletScript = BOOKMARLET_SCRIPT;

// Exporting the plugin main function
module.exports = gulpMemoryStats;
