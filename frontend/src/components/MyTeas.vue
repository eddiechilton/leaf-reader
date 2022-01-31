<template>
  <div class="my-teas">
    Enter user name: <input v-model="user">
    <button @click="findTeas">Find My Teas</button>
    <div v-if="myTeasLoaded">These are my rated teas: 
      <div v-for="panel, index in myTeas" :key="panel" class="highlighted-text panel">
        <div>Producer: {{panel.producer}}</div>
        <div>Name: {{panel.name}}</div>
        <div>Year: {{panel.year}}</div>
        <div>Category: {{panel.category}}</div>
        <div>Review: {{panel.selectedReview.comments}} Rating: {{panel.selectedReview.rating}} </div>
        <button @click="openUpdate(panel, index)">Update Review</button>
        <div v-if="updateSelector == index">
          Updated Review: <input v-model="panel.updatedComment">
          Updated Rating: <input type="number" v-model="panel.updatedRating">
          <button @click="updateReview(panel, index)">Submit updated Review</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyTeas',
  data() {
    return {
      myTeas: undefined,
      myTeasLoaded: false,
      user: 'eddie',
      updateSelector: undefined,
      currentTea: undefined
    }
  },
  methods: {
    async findTeas() {
      let response = await fetch(`http://localhost:3000/user/${this.user}/myTeas`)
      let resJson = await response.json()
      this.myTeas = resJson.map(tea =>{
            let selectedReview;
            tea.reviews.forEach(review => {
              if (review.user == this.user) {
                selectedReview = review 
              } else {
                return
              }
            })
            return {...tea, 'selectedReview': selectedReview, 'updatedComment': selectedReview.comments, 'updatedRating': selectedReview.rating}
          }
        )
        this.myTeasLoaded = true
        return response
      },
    openUpdate(panel, index) {
      this.updateSelector = index;
      this.currentTea = panel;
    },
    async updateReview (panel, index) {
      let obj = {tea: panel, newComment: this.myTeas[index].updatedComment, newRating: this.myTeas[index].updatedRating}
      await fetch('http://localhost:3000/teas/updateReview', {
        method: 'POST',
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      this.findTeas()
      }
    },

}
</script>

<style scoped>
.my-teas{
    position: absolute;
    top: 20vh;
    left: 0;
    height: 10vh;
    width: 100vw;
}
</style>
