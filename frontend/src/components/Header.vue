<template>
  <div class="header secondary">
    <img class="home-icon link" src="../assets/leaf.png" @click="$emit('selectTab','Ticker')">
    <div class="home link-text secondary-text link" @click="$emit('selectTab','Ticker')">Home</div>

    <img class="new-tea-icon link" src="../assets/plus.png" @click="$emit('selectTab','AddTea')">
    <div class="new-tea link-text secondary-text link" @click="$emit('selectTab','AddTea')">Add Tea</div>

    <img class="my-teas-icon link" src="../assets/list.png" @click="$emit('selectTab','MyTeas')">
    <div class="my-teas link-text secondary-text link" @click="$emit('selectTab','MyTeas')">My Teas</div>



      <div class="title secondary-text">
          Leaf Reader
          </div>

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
.link-text{
  padding: .1vw;
}
.link-text:hover{
  background-color: #E5E8B6;
  color: #093824;
}
.link{
  cursor:grab
}
.home-icon{
    position: absolute;
    top: 1vh;
    transform: translateX(-50%);
    left: 4vw;
    width: 2.5vw;
}
.home{
  font-size: 1vw;
  position: absolute;
  top: 7vh;
  transform: translateX(-50%);
  left: 4vw;

}
.new-tea-icon{
  width: 2.5vw;
  position: absolute;
  top: 1vh;
  transform: translateX(-50%);
  left: 8vw;
}
.new-tea{
    position: absolute;
    top: 7vh;
    transform: translateX(-50%);
    left: 8vw;
    font-size: 1vw;
}
.my-teas-icon{
    position: absolute;
    top: 1vh;
    transform: translateX(-50%);
    left: 12vw;
    background-color: transparent;
    border: none;
    width: 2.5vw;
}
.my-teas{
    position: absolute;
    top: 7vh;
    transform: translateX(-50%);
    left: 12vw;
    background-color: transparent;
    border: none;
    font-size: 1vw;

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
    top: 2vh;
    left: 50vw;
    transform: translateX(-50%);
    font-size: 2.7vw;
}
.subtitle{
    font-size: 1vw;
}
</style>
