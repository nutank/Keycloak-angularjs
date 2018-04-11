var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var gutil = require('gulp-util');
var rename = require('gulp-rename');

var paths = {
    outputfile: "aj-keycloak.js",
    dep_q: "node_modules/q/q.js",
    dep_keycloak_source: "node_modules/keycloak-js/dist/keycloak.js",
    dep_keycloak_minsource: "node_modules/keycloak-js/dist/keycloak.min.js",
    dep_src: "src",
    src: "src/**/*",
    srcHTML: "src/index.html",
    tmp: "tmp",
    dist: "dist"
}

gulp.task('default', function () {
  console.log('Hello World!');
});

gulp.task('copy',function(){
    return gulp.src(paths.src).pipe(gulp.dest(paths.dist));
});

gulp.task('copyHTML',function(){
    return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.dist));
});

gulp.task('concat', ['setup-source'], function(cb){
    return gulp.src([paths.dep_src + '/q.js' ,paths.dep_src + '/keycloak.js', paths.dep_src + '/index.js'])
                .pipe(concat(paths.outputfile))
                .pipe(gulp.dest(paths.dist));
    cb(err);
})

gulp.task('minify',['concat'], function(){
    // pump([
        return gulp.src(paths.dist + "/" + paths.outputfile)
                .pipe(uglify())
                .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
                .pipe(rename({ suffix: '.min' }))
                .pipe(gulp.dest(paths.dist));
    // ]);
});

gulp.task('setup-source',function(cb){
    return gulp.src([paths.dep_q, paths.dep_keycloak_source]).pipe(gulp.dest(paths.dep_src));
    cb(err);
});

// gulp.task('setup-dist',function(){
//     return gulp.src(paths.dep_keycloak_minsource).pipe(gulp.dest(paths.dep_src));
// });

gulp.task('build',[ 'minify', 'copyHTML']);
