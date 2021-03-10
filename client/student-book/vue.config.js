module.exports = {
  lintOnSave: true,

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/style/__index.scss";'
      }
    }
  },

  outputDir: 'www',
  assetsDir: 'static'
};
