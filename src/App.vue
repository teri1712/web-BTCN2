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
      show_search: true,
    }
  },
  methods: {},
  components: {
    Header,
    Nav,
    MainContent,
    Footer,
    SearchResult,
  },
}
</script>
<template>
  <Header v-model="light_mode" />
  <Nav />
  <MainContent v-if="!show_search" />
  <SearchResult v-else />
  <Footer />
</template>

<style></style>
