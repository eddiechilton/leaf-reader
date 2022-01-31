<template>
  <div v-if="teasLoaded" class="ticker">
    <div v-for="panel, index in teas" :key="panel" class="highlighted-text panel">
      {{panel}}
      <button @click="openReview(panel, index)">Review</button>
      <div v-if="reviewModal == index">
        <div class="input">User<input type="text" v-model="newReview.user"></div>
        <div class="input">Comments<input type="text" v-model="newReview.comments"></div>
        <div class="input">Rating<input type="Number" v-model="newReview.rating"></div>
        <button @click="addReview(panel)">submit review</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ticker',
  async mounted() {
    let response = await this.getTeas()
    this.teas = await response.json()
    this.teasLoaded = true
  },
  data() {
    return {
      teas: undefined,
      teasLoaded: false,
      reviewModal: undefined,
      currentTea: undefined,
      newReview: {
        user: undefined,
        comments: undefined,
        rating: undefined
      }
    }
  },
  computed: {

  },
  methods: {
    async getTeas () {
      let data = await fetch('http://localhost:3000/teas/getAllTeas')
      return data
    },
    openReview(panel, index) {
      this.reviewModal = index;
      this.currentTea = panel;
    },
    async addReview (panel) {
      let obj = {tea: panel, review: this.newReview}
      await fetch('http://localhost:3000/teas/addReview', {
      method: 'POST',
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })

    }
  },


}
</script>

<style scoped>
.ticker{
    position: absolute;
    top: 10vh;
    left: 0;
    height: 10vh;
    width: 100vw;
}
.panel{
  background-color: #BF4E30
}
</style>
