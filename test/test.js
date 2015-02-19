var assert = require('assert');
var File = require('vinyl');
var ms = require('../');

describe('gulp-memory-stats', function() {
  describe('in buffer mode', function() {

    it('should add script tag before the end of body', function(done) {

      // create the fake file
      var fakeFile = new File({
        contents: new Buffer('<html><head></head><body></body></html>')
      });

      var statsPlug = ms();

      // write the fake file to it
      statsPlug.write(fakeFile);

      // wait for the file to come back out
      statsPlug.once('data', function(file) {
        // make sure it came out the same way it went in
        assert(file.isBuffer());

        // check the contents
        assert.equal(file.contents.toString('utf8'), '<html><head></head><body>' + ms.bookmarkletScript + '\n' + '</body></html>');
        done();
      });

    });

  });
});
