<style lang="less">
  .footer {
    position: fixed;
    display: flex;
    bottom: 0;
    width: 100vw;
    height: 10vh;
    background: #000;
    overflow: hidden;
    img {
      width: 10vh;
    }
    .ctrl {
      display: flex;
      i {
        padding: 0 .2rem;
        color: #fff;
        font-size: 7vh;
        line-height: 10vh;
      }
      .play {
        background: green;
      }
      .main {
        display: flex;
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
      }
    }
  }
</style>

<template lang="html">
  <div class="footer">
    <img ref="img" :src="$store.state.song.pic" :alt="$store.state.song.name" width="50">
    <audio ref="audio" :src="$store.state.song.url"></audio>
    <div class="ctrl" ref="ctrl">
      <i class="iconfont"
      :class="{
        'icon-bofang': !onPlay,
        'icon-zanting': onPlay
        }"
      @click="play()"></i>
      <div class="main">
        <p class="main-title"><h2>{{ $store.state.song.name }}</h2></p>
        <p>{{ nowTime | time}} +++++ {{songLength | time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onPlay: false,       //是否正在播放
      songLength: null,   //音乐总长度
      nowTime: null,      //播放到第几分钟
      timer: null,         //播放进度定时器
    }
  },
  mounted() {
    let that = this
    //JS控制左侧图片的宽度
    this.$refs.img.width = this.$refs.img.height
    //JS控制右侧控制器的样式属性
    this.$refs.ctrl.style.marginLeft = this.$refs.img.width + 'px'
    this.$refs.ctrl.style.width = window.innerWidth - this.$refs.img.width + 'px'
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
      }else {
        this.$refs.audio.pause()
        this.onPlay = false
      }
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
    onPlay: function(){
      let that = this
      if(this.onPlay) {
        that.timer = setInterval(function () {
          that.nowTime = Math.round(that.$refs.audio.currentTime)
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
  }
}
</script>
