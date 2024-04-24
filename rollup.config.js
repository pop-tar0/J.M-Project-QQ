/* eslint-disable import/no-extraneous-dependencies */
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
  input: 'src/index.js', // Path to the entry file.
  output: {
    file: 'public/index.js', // Path and filename for the output bundle.
    format: 'iife', // Bundle format: iife for browser global, cjs for CommonJS, esm for ES Module.
  },
  plugins: [resolve(), commonjs()],
};
