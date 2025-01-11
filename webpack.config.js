const path = require('path');
const fs = require('fs');

// Get all JS files in the js folder
const jsFiles = fs
  .readdirSync(path.resolve(__dirname, 'js'))
  .filter((file) => file.endsWith('.js'));

// Create an entry object dynamically
const entries = jsFiles.reduce((acc, file) => {
  const name = path.basename(file, '.js'); // Get file name without extension
  acc[name] = path.resolve(__dirname, 'js', file);
  return acc;
}, {});

module.exports = {
  mode: 'development', // Change to 'production' for optimized builds
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].bundle.js', // Output file names (e.g., file1.bundle.js)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Optional: Transpile ES6+ for browser compatibility
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
   // extensions: ['.js'], // Automatically resolve these extensions
  },
  devtool: 'source-map', // Optional: Include source maps for debugging
};
