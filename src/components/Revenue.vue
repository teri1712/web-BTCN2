<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  data() {
    this.dummy_book_interval = null
    this.current_index = 0
    this.top5_books = [
      '../../public/book1.jpg',
      '../../public/book2.jpeg',
      '../../public/book1.jpg',
      '../../public/book2.jpeg',
      '../../public/book1.jpg',
    ]
    return {
      current_book: '../../public/book1.jpg',
      dummy_book: '../../public/book2.jpeg',
      dummy_book_opacity: 0,
      main_book_opacity: 1,
    }
  },
  methods: {
    performSwitchBook(next_book) {
      this.dummy_book = this.current_book
      this.current_book = next_book

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
      this.current_index++
      if (this.current_index === 5) {
        this.current_index = 0
      }
      this.performSwitchBook(this.top5_books[this.current_index])
    },
    switchPrevBook() {
      this.current_index--
      if (this.current_index === -1) {
        this.current_index = 4
      }
      this.performSwitchBook(this.top5_books[this.current_index])
    },
  },
}
</script>
<template>
  <div class="revenue mb-1">
    <div id="back" @click="switchPrevBook">
      <i class="fa-solid fa-angle-left"></i>
    </div>
    <div id="show-book">
      <div>
        <img
          id="main-book"
          :src="current_book"
          :style="{
            opacity: main_book_opacity,
          }"
        />
        <img
          id="dummy-book"
          :src="dummy_book"
          :style="{
            opacity: dummy_book_opacity,
          }"
        />
      </div>
    </div>
    <div id="next" @click="switchNextBook">
      <i class="fa-solid fa-angle-right"></i>
    </div>
  </div>
</template>
<style>
.revenue {
  display: flex;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
  flex: 1 1;
}
#show-book {
  flex: 1 0;
  background: coral;
}
#show-book img {
  position: absolute;
  height: 100%;
}
#show-book div {
  position: relative;
  height: 500px;
  width: 323px;
  margin: 0 auto;
}
#main-book {
  z-index: 1;
}
#dummy-book {
  z-index: 2;
}
#back,
#next {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 50px;
}
</style>
