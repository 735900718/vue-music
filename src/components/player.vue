<style lang="less">
  .footer {
    position: fixed;
    display: flex;
    bottom: 0;
    width: 100vw;
    height: 1rem;
    background: #222;
    overflow: hidden;
    img {
      width: 1rem;
    }
    .ctrl {
      display: flex;
      width: 100%;
      &>i {
        padding: 0 .2rem;
        color: #fff;
        font-size: .7rem;
        line-height: 1rem;
      }
      .play {
        background: green;
      }
      .main {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        font-size: .28rem;
        color: #fff;
        .main-title {
          line-height: .2rem;
          overflow: hidden;
          h2 {
            padding-left: -20px;
          }
        }
        .range {
          display: flex;
          align-items: center;
          padding-right: .5rem;
          span {
            flex-grow: 0;
          }
          .rangeCtrl {
            display: flex;
            align-items: center;
            flex-grow: 2;
            margin: 0 .2rem;
            height: 2px;
            background: #aaa;
            .now {
              display: block;
              transition: width 1s;
              height: 100%;
              background: red;
            }
            .iconfont {
              display: block;
              font-size: .2rem;
              line-height: .3rem;
              margin:  0 -.1rem;
            }
          }
        }
      }
    }
  }
</style>

<template lang="html">
  <div class="footer">
    <img ref="img"
      :src="$store.state.song.pic"
      :alt="$store.state.song.name"
      @click="goPlayer">
    <audio ref="audio" :src="$store.state.song.url"></audio>
    <div class="ctrl" ref="ctrl">
      <i class="iconfont"
      :class="{
        'icon-bofang': !onplay,
        'icon-zanting': onplay
        }"
      @click="play()"></i>
      <div class="main">
        <p class="main-title"><h2>{{ $store.state.song.name }}</h2></p>
        <div class="range">
          <span>{{ nowTime | time}}</span>
          <div class="rangeCtrl">
            <i class="now"
            :style="{ width : Math.round((nowTime/songLength)*100)+'%' }"></i>
            <i class="iconfont icon-yuan"></i>
          </div>
          <span>{{songLength | time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songLength: null,   //音乐总长度
      nowTime: null,      //播放到第几分钟
      timer: null,        //播放进度定时器
    }
  },
  mounted() {
    let that = this
    //当歌曲加载完毕时，获取歌曲的长度
    this.$refs.audio.oncanplay = function() {
      that.songLength = Math.round(this.duration)
    }
  },
  methods: {
    play: function() {
      if(this.$refs.audio.paused){
        this.$refs.audio.play()
        this.onPlay = true
        this.$store.commit('play')
      }else {
        this.$refs.audio.pause()
        this.onPlay = false
        this.$store.commit('play')
      }
    },
    goPlayer: function() {
      if(!this.$store.state.song.name){return}
      this.$router.push('/player')
    }
  },
  filters: {
    time: function(value) {
      if (value%60 < 10) {
        return Math.floor(value/60) + ':0' + value%60
      }else {
        return Math.floor(value/60) + ':' + value%60
      }
    }
  },
  watch: {
    onplay: function(){
      let that = this
      if(this.onPlay) {
        that.timer = setInterval(function () {
          that.nowTime = Math.round(that.$refs.audio.currentTime)
          // console.log(Math.round((that.nowTime/that.songLength)*100))
          if(that.nowTime == that.songLength) {
            that.onPlay = false
            clearInterval(that.timer)
          }
        }, 1000);
      }else {
        clearInterval(that.timer)
      }
    },
    songLength: function() {
      console.log('init')
      this.nowTime = null
    }
  },
  computed: {
    onplay(){
      return this.$store.state.song.onplay
    }
  }
}
</script>
