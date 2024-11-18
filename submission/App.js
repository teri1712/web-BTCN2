import Header from '../src/components/Header.vue'
import Nav from '../src/components/Nav.vue'
import MainContent from '../src/components/MainContent.vue'
import Footer from '../src/components/Footer.vue'
import SearchResult from '../src/components/SearchResult.vue'
import MovieDetail from '../src/components/MovieDetail.vue'
import ActorDetail from '../src/components/ActorDetail.vue'

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
  template: `
  
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
  </div>`,
}
