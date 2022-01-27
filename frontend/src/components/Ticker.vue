<template>
  <div v-if="lastFiveLoaded">
    These are the last five teas: {{lastFive}}
  </div>
</template>

<script>
export default {
  name: 'Ticker',
  async mounted() {
    let response = await this.getLastFiveReviews()
    this.lastFive = await response.json()
    this.lastFiveLoaded = true
  },
  data() {
    return {
      lastFive: undefined,
      lastFiveLoaded: false
    }
  },
  computed: {

  },
  methods: {
    async getLastFiveReviews () {
      let data = await fetch('http://localhost:3000/lastFive')
      return data
    }
  },


}
</script>

<style scoped>

</style>
