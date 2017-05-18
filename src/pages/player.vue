<style lang="less">
  @import "../assets/color.less";
  .player {
    position: relative;
    top: 0;
    z-index: 100000;
    width: 100vw;
    height: 100vh;
    background: #333;
    .player-header {
      width: 100vw;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: @headerHeight;
      background: rgba(0,0,0,.2);
      color: #fff;
      box-shadow: 0 0 .2rem 3px rgba(0,0,0,.3);

      .iconfont {
        padding: 0 .1rem;
        font-size: .5rem;
      }
      .icon-next {
        display: inline-block;
        transform: rotate(180deg);
      }
    }
    canvas {
      position: absolute;
      z-index: -1;
      width: 100vw;
      height: 100vh;
    }
    .cricle {
      margin: 20vw auto;
      width: 50vw;
      height: 50vw;
      border-radius: 50%;
      padding: .5rem;
      background: #222;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .ctrl {
      display: flex;
      justify-content: space-between;
      position: absolute;
      bottom: 0;
      width: 100vw;
      .iconfont {
        font-size: .6rem;
        line-height: 2rem;
        width: 20%;
        text-align: center;
        &:nth-child(1) {
          // align-self: flex-start;
        }
        &.icon-zanting {
          font-size: .8rem;
        }
        &.icon-suiji {
          font-size: .5rem;
        }
        &.icon-bofangqi_shouyegequliebiao_ {
          font-size: .7rem;
        }
      }
    }
  }
</style>

<template lang="html">
  <transition name="toTop">
    <div class="player">
      <canvas ref="blur"></canvas>
      <div class="player-header">
        <i class="iconfont icon-next" @click="$router.go(-1)"></i>
        <h2 class="title">{{ $store.state.song.name }}</h2>
        <i class="iconfont icon-fenxiang"></i>
      </div>
      <div class="cricle">
        <img :src="$store.state.song.pic" :alt="$store.state.song.name">
      </div>
      <div class="ctrl">
        <i class="iconfont"
          :class="{
            'icon-danquxunhuan' : state == 0,
            'icon-liebiaoxunhuan' : state == 1,
            'icon-suiji' : state == 2
          }"
          @click="stateChange"
        ></i>
        <i class="iconfont icon-previous"></i>
        <i class="iconfont icon-zanting"></i>
        <i class="iconfont icon-next1"></i>
        <i class="iconfont icon-bofangqi_shouyegequliebiao_"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import { blur } from '../libs/index.js'
export default {
  data() {
    return {
      state: 0
    }
  },
  mounted() {
    this.blur(this.$refs.blur,this.$store.state.song.pic,5)
  },
  methods: {
    blur: blur,
    stateChange: function() {
      this.state = this.state+1 > 2 ? 0 : this.state+1
      if(this.state == 0){
        console.log(this.$refs.audio)
        console.log(document.querySelector('audio').loop=true)
      }
    }
  }
}
</script>
