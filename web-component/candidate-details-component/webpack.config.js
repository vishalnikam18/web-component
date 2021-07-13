const webpackMerge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isProduction = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production' ? true : false;
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const basePackageJson = require('./package.json');
const webpackMergeProfile = isProduction ? {} : require('./webpack.config.dev.js');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const _boxen = require('boxen');
const dedent = require('ts-dedent');
const log = console.log;


log(_boxen(dedent.dedent`
  ${chalk.hex('#0093e0')('                Production Build :: ') + chalk.yellowBright.bold(String(isProduction).toUpperCase()) + '                  \n'}
  ${chalk.hex('#0093e0')(basePackageJson.name) + chalk.yellowBright.bold('@' + basePackageJson.version + '\n')}
  ${chalk.hex('#0093e0')('Author :: ' + chalk.yellowBright(basePackageJson.author))}
    `, {
    borderStyle: 'double',
    padding: 2,
    borderColor: '#2368ab',
    backgroundColor: '#5077a5',
    align: 'center',
    float: 'left',
    margin: 2
}));

const buildProgress = dedent.dedent`
    ${chalk.hex('#0093e0')('        Build Progress  \u2329') + chalk.hex('#ffd337')(' :bar') + chalk.hex('#0093e0')(' \u232A') + chalk.yellowBright(' :msg ') + chalk.hex('#4cb944').bold(':percent') + chalk.hex('#4cb944').bold(' (:elapsed seconds)')}
`

module.exports = () => {
    return webpackMerge(webpackMergeProfile, {
        mode: isProduction ? 'production' : 'development',
        optimization: {
            minimizer: [new TerserJSPlugin({ extractComments: false }), new OptimizeCSSAssetsPlugin({})]
        },
        target: 'web',
        entry: {
            main: [path.resolve(__dirname, 'src/index.ts')]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new GenerateJsonPlugin('package.json', {
                name: basePackageJson.name,
                version: basePackageJson.version,
                description: basePackageJson.description
            }),
            new ProgressBarPlugin({
                complete: '\u2588',
                incomplete: ' ',
                width: 40,
                total: 100,
                format: buildProgress,
                clear: false
            })
        ],
        module: {
            rules: [
                {
                    test: /\.css|\.s(c|a)ss$/,
                    use: [{ loader: 'to-string-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
                },
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
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
        },
        output: {
            filename: basePackageJson.name + '.bundle.js',
            chunkFilename: ('hello-world-chunks/[chunkhash].bundle.js'),
            path: path.resolve(__dirname, 'dist'),
            jsonpFunction: basePackageJson.name.replace(/-/g, '')
        },
        stats: {
            modules: false,
            children: false,
            assetsSort: 'chunks',
            colors: true,
            performance: true,
            providedExports: false,
            logging: 'verbose'
        },
        infrastructureLogging: {
            level: 'info'
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 5000
        }
    });
};
