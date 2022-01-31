<template>
    <div class="add-form">
    <div class="input">Year:<input type="number" v-model="newTea.year" size="4"></div>
    <div class="input">Producer: <input type="text" v-model="newTea.producer"></div>
    <div class="input">Name: <input type="text" v-model="newTea.name"></div>
    Category: <select v-model="newTea.category">
      <option>Sheng</option>
      <option>Shou</option>
      <option>Oolong</option>
      <option>White</option>
    </select>
    <br><button @click="addTea">Add Tea</button>
    <br><button @click="killDb">Kill DB</button>
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
        category: '',
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
    },
    async killDb() {
      await fetch('http://localhost:3000/teas/kill')
    },
  },


}
</script>

<style scoped>
.add-form{
  color: #E5E8B6;
  position: absolute;
  top: 20vh;
  left: 25%;
  background-color: #BF4E30;
  margin: 2vw;
  padding: 1vw;
  border: 3px solid #C6CCB2;
  border-radius: 8px;
  width: 40vw;

}
</style>
