import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import search from '@/components/search'
import playlist from '@/pages/playlist'

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
    }
  ]
})
