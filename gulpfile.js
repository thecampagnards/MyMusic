var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  templateCache = require('gulp-angular-templatecache'),
  concat = require('gulp-concat'),
  htmlmin = require('gulp-htmlmin'),
  sass = require('gulp-sass'),
  concatCss = require('gulp-concat-css'),
  cleanCSS = require('gulp-clean-css'),
  clean = require('gulp-clean')

gulp.task('template', function () {
  return gulp.src(['./partials/*.html', './partials/*/*.html'])
    .pipe(templateCache({standalone: true}))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('js', ['template'], function () {
  return gulp.src(
    [
      './bower_components/jquery/dist/jquery.min.js',
      './bower_components/jquery-ui/jquery-ui.min.js',
      './bower_components/angular/angular.min.js',
      './bower_components/angular-soundmanager2/dist/angular-soundmanager2.min.js',
      './bower_components/angular-route/angular-route.min.js',
      './bower_components/bootstrap/dist/js/bootstrap.min.js',
      './bower_components/angular-bootstrap/ui-bootstrap.min.js',
      './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      './bower_components/angular-ui-sortable/sortable.min.js',
      './bower_components/bootstrap-fileinput/js/fileinput.min.js',
      './bower_components/bootstrap-fileinput/js/locales/fr.js',
      './bower_components/angular-youtube-mb/dist/angular-youtube-embed.min.js',
      './js/controllers/main.js',
      './dist/templates.js',
      './js/*.js',
      './js/*/*.js'
    ])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
})

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('css', ['sass'], function () {
  return gulp.src(
    ['./dist/css/main.css',
      './bower_components/font-awesome/css/font-awesome.min.css',
      './bower_components/bootstrap/dist/css/bootstrap.min.css',
      './bower_components/bootstrap-fileinput/css/fileinput.min.css'
    ])
    .pipe(concatCss('main.css', {rebaseUrls: false}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('build', ['js', 'css'], function () {
  gulp.src('./build/templates.js').pipe(clean())
  return gulp.src('./index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', function () {
  gulp.watch('./index.html', ['build'])
  gulp.watch('./sass/*.scss', ['css'])
  gulp.watch(['./partials/*.html', './partials/*/*.html', './js/**/*.js'], ['js'])
})

gulp.task('default', ['build'])
