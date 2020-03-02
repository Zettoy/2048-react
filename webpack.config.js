const HtmlWebpackPlutin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['link:href']
                        }
                    }
                ]
            },
            {
                test: /\.(jp[e]?g|png|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'eval-source-map',
    plugins: [
        new HtmlWebpackPlutin({
            template: './public/index.html'
        })
    ]
}