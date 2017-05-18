<template lang="html">
  <div class="search">
    <select v-model="selected">
      <option value="1">歌曲</option>
      <option value="10">专辑</option>
      <option value="100">歌手</option>
      <option value="1000">歌单</option>
    </select>
    <input type="text" v-model="songName" @keydown.enter="search({name:songName})">
  </div>
</template>

<script>
import { searchOneMusic } from '../api/index.js'
export default {
  data () {
    return {
      selected: 1,
      songName: null,
      data: []
    }
  },
  methods: {
    search: searchOneMusic
  },
  watch: {
    selected() {
      if(this.selected!=1) {
        alert('作者太懒了，搜索其他功能还没实现，目前只能搜索歌曲')
        this.selected = 1
      }
    }
  }
}
</script>

<style lang="less">
  @import "../assets/color.less";
  .search{
    display: flex;
    justify-content: center;
    padding: .1rem 0;
    height: .5rem;
    select,
    input{
      color: @primaryTextColor;
    }
  }
</style>
