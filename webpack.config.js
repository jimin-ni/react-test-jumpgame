const path = require('path');
const webpack = require('webpack');
module.exports = {
    name: 'react-app',
    mode: 'development',
    devtool: 'eval',
    resolve:{
        extensions: ['.js','jsx']
    },
    entry: {
        app: ['./client'],
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options:{
                presets: [
                    ['@babel/preset-env',{
                    targets:{
                        browsers: ['> 5% in KR']
                    },
                    debug: true,
                }], '@babel/preset-react'],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel'
                ],
            }
        },
        {
            test : /\.(css)$/,
            use:['style-loader','css-loader']
        }
    ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true}),
    ],
    output: {
        path: path.join(__dirname,'./public'),
        filename: 'app.js',
        publicPath: '/public/',

    }
}