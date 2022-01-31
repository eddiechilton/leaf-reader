<template>
  <div class="primary">
    <Header v-on:selectTab="selectTab"/>
    <component :is="selectedTab" />

  </div>
</template>

<script>
import Header from './components/Header.vue'
import {defineAsyncComponent} from '@vue/runtime-core';

export default {
  name: 'App',
  data() {
    return {
      tab: 'Ticker'
    }
  },
  components: {
    Header
  },
  computed: {
    selectedTab() {
      console.log(this.tab)
      return defineAsyncComponent(() => import (`@/components/${this.tab}.vue`));
    }
  },
  methods: {
    selectTab(newTab) {
      this.tab = newTab
    }
  }
}
</script>

<style>
#app {
  position: absolute;
  top: 0;
  left:0;
  font-family:Arial, Helvetica, sans-serif; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  width: 100vw;
  height: 100vh;
}
.primary {
  background-color: #586994;
    width: 100vw;
  height: 100vh;
}
.text {
  color: #7D869C
}
.highlighted-text{
  color: #B4C4AE
}
.secondary{
  background-color: #093824;
}
.secondary-text{
  color: #E5E8B6
}
.panel{
  color: #093824;
  background-color: #BF4E30;
  margin: 2vw;
  padding: 1vw;
  border: 3px solid #C6CCB2;
  border-radius: 8px;
}
</style>
