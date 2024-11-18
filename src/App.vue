<script>
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
import Middle from './components/Middle.vue'
import Footer from './components/Footer.vue'
export default {
  data() {
    return {
      light_mode: true,
    }
  },
  methods: {},
  components: {
    Header,
    Nav,
    Middle,
    Footer,
  },
}
</script>
<template>
  <Header v-model="light_mode" />
  <Nav />
  <Middle />
  <Footer />
</template>

<style></style>
