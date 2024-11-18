import dbFetch from '../db/provider'

export default {
  props: ['movieId'],
  data() {
    return {
      info: null,
    }
  },
  inject: ['onViewActor'],
  methods: {
    async loadInfo() {
      this.info = (await dbFetch('detail/movie/' + this.movieId)).detail
      console.log(this.info)
    },
  },
  mounted() {
    this.loadInfo()
  },
  watch: {
    movieId(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.info = null
        this.loadInfo()
      }
    },
  },
  template: `
  
  <div class="movie-container" v-if="info != null">
    <div class="movie-header">
      <img class="movie-poster" :src="info.image" />
      <div class="movie-detail">
        <h1>{{ info.title }}</h1>
        <p><strong>Genre:</strong> {{ info.genre }}</p>
        <p><strong>Year:</strong> {{ info.year }}</p>
        <p><strong>Director:</strong> {{ info.director }}</p>
      </div>
    </div>
    <div class="info-brief">
      <h4 style="font-weight: 600">Tóm tắt</h4>
      <p>
        {{ info.plot }}
      </p>
    </div>
    <div class="cast">
      <h4 style="font-weight: 600">Diễn viên</h4>
      <ul>
        <li v-for="(actor, index) in info.actorList" :key="index" @click="onViewActor(actor)">
          <strong>{{ actor.name }}:</strong> {{ actor.asCharacter }}
        </li>
      </ul>
    </div>
    <div class="review">
      <h4 style="font-weight: 600">Reviews</h4>
      <ul class="list-group">
        <li class="list-group-item" v-for="(review, index) in info.reviews" :key="index">
          <strong>{{ review.username }}:</strong> {{ review.content }}
        </li>
      </ul>
    </div>
  </div>
`,
}
