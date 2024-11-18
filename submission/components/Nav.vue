<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  props: {
    light_mode: Boolean,
  },
  data() {
    return {
      currentQuery: '',
    }
  },
  methods: {
    submitQuery(query) {
      this.$emit('searchAction', query)
    },
  },
}
</script>
<template>
  <div
    id="nav"
    class="m-1 rounded border"
    :style="{
      backgroundColor: !light_mode ? 'darkblue' : 'lightblue',
    }"
  >
    <div
      id="home"
      @click="$emit('onHomePressed')"
      :style="{
        color: !light_mode ? 'white' : 'black',
      }"
    >
      <i class="fa-solid fa-house"></i>
    </div>
    <div class="search-container">
      <form class="form-inline" @submit.prevent="submitQuery(currentQuery)">
        <input
          class="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="currentQuery"
          :style="{
            backgroundColor: light_mode ? 'white' : '#2D2E31',
            color: light_mode ? 'grey' : 'white',
          }"
        />
        <button class="btn btn-outline-success my-2 my-sm-0 ml-1" type="submit">Search</button>
      </form>
    </div>
  </div>
</template>
<style>
#nav {
  padding-left: 10px;
  padding-right: 10px;
  flex: 0 0 50px;
  line-height: 50px;
}
#home {
  float: left;
  cursor: pointer;
}
.form-inline {
  display: inline;
}
.search-container {
  float: right;
}
</style>
