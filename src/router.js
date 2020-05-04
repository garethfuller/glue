import Vue from 'vue'
import VueRouter from 'vue-router'
import * as Pages from './pages'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Pages.Index }
]

Object.keys(Pages.components).forEach(component => {
  routes.push({
    path: `/components/${Pages.components[component].name}`,
    component: Pages.components[component]
  })
})

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
