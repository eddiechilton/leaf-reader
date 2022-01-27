<template>
  <div>
    <Ticker/>
    <MyTeas />
    <AddTea />
  </div>
</template>

<script>
import Ticker from './components/Ticker.vue'
import MyTeas from './components/MyTeas.vue'
import AddTea from './components/AddTea.vue'

export default {
  name: 'App',
  components: {
    Ticker,
    MyTeas,
    AddTea
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
