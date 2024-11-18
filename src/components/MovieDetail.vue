<!-- eslint-disable vue/multi-word-component-names -->
<script>
import dbFetch from '../db/provider'

export default {
  props: ['movieId'],
  data() {
    return {
      info: null,
    }
  },
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
}
</script>
<template>
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
        <li v-for="(actor, index) in info.actorList" :key="index">
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
</template>

<style>
.movie-container {
  margin: auto;
  padding: 20px;
}
.movie-header {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
.movie-poster {
  width: 300px;
  height: 450px;
  background-color: aqua;
  object-fit: cover;
}
.movie-detail {
  margin-left: 30px;
  flex: 1;
}
.movie-detail h1 {
  margin-top: 0;
  font-weight: 600;
}
.genre {
  color: #888;
}
.info-brief,
.cast,
.review {
  margin-top: 30px;
}
.cast,
.review ul {
  list-style-type: none;
  padding: 0;
}
.cast,
.review li {
  margin-bottom: 5px;
}
.review strong {
  font-style: italic;
  font-size: 1.1em;
}
</style>
