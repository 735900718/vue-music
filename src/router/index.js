import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import search from '@/components/search'
import playlist from '@/pages/playlist'
import searchlist from '@/pages/search'
import player from '@/pages/player'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: playlist
    },
    {
      path: '/searchlist/:id',
      name: 'searchlist',
      component: searchlist
    },
    {
      path: '/player',
      name: 'player',
      component: player
    }
  ]
})
