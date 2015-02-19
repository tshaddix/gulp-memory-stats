# gulp-memory-stats
Gulp plugin for enabling memory stats using @paulirish's project.


## Example
```js

// in your gulpfile...

var memoryStats = require('gulp-memory-stats');

gulp.task('html', function() {
  gulp.src(src.html)
    .pipe(memoryStats({ position: 'top-right' })) // can be 'bottom-right' (default), 'bottom-left', 'top-right', 'top-left'
    .pipe(gulp.dest(dest.html));
});

```
