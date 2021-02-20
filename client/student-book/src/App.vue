<template>
  <div id="app">
    <Header />
    <router-view>
      <Main />
      <Error />
    </router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./views/Header";
import Main from "./components/Main";
import Footer from "./views/Footer";
import Error from "./views/Error";

export default {
  components: {
    Header,
    Main,
    Footer,
    Error
  }
}

</script>

<style lang="scss">
</style>
