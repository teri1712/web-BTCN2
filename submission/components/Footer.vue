<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  props: {
    light_mode: Boolean,
  },
  data() {
    return {}
  },
}
</script>
<template>
  <div
    class="m-1 mb-4 rounded border footer"
    :style="{
      color: light_mode ? 'black' : 'white',
    }"
  >
    &lt;footer&gt;
  </div>
</template>
<style>
.footer {
  flex: 0 0 20px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
