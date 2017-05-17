export function searchMusic({id,name,pic}) {
  console.log('search')
  this.$http.get(`https:\/\/api.imjad.cn\/cloudmusic\/?id=${id}`)
    .then( respones => {
      let item = respones.data.data[0]
      let data = {}
      data.name = name
      data.pic = pic
      data.url = item.url
      data.size = item.size
      data.init = true
      this.$store.commit('song',data)
      console.log(this.$refs.audio)
    })
    .catch( error => {
      console.log(error)
    })
}

export function search({type,name}) {
  console.log('search')
  //没有输入内容时不提交请求
  if(!name){return}
  let that = this
  that.data = []
  this.$http.get(`https://api.imjad.cn/cloudmusic/?type=search&search_type=${type}&limit=5&s=${name}`)
    .then( respones => {
      if(type == 1) {
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
      }else if(type == 10) {
        console.log('专辑',respones)
      }else if(type == 100) {
        console.log('歌手',respones)
      }else if(type == 1000) {
        console.log('歌单',respones)
      }
      that.$emit('getData',that.data)
    })
    .catch( error => {
      console.log(error)
    })
}
