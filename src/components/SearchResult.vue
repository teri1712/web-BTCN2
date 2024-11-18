<script>
export default {
  data() {
    return {
      book_list: [
        {
          url: '../../public/book1.jpg',
          title: 'Harry Potter',
          types: '[Comedy,Comedy]',
        },
        {
          url: '../../public/book1.jpg',
          title: 'Harry Potter',
          types: '[Comedy,Comedy]',
        },
        {
          url: '../../public/book1.jpg',
          title: 'Harry Potter',
          types: '[Comedy,Comedy]',
        },
        {
          url: '../../public/book1.jpg',
          title: 'Harry Potter',
          types: '[Comedy,Comedy]',
        },
        {
          url: '../../public/book1.jpg',
          title: 'Harry Potter',
          types: '[Comedy,Comedy]',
        },
      ],
    }
  },
}
</script>

<template>
  <div class="search-result">
    <div class="film-grid">
      <div class="book-element pb-1 c border" v-for="(book, index) in book_list" :key="index">
        <img class="mb-1" :src="book.url" />
        <p class="element-title">{{ book.title }}</p>
        <p class="element-type">{{ book.types }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.search-result {
  flex: 1 0;
}
.film-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.book-element p {
  text-align: center;
  margin: 3px;
}
.book-element img {
  width: 100%;
}
.element-title {
  font-size: 1.2em;
  font-weight: 600;
}
.element-type {
  font-size: 1em;
  color: grey;
  font-style: italic;
}
</style>
