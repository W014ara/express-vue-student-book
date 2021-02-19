module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/index.scss";`
      }
    }
  },
  publicPath: ""
};
