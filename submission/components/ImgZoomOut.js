export default {
  data() {
    this.view_info_interval = null
    return {
      viewInfo: false,
      info_scale: 1,
    }
  },
  inject: ['onViewMovie'],
  props: ['book'],
  methods: {
    openViewInfo() {
      if (this.view_info_interval != null) {
        clearInterval(this.view_info_interval)
      }
      this.viewInfo = true
      this.view_info_interval = setInterval(() => {
        const scale = this.info_scale + 0.02
        this.info_scale = Math.min(1.2, scale)
        if (scale >= 1.2) {
          clearInterval(this.view_info_interval)
          this.view_info_interval = null
        }
      }, 20)
    },
    closeViewInfo() {
      if (this.view_info_interval != null) {
        clearInterval(this.view_info_interval)
      }
      this.view_info_interval = setInterval(() => {
        const scale = this.info_scale - 0.02
        this.info_scale = Math.max(1, scale)
        if (scale <= 1) {
          clearInterval(this.view_info_interval)
          this.view_info_interval = null
          this.viewInfo = false
        }
      }, 20)
    },
  },
  template: ` <div
    class="zoom-out"
    @mouseenter="openViewInfo"
    @mouseleave="closeViewInfo"
    @click="onViewMovie(book.id)"
  >
    <img class="rounded border" :src="book.image" />
    <div
      class="img-info rounded border"
      v-if="viewInfo"
      :style="{
        transform: 'scale(' + info_scale + ')',
      }"
    >
      <img :src="book.image" />
      <p>{{ book.title }}</p>
    </div>
  </div>`,
}
