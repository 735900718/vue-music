<template lang="html">
  <div class="search-header">
    <select v-model="selected">
      <option value="1">歌曲</option>
      <option value="10">专辑</option>
      <option value="100">歌手</option>
      <option value="1000">歌单</option>
    </select>
    <input type="text" v-model="songName"
      @keydown.enter="search({
        type: selected,
        name: songName
        })">
  </div>
</template>

<script>
import { search } from '../api/index.js'
export default {
  data() {
    return {
      data: null
    }
  },
  methods: {
    search: search
  }
}
</script>

<style lang="css">
</style>
