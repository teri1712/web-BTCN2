<script>
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
}
</script>

<template>
  <div
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
  </div>
</template>

<style>
.zoom-out {
  height: 180px;
  flex: 1 0;
  margin: 1px;
  cursor: pointer;
  position: relative;
}
.zoom-out img {
  position: relative;
  z-index: 1;
  width: 100%;
}
.img-info {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: center center;
  background-color: #181818;
  width: 100%;
  z-index: 2;
}
.img-info p {
  margin: 0;
  color: white;
  font-size: 20px;
  font-weight: 700;
  padding: 5px;
  padding-top: 0;
}
</style>
