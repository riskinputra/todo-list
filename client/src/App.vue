<template>
  <div id="app">
    <navigation></navigation>
    <router-view/>
    <scroll></scroll>
    <footer-list></footer-list>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
import Scroll from './components/Scroll'
import Footer from './components/Footers'
export default {
  components: {
    'navigation': Navigation,
    'scroll': Scroll,
    'footer-list': Footer
  },
  name: 'app'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
