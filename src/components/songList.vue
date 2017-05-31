<style lang="less">
  @import "../assets/color.less";
  .songList {
    position: absolute;
    bottom: 0;
    width: 100vw;
    background: #fff;
    font-size: .3rem;
    line-height: .5rem;
    max-height: 9em;
    .songList-item {
      display: flex;
      align-items: center;
      &+.songList-item {
        border-top: 1px solid @lightPrimaryColor;
      }
      span:nth-child(1) {
        font-size: .2rem;
        width: .5rem;
        text-align: center;
      }
    }
  }
</style>

<template lang="html">
  <div class="songList" ref="songList"  :style=" { bottom: show? height:0} ">
    <div class="songList-item"
      v-for="(item,index,length) in $store.state.songList"
      @click="click(item)" :key="item.time">
      <span>{{ length+1 }}</span>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
    props: [ 'show' ],
    data(){
        return {
            height: '50vh'
        }
    },
    created(){

    },
    methods: {
        click: function(item){
          this.$store.commit('song',item)
        }
    }
}
</script>
