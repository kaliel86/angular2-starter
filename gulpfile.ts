const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const replace = require('gulp-replace');

import {config} from './gulp.config';


/**
 * Remove build directory.
 */
gulp.task('clean', () => {
    return del(config.prod.root);
});


/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src(config.dev.tsFiles)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            emitError: false
        }));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
    return gulp.src(config.dev.resources)
        .pipe(gulp.dest(config.prod.root));
});


/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", ["tslint"], () => {
    let tsResult = gulp.src(config.dev.tsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(config.prod.root));
});



/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
        'core-js/client/shim.min.js',
        'zone.js/dist/zone.js',
        'reflect-metadata/Reflect.js',
        'systemjs/dist/system.src.js',
        'rxjs/**',
        'zone.js/dist/**',
        '@angular/**'
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest(config.prod.lib));
});

gulp.task('updateResources', ['libs','resources'], () => {
    return gulp.src(config.dev.root + '/index.html')
        .pipe(replace('node_modules/', 'lib/'))
        .pipe(gulp.dest(config.prod.root));
});


/**
 * Build the project.
 */
gulp.task('build', ['compile', 'updateResources'], () => {
    console.log("Building the project ...");

    browserSync.init({
        port: 3000,
        files: ['index.html', 'app/**/*.js', 'app/**/*.html'],
        injectChanges: true,
        logFileChanges: false,
        logLevel: 'silent',
        notify: true,
        reloadDelay: 0,
        server: {
            baseDir: config.prod.root
        }
    });
});


gulp.task('default', ['build'], () => {

});