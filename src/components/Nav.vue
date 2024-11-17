<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  data() {
    return {}
  },
}
</script>
<template>
  <div id="nav" class="m-1 rounded border">
    <div id="home">
      <i class="fa-solid fa-house"></i>
    </div>
    <div class="search-container">
      <form class="form-inline">
        <input class="form-control" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success my-2 my-sm-0 ml-1" type="submit">Search</button>
      </form>
    </div>
  </div>
</template>
<style>
#nav {
  padding-left: 10px;
  padding-right: 10px;
  flex: 0 0 50px;
  background-color: lightblue;
  line-height: 50px;
}
#home {
  float: left;
  cursor: pointer;
}
.form-inline {
  display: inline;
}
.search-container {
  float: right;
}
</style>
