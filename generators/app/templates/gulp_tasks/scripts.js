<% if (full) { -%>
const path = require('path');

const gulp = require('gulp');
const eslint = require('gulp-eslint');

const conf = require('../conf/gulp.conf');

gulp.task('scripts', scripts);

function scripts() {
<% } -%>
  return gulp.src(path.join(conf.paths.src, '/**/*.js'))
    .pipe(eslint())
    .pipe(eslint.format())<% if (full) { %>;<% } %>
<% if (full) { -%>
}
<% } -%>
