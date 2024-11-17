<script>
export default {
  data() {
    return {}
  },
  props: {
    value: Boolean,
  },
  methods: {
    updateTheme() {
      this.$emit('input', !this.value)
    },
  },
}
</script>
<template>
  <div id="header" class="m-1 rounded border">
    <div class="mssv">20120220</div>
    <div class="switch-container">
      <div class="custom-control custom-switch switch-inner-container">
        <input
          type="checkbox"
          class="custom-control-input"
          id="switch-button"
          :checked="value"
          @click.prevent="updateTheme"
        />
        <label class="custom-control-label" for="switch-button">
          <i
            :class="value ? 'fa-solid fa-moon' : 'fa-solid fa-gear'"
            :style="{ color: value ? '#ffd43b' : 'black', 'vertical-align': 'bottom' }"
          ></i>
        </label>
      </div>
    </div>
    <h3 class="movie-info">Movies Info</h3>
  </div>
</template>
<style>
#header {
  padding-left: 10px;
  padding-right: 10px;
  flex: 0 0 50px;
  background-color: rgb(241, 188, 188);
  line-height: 50px;
}
.movie-info {
  margin: 0 auto;
  width: 200px;
  line-height: 50px;
  text-align: center;
  clear: none;
  font-weight: 600;
}
label {
  line-height: 20px;
  vertical-align: bottom;
}
.mssv {
  float: left;
  color: gray;
}
.switch-container {
  float: right;
}
.switch-inner-container {
  vertical-align: middle;
  display: inline-block;
  height: 20px;
}
</style>
