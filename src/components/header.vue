<template lang="html">
  <div class="header">
    <i class="iconfont icon-next" @click="$router.go(-1)"></i>
    <h2 class="title">歌单</h2>
    <i class="iconfont icon-fenxiang"></i>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
  @import "../assets/color.less";
  .has-header { padding-top: @headerHeight; }
  .header {
    position: fixed;
    top: 0;
    z-index: 1000;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: @darkColor;
    height: @headerHeight;
    color: #fff;

    .iconfont {
      padding: 0 .1rem;
      font-size: .5rem;
    }
    .icon-next {
      display: inline-block;
      transform: rotate(180deg);
    }
  }
</style>
