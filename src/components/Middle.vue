<!-- eslint-disable vue/multi-word-component-names -->
<script>
import Revuenue from './Revenue.vue'
import Fling from './Fling.vue'
export default {
  data() {
    return {}
  },
  components: {
    Revuenue,
    Fling,
  },
}
</script>
<template>
  <div id="middle" class="m-1">
    <Revuenue />
    <Fling section_name="Most Popular" zIndex="2" />
    <Fling section_name="Top Rating" zIndex="1" />
  </div>
</template>
<style>
#middle {
  flex: 1 0;
  display: flex;
  flex-direction: column;
}
</style>
