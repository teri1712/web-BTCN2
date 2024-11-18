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
  template: `
  
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
  </div>`,
}
