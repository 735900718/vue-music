<template lang="html">
  <div class="header">
    <i class="iconfont icon-next" @click="$router.go(-1)"></i>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
@height: 6vh;
  .has-header {
    padding-top: @height;
  }
  .header {
    position: fixed;
    top: 0;
    z-index: 100000;
    background: red;
    width: 100vw;
    line-height: @height;
    .iconfont {
      padding: 0 .1rem;
      font-size: .5rem;
      color: #fff;
    }
    .icon-next {
      display: inline-block;
      transform: rotate(180deg);
    }
  }
</style>
