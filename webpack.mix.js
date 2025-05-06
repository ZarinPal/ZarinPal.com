const mix = require('laravel-mix');
const path = require('path');
const glob = require('glob');
mix.pug = require('laravel-mix-pug');

const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction ? '//cdn.zarinpal.com/home/v2/' : '/';
const assetsHash = isProduction ? `?${process.env.GIT_SHA}` : '';

const withMaterial = (config) => {
  config.includePaths = [
    'node_modules/',
    'node_modules/@material/*'
  ].map((dir) => path.join(__dirname, dir))
   .map((pattern) => glob.sync(pattern))
   .flat();
  return config;
};

mix.setPublicPath('public/assets')
   .setResourceRoot('../')

   // JavaScript
   .js('src/js/app.js', 'public/assets/js')
   .js('src/js/merchants/app.js', 'public/assets/js/merchants')
   .js('src/js/contact/app.js', 'public/assets/js/contact')
   .js('src/js/pages/faq.js', 'public/assets/js/pages')

   // Sass
   .sass('src/scss/app.scss', 'public/assets/css')
   .sass('src/scss/pages/pages_header.scss', 'public/assets/css')

   // Pug Templates
   .pug('src/pug/**/*.pug', 'public', {
     exludePath: 'src/pug/partials/',
     seeds: 'src',
     locals: {
       lang: 'fa',
       config: {
         baseUrl,
         assetsHash,
       },
     },
   })

   // Static Assets
   .copy('src/images/app', 'public/assets/images')
   .copy('src/images/about_us', 'public/assets/images/about_us')
   .copy('src/images/pages', 'public/assets/images')
   .copy('src/images/banks', 'public/assets/images/banks')
   .copy('src/images/favicon', 'public/icons')

   // Source Maps
   .sourceMaps();

mix.browserSync({
  proxy: false,
  port: 8000,
  server: {
    baseDir: './public',
  },
});

// Example alternative setup for English language (commented out)
// mix.pug('src/pug/*.pug', 'public', {
//   seeds: 'public',
//   locals: {
//     lang: 'en'
//   }
// });
 
