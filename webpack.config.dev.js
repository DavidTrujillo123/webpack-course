const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    //punto de entrada
    entry: './src/index.js',
    //hacia donde vamos a enviar lo que prepara webpack
    //carpeta dist(distribution) nombre ya especifico de webpack
    output: {
        //path.resolve nos ayuda con la busqueda del directorio en el que estamos
        path: path.resolve
        (__dirname, 'dist'),
        //Archivo resultante
        filename: '[name].[contenthash].js',
    } ,
    mode: 'development',
    resolve:{
        //extenciones con las que vamos a trabajar
        //pueden variar con svelt, react
        extensions: ['.js'],
        //Alias
        alias: {
            '@utils': path.resolve(__dirname, './src/utils'),
            '@images': path.resolve(__dirname, './src/assets/images'),
            '@templates': path.resolve(__dirname, './src/templates'),
            '@styles': path.resolve(__dirname, './src/styles'),
        }
    },
    //loaders
    module: {
        //reglas que establecemos para trabajar con diferentes archivos
        rules: [
            //babel-loader
            {
                //que tipo de extensiones vamos a utilizar
                //expresion regular: cualquier archivo que empieze con .m o .js
                test: /\.m?js$/,
                //excluimos todos lo node modules
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            //css
            {
                test: /\.css|styl$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            //para imgs
            {
                test: /\.png/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext][query]'
                    
                }
            },
            //fonts
            {
                test: /\.(woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name].[hash][ext][query]'
                }
            },
        ]
    },
    //plugings
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin(
            {
                patterns: [
                    {
                        from: path.resolve(__dirname, "src", "assets/images"),
                        to: "assets/images"
                    }
                ]
            }
        ),
        new Dotenv(),
    ],
}