<script>
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
import MainContent from './components/MainContent.vue'
import Footer from './components/Footer.vue'
import SearchResult from './components/SearchResult.vue'

export default {
  data() {
    return {
      light_mode: true,
      searchQuery: null,
    }
  },
  methods: {
    handleSearch(pattern) {
      if (pattern == null) {
        this.searchQuery = null
        return
      }
      this.searchQuery = pattern
    },
  },
  components: {
    Header,
    Nav,
    MainContent,
    Footer,
    SearchResult,
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
    <Nav @searchAction="handleSearch" :light_mode="light_mode" />
    <SearchResult v-if="searchQuery != null" :query="searchQuery" />
    <MainContent v-else :light_mode="light_mode" />
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
