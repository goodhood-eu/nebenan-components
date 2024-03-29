const gulp = require('gulp');
const sass = require('sass');
const gulpSass = require('gulp-sass')(sass);
const sourcemaps = require('gulp-sourcemaps');

const PUBLIC_FOLDER = `${__dirname}/../preview/public`;

const SCRIPT_SOURCE = `${__dirname}/../preview/app.jsx`;
const SCRIPT_FILE = 'script.js';

const STYLE_SOURCE = `${__dirname}/../preview/index.scss`;
const STYLE_FILE = 'style.css';

const sassOptions = {
  includePaths: [
    `${__dirname}/../client`,
    `${__dirname}/../node_modules`,
  ],
  functions: require('sass-functions')({ sass }),
  importer: require('node-sass-glob-importer')(),
  outputStyle: 'expanded',
  sourceComments: true,
};

gulpSass.compiler = sass;

const browserifyOptions = {
  entries: SCRIPT_SOURCE,
  extensions: ['.jsx'],
  debug: true,

  cache: {},
  packageCache: {},
  fullPaths: true,
};

const cacheOptions = {
  cacheFile: `${__dirname}/.browserify-cache.json`,
};

gulp.task('preview:clean', () => require('del')([PUBLIC_FOLDER]));

gulp.task('preview:babel', () => {
  const bundler = require('browserify')(browserifyOptions);
  const watcher = require('browserify-incremental')(bundler, cacheOptions);

  watcher.transform(require('babelify').configure({ extensions: ['.jsx'] }));

  return watcher
    .bundle()
    .pipe(require('vinyl-source-stream')(SCRIPT_FILE))
    .pipe(gulp.dest(PUBLIC_FOLDER));
});

gulp.task('preview:styles', () => (
  gulp.src(STYLE_SOURCE)
    .pipe(sourcemaps.init())
    .pipe(gulpSass(sassOptions).on('error', gulpSass.logError))
    .pipe(require('gulp-postcss')([
      require('autoprefixer')(),
      require('postcss-flexbugs-fixes'),
    ]))
    .pipe(require('gulp-rename')(STYLE_FILE))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PUBLIC_FOLDER))
));

gulp.task('preview', gulp.series(
  'preview:clean',
  gulp.parallel('preview:babel', 'preview:styles'),
));
