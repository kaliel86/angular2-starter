export const config = {
    dev: {
        root: 'src',
        tsFiles: 'src/**/*.ts',
        resources: [
            'src/**/*',
            '!**/*.ts'
        ]
    },
    prod: {
        root: 'build',
        jsFiles: 'build/**/*.js',
        htmlFiles: 'build/**/*.html',
        lib: 'build/lib'
    }
};