import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _43202de7 = () => interopDefault(import('../src/pages/auth/index.vue' /* webpackChunkName: "pages/auth/index" */))
const _62f3e388 = () => interopDefault(import('../src/pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _2f6503dd = () => interopDefault(import('../src/pages/login.vue' /* webpackChunkName: "pages/login" */))
const _c69ca56a = () => interopDefault(import('../src/pages/medias.vue' /* webpackChunkName: "pages/medias" */))
const _d32038f0 = () => interopDefault(import('../src/pages/perfil.vue' /* webpackChunkName: "pages/perfil" */))
const _6e720026 = () => interopDefault(import('../src/pages/singup.vue' /* webpackChunkName: "pages/singup" */))
const _4fcdfd87 = () => interopDefault(import('../src/pages/teste.vue' /* webpackChunkName: "pages/teste" */))
const _a9b18a08 = () => interopDefault(import('../src/pages/users.vue' /* webpackChunkName: "pages/users" */))
const _2ab2ddc6 = () => interopDefault(import('../src/pages/auth/reset_password.vue' /* webpackChunkName: "pages/auth/reset_password" */))
const _65bd60c6 = () => interopDefault(import('../src/pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _43202de7,
    name: "auth"
  }, {
    path: "/dashboard",
    component: _62f3e388,
    name: "dashboard"
  }, {
    path: "/login",
    component: _2f6503dd,
    name: "login"
  }, {
    path: "/medias",
    component: _c69ca56a,
    name: "medias"
  }, {
    path: "/perfil",
    component: _d32038f0,
    name: "perfil"
  }, {
    path: "/singup",
    component: _6e720026,
    name: "singup"
  }, {
    path: "/teste",
    component: _4fcdfd87,
    name: "teste"
  }, {
    path: "/users",
    component: _a9b18a08,
    name: "users"
  }, {
    path: "/auth/reset_password",
    component: _2ab2ddc6,
    name: "auth-reset_password"
  }, {
    path: "/",
    component: _65bd60c6,
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
