import Revuenue from './Revenue.vue'
import Fling from './Fling'
export default {
  props: {
    light_mode: Boolean,
  },
  data() {
    return {}
  },
  components: {
    Revuenue,
    Fling,
  },
  template: `
  <div id="main-content" class="m-1">
    <Revuenue />
    <Fling
      section_name="Most Popular"
      :zIndex="2"
      section_url="get/top50/"
      :light_mode="light_mode"
    />
    <Fling
      section_name="Top Rating"
      :zIndex="1"
      section_url="get/mostpopular/"
      :light_mode="light_mode"
    />
  </div>`,
}
