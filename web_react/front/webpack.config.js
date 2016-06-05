/**
 * Created by kevin on 16/5/24.
 */

module.exports = {
    entry: './app/entry.js',
    output: {
        path: '../static/src/js',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [{
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
          { test: /\.css$/, loader: "style-loader!css-loader" }
      ]
    }
}