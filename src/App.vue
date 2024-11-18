<script>
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
import MainContent from './components/MainContent.vue'
import Footer from './components/Footer.vue'
import SearchResult from './components/SearchResult.vue'
import MovieDetail from './components/MovieDetail.vue'
import ActorDetail from './components/ActorDetail.vue'

export default {
  data() {
    return {
      light_mode: true,
      searchQuery: null,
      movieId: null,
      actorInfo: null,
    }
  },
  provide() {
    return {
      onViewMovie: this.handleViewMovie,
      onViewActor: this.handleViewActor,
    }
  },
  methods: {
    handleSearch(pattern) {
      if (pattern.length === 0) {
        return
      }
      this.searchQuery = pattern
      this.movieId = null
      this.actorInfo = null
    },
    handleHomePressed() {
      this.searchQuery = null
      this.movieId = null
      this.actorInfo = null
    },
    handleViewMovie(movie) {
      this.searchQuery = null
      this.actorInfo = null
      this.movieId = movie
    },
    handleViewActor(actor) {
      this.searchQuery = null
      this.actorInfo = actor
      this.movieId = null
    },
  },
  components: {
    Header,
    Nav,
    MainContent,
    Footer,
    SearchResult,
    MovieDetail,
    ActorDetail,
  },
  watch: {
    light_mode(light) {
      document.documentElement.style.backgroundColor = light ? 'white' : '#2D2E31'
    },
  },
}
</script>
<template>
  <div id="app">
    <Header v-model="light_mode" />
    <Nav @searchAction="handleSearch" @onHomePressed="handleHomePressed" :light_mode="light_mode" />
    <MainContent
      v-if="searchQuery == null && movieId == null && actorInfo == null"
      :light_mode="light_mode"
    />
    <SearchResult v-if="searchQuery != null" :query="searchQuery" />
    <MovieDetail v-if="movieId != null" :movieId="movieId" />
    <ActorDetail v-if="actorInfo != null" :info="actorInfo" />
    <Footer :light_mode="light_mode" />
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  margin-right: 50px;
  height: 100%;
  overflow-x: hidden;
}
</style>
