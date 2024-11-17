<!-- eslint-disable vue/multi-word-component-names -->
<script>
import Revuenue from './Revenue.vue'
import Popular from './Popular.vue'
import Rating from './Rating.vue'
export default {
  data() {
    return {}
  },
  components: {
    Revuenue,
    Popular,
    Rating,
  },
}
</script>
<template>
  <div id="middle" class="m-1">
    <Revuenue />
    <Popular />
    <Rating />
  </div>
</template>
<style>
#middle {
  flex: 1 0;
  display: flex;
  flex-direction: column;
}
</style>
