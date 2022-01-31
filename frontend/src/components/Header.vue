<template>
  <div class="header secondary">
    <img class="home" src="../assets/leaf.png" @click="$emit('selectTab','Ticker')">
      <div class="title secondary-text" @click="$emit('selectTab','Ticker')">
          Leaf Reader
          </div>
      <div class="subtitle secondary-text" @click="$emit('selectTab','AddTea')">
          Community Driven Tea Reviews
          </div>
    <button class="list" @click="$emit('selectTab','MyTeas')">
        <img class="list-icon" src="../assets/list.png">
        </button>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {

    }
  },
  methods: {

  },


}
</script>

<style scoped>
.home{
    position: absolute;
    top: 5vh;
    transform: translateY(-50%);
    left: 3.5vw;
    width: 3vw;
}
.list{
    position: absolute;
    top: 5vh;
    transform: translateY(-50%);
    right: 3vw;
    background-color: transparent;
    border: none;
}
.list-icon{
    width: 3vw;
}
.header{
    position: absolute;
    top: 0;
    left: 0;
    height: 10vh;
    width: 100vw;
}
.title{
    position: absolute;
    top: 5vh;
    left: 7vw;
    transform: translateY(-50%);
    font-size: 2vw;
}
.subtitle{
    position: absolute;
    top: 5vh;
    right: 9vw;
    transform: translateY(-50%);
    font-size: 2vw;
}
</style>
