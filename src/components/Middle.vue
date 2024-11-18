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
    <Fling section_name="Most Popular" />
    <Fling section_name="Top Rating" />
  </div>
</template>
<style>
#middle {
  flex: 1 0;
  display: flex;
  flex-direction: column;
}
</style>
