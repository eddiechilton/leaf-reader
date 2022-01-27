<template>
  <div>
    <Ticker/>
  </div>
</template>

<script>
import Ticker from './components/Ticker.vue'

export default {
  name: 'App',
  components: {
    Ticker
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
