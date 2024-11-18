import dbFetch from '../db/provider'
export default {
  props: ['query'],
  data() {
    return {
      book_list: [],
    }
  },
  inject: ['onViewMovie'],
  methods: {
    async applyResult() {
      console.log(this.query)
      const asyncFetch = await dbFetch('search/movie/' + this.query + '?page=1&per_page=6')
      this.book_list = asyncFetch.items
    },
  },
  mounted() {
    this.applyResult()
  },
  watch: {
    query(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.applyResult()
      }
    },
  },
  template: `
  
  <div class="search-result">
    <div class="film-grid">
      <div
        class="book-element pb-1 rounded border"
        v-for="(book, index) in book_list"
        :key="index"
        @click="onViewMovie(book.id)"
      >
        <img class="mb-1" :src="book.image" />
        <p class="element-title">{{ book.fullTitle }}</p>
        <p class="element-type">{{ book.genre }}</p>
        <p class="element-type">Rating: {{ book.ratings.imDb }}</p>
        <p class="element-type">{{ book.runtimeStr }}</p>
      </div>
    </div>
  </div>`,
}
