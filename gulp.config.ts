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
        root: 'app',
        jsFiles: 'app/**/*.js',
        htmlFiles: 'app/**/*.html'
    }
};