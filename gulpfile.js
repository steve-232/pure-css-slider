const {
    src, dest, parallel, watch,
  } = require('gulp');
  const sass = require('gulp-sass');
  
  const env = process.env.NODE_ENV;
  const isProduction = env === 'production';
  const sassPaths = ['src/scss/'];
  
  function scss() {
    return src('src/scss/*.scss')
      .pipe(sass({
        includePaths: sassPaths,
        outputStyle: isProduction ? 'compressed' : 'expanded' })
        .on('error', sass.logError))
      .pipe(dest('prod/css'));
  }
  
  function watchFiles() {
    scss();
    watch('src/scss/*.scss', scss);
  }
  
  exports.scss = scss;
  exports.default = env === 'dev' ? watchFiles : parallel(scss);