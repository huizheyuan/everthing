import Vue from 'vue'
import Router from 'vue-router'

import index from '@/views/index'
import home from '@/views/home'
import mine from '@/views/mine'
import detail from '@/views/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/home/hot',
      children: [
        {
          path: 'hot',
          name: 'Hot',
          component: () => import('@/components/Hot')
        },
        {
          path: 'social',
          name: 'Social',
          component: () => import('@/components/Social')
        },
        {
          path: 'emotion',
          name: 'Emotion',
          component: () => import('@/components/emotion')
        },
        {
          path: 'other',
          name: 'Other',
          component: () => import('@/components/other')
        }
      ]
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine,
      redirect: '/mine/personal',
      children: [
        {
          path: 'personal',
          name: 'Personal',
          component: () => import('@/components/Personal')
        },
        {
          path: 'setting',
          name: 'Setting',
          component: () => import('@/components/Setting')
        }
      ]
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import('@/views/reg')
    }
  ]
})
