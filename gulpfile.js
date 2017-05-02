/* File: gulpfile.js */

// Grab out Gulp packages

var gulp = require("gulp"),
    sass = require("gulp-sass");
    connect = require("gulp-connect-php"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    gutil = require("gulp-util"),
    browserSync = require("browser-sync");

var files = {
	scssFiles:"./css/*.scss",
	cssFiles:"./css/*.css",
	cssFolder:"./css",
	phpFiles:"./*.php",
	htmlFiles:"./*.html",
	js:"./js",
	jsFiles: "./js/*.js"
};

function handleError(e) {
	console.log(e);
}

gulp.task("serve",["sass"],function() {
	connect.server({},function() {

		browserSync({
			proxy: "127.0.0.1:8000"
		})
		
	})

	gulp.watch(files.scssFiles,["sass"]);
	gulp.watch(files.htmlFiles,["html"]);
	gulp.watch(files.jsFiles,["js"]);
})


gulp.task("sass", function() {
	return gulp.src(files.scssFiles)
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(gulp.dest(files.cssFolder))
		.pipe(browserSync.stream());
})

gulp.task("php",function() {

	return gulp.src(files.phpFiles)
		.pipe(browserSync.stream());
})

gulp.task("html",function() {

	return gulp.src(files.htmlFiles)
		.pipe(browserSync.stream());
})



gulp.task("js",function() {
	return gulp.src(files.jsFiles)
		.pipe(browserSync.stream());
})

gulp.task("build-js",function() {
	return gulp.src(files.jsFiles)
		.pipe(sourcemaps.init())
		.pipe(concat("main.js"))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(files.js));
})

gulp.task("default",["serve"]);
