<template>
  <div>
    <button @click="addTea">Add Tea</button>
  </div>
</template>

<script>
export default {
  name: 'AddTea',
  methods: {
    async addTea() {
      let data = { user:'eddie',tea:'oolong',rating:5,comments:'I like it' }
      await fetch('http://localhost:3000/newTea', {
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

</style>
