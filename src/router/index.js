import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Ask from '@/components/Ask'
import Index from '@/components/Index'
import Letters from '@/components/Letters'
import PostTopic from '@/components/PostTopic'
import SelfMessage from '@/components/SelfMessage'
import SelfSpace from '@/components/SelfSpace'
import Chart from '@/components/Chart'
import Edit from '@/components/Edit'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/ask',
      name: 'Ask',
      component: Ask
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/letters',
      name: 'Letters',
      component: Letters
    },
    {
      path: '/postTopic',
      name: 'PostTopic',
      component: PostTopic
    },
    {
      path: '/selfMessage',
      name: 'SelfMessage',
      component: SelfMessage
    },
    {
      path: '/selfSpace',
      name: 'SelfSpace',
      component: SelfSpace
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Chart
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    }
  ]
})
