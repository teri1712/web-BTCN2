import dbFetch from '../db/provider'

export default {
  data() {
    this.dummy_book_interval = null
    this.top5_books = []
    return {
      current_index: -1,
      dummy_index: -1,
      dummy_book_opacity: 0,
      main_book_opacity: 1,
    }
  },
  mounted() {
    this.fetchItems()
  },
  inject: ['onViewMovie'],

  methods: {
    async fetchItems() {
      this.top5_books = (await dbFetch('get/top5revenue')).items
      if (this.top5_books.length === 0) {
        return
      }
      this.current_index = 0
      this.dummy_index = 0
    },
    performSwitchBook(index) {
      this.dummy_index = this.current_index
      this.current_index = index

      this.dummy_book_opacity = 1
      this.main_book_opacity = 0.2
      if (this.dummy_book_interval != null) {
        clearInterval(this.dummy_book_interval)
      }
      let current_time = 0
      this.dummy_book_interval = setInterval(() => {
        current_time += 20
        if (current_time >= 500) {
          clearInterval(this.dummy_book_interval)
          this.dummy_book_interval = null
        }
        this.main_book_opacity = Math.min(1, current_time / 500)
        this.dummy_book_opacity = Math.max(0, 1 - current_time / 500)
      }, 20)
    },
    switchNextBook() {
      let index = this.current_index + 1
      if (index === 5) {
        index = 0
      }
      this.performSwitchBook(index)
    },
    switchPrevBook() {
      let index = this.current_index - 1
      if (index === -1) {
        index = 4
      }
      this.performSwitchBook(index)
    },
  },
  template: `
  
  <div class="revenue mb-1">
    <div id="back" @click="switchPrevBook">
      <i class="fa-solid fa-angle-left"></i>
    </div>
    <div
      id="show-book"
      v-if="current_index != -1"
      @click="onViewMovie(top5_books[current_index].id)"
    >
      <div>
        <img
          class="rounded border"
          id="main-book"
          :src="top5_books[current_index].image"
          :style="{
            opacity: main_book_opacity,
          }"
        />
        <img
          id="dummy-book"
          :src="top5_books[dummy_index].image"
          :style="{
            opacity: dummy_book_opacity,
          }"
        />
        <p class="book-info book-info-title">{{ top5_books[current_index].fullTitle }}</p>
        <p class="book-info book-info-genre">{{ top5_books[current_index].genre }}</p>
        <p class="book-info book-info-rating">
          Rating: {{ top5_books[current_index].ratings.imDb }}
        </p>
        <p class="book-info book-info-runtime">
          Length: {{ top5_books[current_index].runtimeStr }}
        </p>
      </div>
    </div>
    <div id="next" @click="switchNextBook">
      <i class="fa-solid fa-angle-right"></i>
    </div>
  </div>`,
}
