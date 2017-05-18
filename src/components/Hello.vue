<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../assets/color.less";
  .hello {
    padding-bottom: 12vh;
    header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: @darkColor;
      color: #fff;
      h1 {
        line-height: .8rem;
      }
    }
    .search {
      text-align: center;
    }
    .list-group {
      margin: -.2rem 0;
    }
    .list-item {
      display: flex;
      height: 2rem;
      margin: .2rem .1rem;
      img {
        width: 2rem;
        height: 2rem;
      }
      .main {
        width: 100%;
        padding: 5px;
        h3 {
          text-indent: 2em;
        }
      }
    }
    .title {
      border-left: 2px solid red;
      padding-left: .2rem;
      margin: .2rem 0;
    }
    .card-group {
      font-size: .2rem;
      display: flex;
      flex-wrap: wrap;
      margin: -.1rem;
      .card-body {
        padding: .1rem;
      }
      .card {
        width: 1/3*100%;
        display: flex;
        flex-direction: column;
        .card-img {
          img { width: 100%;}
        }
      }
    }
  }
</style>

<template>
  <div class="hello">
    <header>
      <h1 class="center">HELLO</h1>
      <h2 class="center">welcome to my style</h2>
      <search/>
    </header>
    <h2 class="title">推荐歌单 ></h2>
    <div class="card-group" v-if="gedan[5]">
      <div class="card" v-for="i in gedan"
        @click="searchGedanOne(i.id)"
        @touch="searchGedanOne(i.id)">
        <div class="card-body">
          <div class="card-img">
            <img :src="i.coverImgUrl" :alt="i.name">
          </div>
          <div class="card-title">{{ i.name }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  created(){
    this.searchGedan('纯音乐')
    this.searchGedan('古典')
    this.searchGedan('初音')
    this.searchGedan('电子')
    this.searchGedan('打游戏/写作业')
    this.searchGedan('权利的游戏')
  },
  name: 'hello',
  data () {
    return {
      data: null,
      song: null,
      gedan: [],
      selected: null,
      base: null,
      selected: 1
    }
  },
  methods: {
    searchGedan: function(string) {
      let that = this
      if(sessionStorage[string]){
        return that.gedan.push(JSON.parse(sessionStorage[string]))
      }
      this.$http.get(`https://api.imjad.cn/cloudmusic/?type=search&search_type=1000&s=${string}&limit=10`)
        .then( respones => {
          that.gedan.push(respones.data.result.playlists[0])
          sessionStorage[string] = JSON.stringify(respones.data.result.playlists[0])
        })
        .catch(error => {
          console.log(error)
        })
    },
    searchGedanOne: function(string) {
      console.log('searchGedanOne')
      let that = this
      this.$router.push('/playlist/'+string)
      if(sessionStorage[string]){
        return this.$store.commit(JSON.parse(sessionStorage[string]))
      }
      this.$http.get(`https://api.imjad.cn/cloudmusic/?type=playlist&id=${string}`)
        .then( respones => {
          console.log(string,respones.data.playlist.tracks)
          this.$store.commit({
            type: 'base',
            string: string,
            data: respones.data.playlist.tracks
          })
          sessionStorage[string] = JSON.stringify({
            type: 'base',
            string: string,
            data: respones.data.playlist.tracks
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
