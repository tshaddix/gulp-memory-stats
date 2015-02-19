# gulp-memory-stats

Gulp plugin for enabling memory stats using [@paulirish's](https://github.com/paulirish) [memory-stats.js](https://github.com/paulirish/memory-stats.js). Appends `memory-stats.js` to document `head` and appends rendering/setup script to`body`.

```
npm install --save-dev gulp-memory-stats
```

Take a look at the [Usage](https://github.com/paulirish/memory-stats.js#usage) section for Chrome setup.

## Quick Example

```js

// in your gulpfile...

var memoryStats = require('gulp-memory-stats');

gulp.task('html', function() {
  gulp.src(src.html)
    .pipe(memoryStats({ position: 'top-right' })) // can be 'bottom-right' (default), 'bottom-left', 'top-right', 'top-left'
    .pipe(gulp.dest(dest.html));
});

```

## Testing

```
mocha
```
