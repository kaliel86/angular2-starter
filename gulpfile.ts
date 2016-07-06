const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');

import {config} from './gulp.config';

/**
 * Remove build directory.
 */
gulp.task('clean', () => {
    return del(config.prod.root);
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
    console.log('cool');
});