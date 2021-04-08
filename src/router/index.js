import { createRouter, createWebHashHistory } from 'vue-router'
//import App from '../App.vue'
import Game from '@/pages/Game.vue'
import Home from '@/pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game/:channel_name',
    name: 'Game',
    props: true,
    component: Game
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
