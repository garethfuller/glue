const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    require('postcss-preset-env')({ stage: 0 }),
    tailwindcss('./tailwind.js'),
    require('autoprefixer'),
  ],
};
