var gulp = require('gulp'),
    concat = require('gulp-concat'),
    useref = require('gulp-useref'),
    rev = require('gulp-rev'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    revCollector = require('gulp-rev-collector'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    clean = require('gulp-clean'),
    gulpif = require('gulp-if'),
    connect = require('gulp-connect');
//js合并压缩
gulp.task('js',['rev'],function(){
   gulp.src(['js/jquery.2.0.3.js','js/data.js','js/ydui.js','js/index.js'])
       .pipe(concat('app.js'))
       .pipe(uglify())
       .pipe(rev())
        .pipe(gulp.dest('./build/js'))
        .pipe(connect.reload())
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./build/rev/js'))
        .pipe(notify({ message: 'js task complete' }));

})
//css与less合并压缩
gulp.task('css',['rev'], function () {
    gulp.src(['css/*.css','css/less/*.less'])
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(concat('app.css'))  
        .pipe(less())      
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')) 
        .pipe(minifyCss()) 
        .pipe(rev())  
        .pipe(gulp.dest('./build/css'))
        .pipe(rev.manifest()) 
        .pipe(gulp.dest('./build/rev/css'))
        .pipe(connect.reload())
        .pipe(notify({ message: 'css task complete' }));
});

gulp.task('rev',function() {
    gulp.src(['./build/rev/**/*.json', './index.html'])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': 'css',
                'js': 'js'
            }
        }))                                   //- 执行文件内css名的替换
        .pipe(gulp.dest('./build'));                     //- 替换后的文件输出的目录
});
//图片的压缩
gulp.task('images',['rev'],function(){
    gulp.src('images/**/*')
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest('build/images'))
        .pipe(connect.reload())
        .pipe(notify({ message: 'Images task complete' }));
})
//向html中插入css和js
gulp.task('html',['rev'],function(){
    return gulp.src('index.html')
        .pipe(gulp.dest('build'))
        .pipe(connect.reload())
        .pipe(notify({ message: 'html task complete' }));
})
// 清理
gulp.task('clean', function() { 
  return gulp.src(['build/css/*','build/images/*','build/js/*','build/index.html'], {read: false})
    .pipe(clean());
});
//启动webserver服务
gulp.task('webserver', function() {
    connect.server({
      livereload: true,
      port:'9090',
      root:'build'
    });
});
// 预设任务
gulp.task('dev', ['clean'], function() { 
    gulp.start('css', 'js', 'images','html','webserver','watch');
});
//监视文件变化
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('css/**/*', ['css']);
  // Watch .js files
  gulp.watch('js/*.js', ['js']);
  // Watch image files
  gulp.watch('images/*', ['images']);
  // Watch Html files
  gulp.watch('*.html',['html']);
  // Create LiveReload server
  // Watch any files in dist/, reload on change
  gulp.watch(['js/*','css/*','images/*','index.html']).on('change', function(file) {
    livereload.changed(file.path);
  });
});