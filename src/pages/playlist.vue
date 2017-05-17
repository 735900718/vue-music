<style lang="less">
  .playlist {
    font-size: .3rem;
    padding-bottom: 10vh;
    .button {
      border-radius: .1rem;
      background: #5CB024;
      color: #fff;
      text-align: center;
      line-height: 10vh;
      margin: .1rem;
    }
  }
  .list-item{
    display: flex;
    position: relative;
    padding-left: .5rem;
    justify-content:center;
    flex-direction: column;
    height: 10vh;
    &:nth-child(2n-1) {
      background: #bad5dd;
    }
    .number {
      position: absolute;
      left: 0;
      text-align: center;
      width: .5rem;
      vertical-align: 10vh;
    }
    .content {
      font-size: .2rem;
    }
  }
</style>

<template lang="html">
  <div class="playlist has-header">
    <m-header/>
    <div class="loading" v-if="!show">
      <h1>NOW LOADING!!!!</h1>
    </div>
    <template v-else>
      <div class="list-group">
        <div class="list-item"
          v-for="(i,index) in $store.state.base[$route.params.id]"
          v-if="index < showNumb"
          @click="searchMusic({id:i.id,name:i.name,pic:i.al.picUrl})">
            <div class="number">{{ index+1 }}</div>
            <h2>{{i.name}}</h2>
            <div class="content">
              <span v-for="j in i.ar">{{j.name}} </span>
              <span> -- {{i.al.name}}</span>
            </div>
        </div>
      </div>
      <div class="button" @click="showNumb+=5">
        点击查看更多
      </div>
    </template>
  </div>
</template>

<script>
import { searchMusic } from '../api/index.js'
export default {
  data() {
    return {
      showNumb: 5,
      show: false
    }
  },
  created(){
    let that = this
    let timer = setInterval(()=>{
      if(this.$store.state.base[this.$route.params.id]){
        console.log(1)
        this.show = true
        clearInterval(timer)
      }
    },100)

  },
  methods: {
    searchMusic: searchMusic
  }
}
</script>
