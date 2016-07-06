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
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
            'es6-shim/es6-shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest(dest.libs));
});


/**
 * Build the project.
 */
gulp.task('build', () => {
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