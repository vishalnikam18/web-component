const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    devtool: "#source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: path.resolve(__dirname, 'dist/index.html'),
            meta: {
                viewport: 'width=device-width, initial-scale=1.0, shrink-to-fit=no'
            },
            minify: {
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true
            }
        }),
        new CopyPlugin([
            { from: path.join(__dirname, 'node_modules/tc-comp-services/tc-comp-services.bundle.js'), to: path.join(__dirname, 'dist/') },
            { from: path.join(__dirname, 'node_modules/tc-comp-style/tc-comp-style.bundle.js'), to: path.join(__dirname, 'dist/') },
            { from: path.join(__dirname, 'node_modules/amadeus-hos-res-wc-components/amadeus-hos-res-wc-components.bundle.js'), to: path.join(__dirname, 'dist/') },
            { from: path.join(__dirname, 'node_modules/amadeus-hos-res-json-schema-validator/amadeus-hos-res-json-schema-validator.bundle.js'), to: path.join(__dirname, 'dist/') },
        ])
    ]
}