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
          component: () => import('@/views/catalogs/hot')
        },
        {
          path: 'social',
          name: 'Social',
          component: () => import('@/views/catalogs/social')
        },
        {
          path: 'emotion',
          name: 'Emotion',
          component: () => import('@/views/catalogs/emotion')
        },
        {
          path: 'other',
          name: 'Other',
          component: () => import('@/views/catalogs/other')
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
          component: () => import('@/components/personal')
        },
        {
          path: 'setting',
          name: 'Setting',
          component: () => import('@/components/setting')
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
