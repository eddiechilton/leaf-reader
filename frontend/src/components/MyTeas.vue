<template>
  <div class="my-teas">
    <input v-model="user">
    <button @click="findTeas">FIND</button>
    <div v-if="myTeasLoaded">These are my rated teas: 
      {{myTeas}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyTeas',
  async mounted() {
    let response = await this.findTeas();
    this.myTeas = await response.json()
    this.myTeasLoaded = true
  },
  data() {
    return {
      myTeas: undefined,
      myTeasLoaded: false,
      user: 'eddie'
    }
  },
  methods: {
    async findTeas() {
      let response = await fetch(`http://localhost:3000/user/${this.user}/myTeas`)
      return response
    }
  },


}
</script>

<style scoped>
.my-teas{
    position: absolute;
    top: 10vh;
    left: 0;
    height: 10vh;
    width: 100vw;
}
</style>
