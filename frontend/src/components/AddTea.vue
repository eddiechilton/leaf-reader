<template>
  <div class="add-tea">
    <div class="input">Year:<input type="number" v-model="newTea.year" size="4"></div>
    <div class="input">Producer<input type="text" v-model="newTea.producer"></div>
    <div class="input">Name<input type="text" v-model="newTea.name"></div>
    <button @click="addTea">Add Tea</button>
  </div>
</template>

<script>
export default {
  name: 'AddTea',
  data() {
    return {
      newTea: {
        year: 2022,
        producer: '',
        name: '',
      }
    }
  },
  methods: {
    async addTea() {
      let data = {...this.newTea, reviews: []}
      await fetch('http://localhost:3000/teas/newTea', {
          method: 'POST',
          mode: 'cors', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
    }
  },


}
</script>

<style scoped>
.add-tea{
    position: absolute;
    top: 20vh;
    left: 0;
    height: 10vh;
    width: 100vw;
}
</style>
