<!-- eslint-disable vue/multi-word-component-names -->
<script>
import ZoomOutImg from './ImgZoomOut.vue'
import dbFetch from '../db/provider'
export default {
  props: {
    section_url: String,
    section_name: String,
    zIndex: Number,
    light_mode: Boolean,
  },
  data() {
    this.movies = []
    this.fling_interval = null
    return {
      current_index: -1,
      fling_index: -1,
      fling_visible: false,
      fling_left_visible: true,
      fling_right_visible: true,
      fling_translation: 0,
    }
  },
  components: {
    ZoomOutImg,
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    async fetchItems() {
      this.movies = (await dbFetch(this.section_url + '?per_page=15&page=1')).items
      if (this.movies.length === 0) {
        return
      }
      this.current_index = 0
    },
    getDifWidth() {
      return this.$refs.film_container.clientWidth + 20
    },
    performFling(amount) {
      const index = this.current_index + amount

      if (index < 0 || index >= this.movies.length || this.fling_interval != null) return
      this.fling_index = amount < 0 ? index : this.current_index
      this.current_index = index
      this.fling_visible = true
      this.fling_left_visible = true
      this.fling_right_visible = true
      this.fling_translation = amount > 0 ? 0 : -this.getDifWidth()

      let current_time = 0
      this.fling_interval = setInterval(() => {
        current_time += 10
        if (current_time == 200) {
          if (amount < 0) {
            this.fling_right_visible = false
          } else {
            this.fling_left_visible = false
          }
        }
        const coe = amount > 0 ? current_time : 400 - current_time
        this.fling_translation = -(coe * this.getDifWidth()) / 400
        if (current_time === 400) {
          clearInterval(this.fling_interval)
          this.fling_visible = false
          this.fling_interval = null
        }
      }, 10)
    },
  },
}
</script>
<template>
  <div class="fling-container mb-4">
    <p
      class="fs-5 mb-1"
      :style="{
        color: light_mode ? 'black' : 'white',
      }"
    >
      {{ section_name }}
    </p>
    <div class="fling">
      <div id="back" @click="performFling(-3)">
        <i class="fa-solid fa-angle-left"></i>
      </div>
      <div
        class="film-container"
        ref="film_container"
        :style="{
          'z-index': zIndex,
        }"
      >
        <div class="film-list" v-if="!fling_visible && current_index != -1">
          <ZoomOutImg :book="movies[current_index]" />
          <ZoomOutImg :book="movies[current_index + 1]" />
          <ZoomOutImg :book="movies[current_index + 2]" />
        </div>

        <div
          class="film-fling"
          :style="{ left: fling_translation + 'px' }"
          v-if="fling_visible && fling_index != -1"
        >
          <div
            class="film-list-clone"
            :style="{ visibility: fling_left_visible ? 'visible' : 'hidden' }"
          >
            <div class="film-list">
              <img class="rounded border" :src="movies[fling_index].image" />
              <img class="rounded border" :src="movies[fling_index + 1].image" />
              <img class="rounded border" :src="movies[fling_index + 2].image" />
            </div>
          </div>
          <div
            class="film-list-clone"
            :style="{ visibility: fling_right_visible ? 'visible' : 'hidden' }"
          >
            <div class="film-list">
              <img class="rounded border" :src="movies[fling_index + 3].image" />
              <img class="rounded border" :src="movies[fling_index + 4].image" />
              <img class="rounded border" :src="movies[fling_index + 5].image" />
            </div>
          </div>
        </div>
      </div>
      <div id="next" @click="performFling(3)">
        <i class="fa-solid fa-angle-right"></i>
      </div>
    </div>
  </div>
</template>
<style>
.fling-container {
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
}
.fling-container p {
  font-weight: 600;
  font-size: 1.2em;
}
.fling {
  flex: 1 0;
  display: flex;
  align-items: center;
}
.film-container {
  flex: 1 0;
  height: 180px;
  position: relative;
}
.film-list {
  display: flex;
  position: relative;
  z-index: 1;
}
.film-list-clone {
  display: inline-block;
  width: 100%;
  margin-right: 20px;
}
.film-fling {
  top: 0;
  position: absolute;
  height: 100%;
  white-space: nowrap;
  overflow-x: visible;
  width: 100%;
  z-index: 2;
}
.film-list img {
  height: 180px;
  flex: 1 0;
}
#back,
#next {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 50px;
}
.film-fling img {
  margin: 1px;
}
</style>
