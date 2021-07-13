/**
 * Require Puppeteer package which runs Headless chrome browser
 */
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'node_modules/tc-comp-services/tc-comp-services.bundle.js',
            'node_modules/tc-comp-style/tc-comp-style.bundle.js',
            'src/app/**/*.spec.ts'
        ],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('puppeteer'),
            require('karma-webpack'),
            require('karma-coverage-istanbul-reporter')
        ],
        exclude: [],
        preprocessors: {
            'src/app/**/*.ts': ['webpack'],
            'src/app/**/*.scss': ['webpack']
        },
        reporters: ['progress', 'coverage-istanbul'],
        coverageIstanbulReporter: {
            fixWebpackSourcePaths: true,
            reports: ['html', 'text-summary']
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: true,
        concurrency: Infinity,
        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.ts?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/
                    },
                    {
                        enforce: 'post',
                        exclude: [
                            /node_modules/,
                            /\.spec\.ts$/,
                            /\.template\.ts$/,
                            /\.constants\.ts$/,
                            /\.model\.ts$/
                        ],
                        test: /\.[tj]s$/,
                        use: {
                            loader: 'istanbul-instrumenter-loader',
                            options: { esModules: true }
                        }
                    },
                    {
                        test: /\.css|\.s(c|a)ss$/,
                        use: [{ loader: 'to-string-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules\/@webcomponents\/(?!(lit-html))/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            modules: false,
                                            targets: {
                                                esmodules: true,
                                                ie: 11
                                            }
                                        }
                                    ]
                                ],
                                plugins: [
                                    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
                                    ['@babel/plugin-proposal-class-properties', { loose: true }]
                                ]
                            }
                        }
                    }
                ]
            },
            resolve: {
                extensions: ['.ts', '.js', '.css', '.scss']
            }
        }
    });
};
