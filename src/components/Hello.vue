<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .hello {
    padding-bottom: 12vh;
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
    .icon-551488821353490553221 {
      font-size: .5rem;
      color: red;
    }
  }
</style>

<template>
  <div class="hello">
    <h1 class="center"><i class="iconfont icon-551488821353490553221"></i> HELLO</h1>
    <h2 class="center">welcome to my style</h2>
    <div class="search">
      <select v-model="selected">
        <option value="1">歌曲</option>
        <option value="10">专辑</option>
        <option value="100">歌手</option>
        <option value="1000">歌单</option>
      </select>
      <input type="text" v-model="songName" @keydown.enter="search(songName)">
    </div>
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
    <div class="list-group">
      <div class="list-item" v-for="i in data" @click="turnMusic(i)">
        <img :src="i.pic" alt="i.name">
        <div class="main">
          <h2>{{ i.name }}</h2>
          <h3>{{ ' -- ' + i.ar }}</h3>
        </div>
      </div>
    </div>
    <div class="boom">
      {{ data }}
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
      songName: '',
      base: null
    }
  },
  methods: {
    search: function(string) {
      console.log('search')
      //没有输入内容时不提交请求
      if(!string){return}
      let that = this
      that.data = []
      this.$http.get(`https://api.imjad.cn/cloudmusic/?type=search&search_type=${that.selected}&limit=5&s=${string}`)
        .then( respones => {
          if(that.selected == 1) {
            let i = respones.data.result.songs
            for (let j=0,len=i.length;j<len;j++){
              let data = {
                name : i[j].name,
                ar : i[j].ar[0].name,
                pic : i[j].al.picUrl,
                id : i[j].id
              }
              that.data.push(data)
            }
          }else if(that.selected == 10) {
            console.log('专辑',respones)
          }
        })
        .catch( error => {
          console.log(error)
        })
    },
    turnMusic: function(i) {
      let that = this
      let data = {
        name: i.name,
        pic: i.pic
      }
      this.$http.get(`https://api.imjad.cn/cloudmusic/?id=${i.id}`)
        .then( respones => {
          let item = respones.data.data[0]
          data.url = item.url
          data.size = item.size
          this.$store.commit('song',data)
        })
        .catch( error => {
          console.log(error)
        })
    },
    searchGedan: function(string) {
      console.log('searchGedan')
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
