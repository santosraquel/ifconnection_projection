import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _13e33e2d = () => interopDefault(import('../src/pages/auth/index.vue' /* webpackChunkName: "pages/auth/index" */))
const _55ea9afc = () => interopDefault(import('../src/pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _75de5fd7 = () => interopDefault(import('../src/pages/login.vue' /* webpackChunkName: "pages/login" */))
const _2563d091 = () => interopDefault(import('../src/pages/medias.vue' /* webpackChunkName: "pages/medias" */))
const _1f2206ce = () => interopDefault(import('../src/pages/perfil.vue' /* webpackChunkName: "pages/perfil" */))
const _11b7b928 = () => interopDefault(import('../src/pages/singup.vue' /* webpackChunkName: "pages/singup" */))
const _d3714cfe = () => interopDefault(import('../src/pages/teste.vue' /* webpackChunkName: "pages/teste" */))
const _1cbed214 = () => interopDefault(import('../src/pages/users.vue' /* webpackChunkName: "pages/users" */))
const _2f128780 = () => interopDefault(import('../src/pages/auth/reset_password.vue' /* webpackChunkName: "pages/auth/reset_password" */))
const _a7928680 = () => interopDefault(import('../src/pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/auth",
    component: _13e33e2d,
    name: "auth"
  }, {
    path: "/dashboard",
    component: _55ea9afc,
    name: "dashboard"
  }, {
    path: "/login",
    component: _75de5fd7,
    name: "login"
  }, {
    path: "/medias",
    component: _2563d091,
    name: "medias"
  }, {
    path: "/perfil",
    component: _1f2206ce,
    name: "perfil"
  }, {
    path: "/singup",
    component: _11b7b928,
    name: "singup"
  }, {
    path: "/teste",
    component: _d3714cfe,
    name: "teste"
  }, {
    path: "/users",
    component: _1cbed214,
    name: "users"
  }, {
    path: "/auth/reset_password",
    component: _2f128780,
    name: "auth-reset_password"
  }, {
    path: "/",
    component: _a7928680,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
