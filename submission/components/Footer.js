export default {
  props: {
    light_mode: Boolean,
  },
  data() {
    return {}
  },
  template: `
  <div
    class="m-1 mb-4 rounded border footer"
    :style="{
      color: light_mode ? 'black' : 'white',
    }"
  >
    &lt;footer&gt;
  </div>`,
}
