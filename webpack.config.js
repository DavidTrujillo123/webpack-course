const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        filename: 'main.js',
    } ,
    resolve:{
        //extenciones con las que vamos a trabajar
        //pueden variar con svelt, react
        extensions: ['.js']
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
            }
        ]
    },
    //plugings
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin(),
    ]
}