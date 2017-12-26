import Vue from 'vue'
import Router from 'vue-router'
import Maincontent from '@/components/Maincontent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Maincontent',
      component: Maincontent
    }
  ]
})
