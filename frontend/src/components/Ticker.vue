<template>
  <div v-if="teasLoaded" class="ticker">
    <div v-for="panel, index in teas" :key="panel" class="highlighted-text panel">
      <div>Producer: {{panel.producer}}</div>
      <div>Name: {{panel.name}}</div>
      <div>Year: {{panel.year}}</div>
      <div>Category: {{panel.category}}</div>
      <div v-if="panel.reviews && avgs">Reviews: {{panel.reviews.length}} Avg.: {{avgs[index]}}</div>

      <button @click="openReview(panel, index)">Add Review</button>
      <div v-if="reviewModal == index">
        <div class="input">User<input type="text" v-model="newReview.user"></div>
        <div class="input">Comments<input type="text" v-model="newReview.comments"></div>
        <div class="input">Rating<input type="Number" v-model="newReview.rating"></div>
        <button @click="addReview(panel)">Submit Review</button>
        </div>

      <button @click="showReviews(panel, index)">Show Reviews</button>
      <div v-if="showModal == index"> 
      <div v-for="review in panel.reviews" :key="review">
        <div>User: {{review.user}}</div>
        <div>Comments: {{review.comments}}</div>
        <div>Rating: {{review.rating}}</div>
        </div>
        </div>


    </div>
    <div class="error-modal" v-if="showErrorModal" @click="showErrorModal = false">
      <div class="error-text">ERROR - You've already submitted a review for this tea. You may update your review on your My Teas page.</div></div>
  </div>
</template>

<script>
export default {
  name: 'Ticker',
  async mounted() {
    let response = await this.getTeas()
    this.teas = await response.json()
    this.teasLoaded = true;
    this.reviewAverage()
  },
  data() {
    return {
      teas: undefined,
      teasLoaded: false,
      reviewModal: undefined,
      showModal: undefined,
      avgs: undefined,
      currentTea: undefined,
      newReview: {
        user: undefined,
        comments: undefined,
        rating: undefined
      },
      showErrorModal: false,
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
      this.newReview = {
        user: undefined,
        comments: undefined,
        rating: undefined}
    },
    showReviews(panel, index) {
      this.showModal = index;
      this.currentTea = panel;
    },
    reviewAverage() {
      let reviewAverages = this.teas.map(tea => {
        if (tea.reviews && tea.reviews.length > 0){
        let total = 0;
        let length = tea.reviews.length;
        tea.reviews.forEach(review => {
          let rating = parseInt(review.rating)
          total = total + rating
        })
        let average = total /  length
        return average
        }
        else {
          return 0
        }
      })
      this.avgs = reviewAverages

    },
    async addReview (panel) {
      let obj = {tea: panel, review: this.newReview}
      let resp = await fetch('http://localhost:3000/teas/addReview', {
        method: 'POST',
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    console.log(resp)
      if (resp.status == 400) {
        this.showErrorModal = true
      }
      let response = await this.getTeas()
      this.teas = await response.json()
      this.teasLoaded = true;
      this.reviewAverage()

    }
  },


}
</script>

<style scoped>
.error-modal{
  background-color: black;
  opacity: .6;
  position: absolute;
  top: 0;
  left: 0;
  height: 90vh;
  width: 100vw;
}
.error-text{
  opacity: 1;
  background-color: #B4C4AE;
  color: #BF4E30;
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translateY(-50%);
  transform: translateX(-50%);
  width: 20vw;
  padding: 5vw;
}
.ticker{
    position: absolute;
    top: 10vh;
    left: 0;
    height: 10vh;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
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
