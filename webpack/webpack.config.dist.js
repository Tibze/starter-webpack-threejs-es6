var path = require('path'),
    webpack = require("webpack");

module.exports = {
    cache: false,
    debug: false,
    entry: ['./src/Main'],    
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },  
    output: {
        path: path.join(__dirname, "build"),
        filename: 'scripts.js'
    },
    resolve: {
        extensions: ['', '.js', '.json', '.coffee']
    }

};
