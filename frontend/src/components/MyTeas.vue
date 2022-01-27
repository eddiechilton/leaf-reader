<template>
  <div v-if="myTeasLoaded">
    These are my teas: {{myTeas}}
  </div>
</template>

<script>
export default {
  name: 'Ticker',
  async mounted() {
    await this.getMyTeas();
  },
  data() {
    return {
      myTeas: undefined,
      myTeasLoaded: false
    }
  },
  methods: {
    async getMyTeas() {
      let response = await fetch('http://localhost:3000/user/eddie/myTeas')
      this.myTeas = await response.json()
      this.myTeasLoaded = true
    }
  },


}
</script>

<style scoped>

</style>
