import Router from 'vue-router'

export function createRouter (ssrContext, createDefaultRouter, routerOptions) {
  const options = routerOptions || createDefaultRouter(ssrContext).options

  return new Router({
    ...options,
    routes: fixRoutes(options.routes),
  })
}

function fixRoutes (defaultRoutes) {
  // console.log(defaultRoutes)
  return defaultRoutes
}
