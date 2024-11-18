<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  data() {
    return {}
  },
  props: {
    modelValue: Boolean,
  },
  methods: {
    updateTheme() {
      this.$emit('update:modelValue', !this.modelValue)
    },
  },
}
</script>
<template>
  <div
    id="header"
    class="m-1 rounded border"
    :style="{
      backgroundColor: !modelValue ? 'darkred' : 'rgb(241, 188, 188)',
    }"
  >
    <div
      class="mssv"
      :style="{
        color: !modelValue ? 'rgb(241, 188, 188)' : 'grey',
      }"
    >
      20120220
    </div>
    <div class="switch-container">
      <div class="custom-control custom-switch switch-inner-container">
        <input
          type="checkbox"
          class="custom-control-input"
          id="switch-button"
          :checked="modelValue"
          @change.prevent="updateTheme"
        />
        <label class="custom-control-label" for="switch-button">
          <i
            :class="!modelValue ? 'fa-solid fa-moon' : 'fa-solid fa-gear'"
            :style="{ color: !modelValue ? '#ffd43b' : 'black', 'vertical-align': 'bottom' }"
          ></i>
        </label>
      </div>
    </div>
    <h3
      class="movie-info"
      :style="{
        color: !modelValue ? 'rgb(241, 188, 188)' : 'black',
      }"
    >
      Movies Info
    </h3>
  </div>
</template>
<style>
#header {
  padding-left: 10px;
  padding-right: 10px;
  flex: 0 0 50px;
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
