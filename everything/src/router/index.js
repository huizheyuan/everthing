import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index'
import Main from '@/views/Main'

import Mine from '@/views/Mine'
import Res from '@/views/Res'

import Log from '@/views/log'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      redirect: '/main/hot',
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
        }
      ]
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
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
      path: '/res',
      name: 'Res',
      component: Res
    },
    {
      path: '/log',
      name: 'log',
      component: Log,
      redirect: '/log/loginform',
      children: [
        {
          path: 'loginform',
          name: 'Loginform',
          component: () => import('@/components/loginform')
        },
        {
          path: 'regform',
          name: 'Regform',
          component: () => import('@/components/regform')
        }
      ]
    }
  ]
})
