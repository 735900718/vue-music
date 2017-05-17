<template>
  <div id="app">
    <router-view></router-view>
    <player/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
  #app {
    height: 100vh;
    h1 { font-size: .5rem;}
    h2 { font-size: .3rem;}
    h3 { font-size: .2rem;}
  }
  .center {
    text-align: center;
  }
</style>
