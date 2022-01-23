const gulp = require('gulp');
const template = require('gulp-template');
const zip = require('gulp-zip');
const del = require('del');

// fetch command line arguments
const arg = (argList => {

    let arg = {}, a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {
  
      thisOpt = argList[a].trim();
      opt = thisOpt.replace(/^\-+/, '');
  
      if (opt === thisOpt) {
  
        // argument value
        if (curOpt) arg[curOpt] = opt;
        curOpt = null;
  
      }
      else {
  
        // argument name
        curOpt = opt;
        arg[curOpt] = true;
  
      }
  
    }
  
    return arg;
  
  })(process.argv);

gulp.task('clean', function(done) {
    return del([
        'manifest/**/*'
    ], done);
});

gulp.task('generate-manifest', function(done) {
    gulp.src(['src/static/images/**', 'src/manifest.json'])
        .pipe(template({appId: arg.appId, botId: arg.botId}))
        .pipe(zip('lesprojetscagnottes.zip'))
        .pipe(gulp.dest('manifest'), done);
    done();
});

gulp.task('default', gulp.series('clean', 'generate-manifest'), function(done) {
    console.log('Build completed. Output in manifest folder');
    done();
});

