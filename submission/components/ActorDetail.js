import dbFetch from '../db/provider'

export default {
  props: ['info'],
  data() {
    return {
      detail: null,
    }
  },
  methods: {
    async loadDetail() {
      const detailInfo = (await dbFetch('detail/actor/' + this.actorId)).detail
      if (detailInfo.id === this.info.id) {
        this.detail = detailInfo
      }
    },
  },
  watch: {
    info(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.detail = null
        this.loadDetail()
      }
    },
  },
  template: `
  <div class="actor-container" v-if="info != null">
    <div class="actor-header">
      <img class="actor-poster" :src="info.image" alt="Không thể truy cập link ảnh" />
      <div class="actor-detail">
        <h1>{{ info.name }}</h1>
        <p v-if="detail != null"><strong>Summary:</strong> {{ detail.summary }}</p>
      </div>
    </div>
    <div class="cast">
      <h4 style="font-weight: 600">Bộ phim</h4>
      <ul v-if="detail != null">
        <li v-for="(movie, index) in detail.castMovies" :key="index">
          {{ movie.title }}
        </li>
      </ul>
    </div>
  </div>`,
}
