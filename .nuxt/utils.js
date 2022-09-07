import Vue from 'vue'
import { isSamePath as _isSamePath, joinURL, normalizeURL, withQuery, withoutTrailingSlash } from 'ufo'

// window.{{globals.loadedCallback}} hook
// Useful for jsdom testing or plugins (https://github.com/tmpvar/jsdom#dealing-with-asynchronous-script-loading)
if (process.client) {
  window.onNuxtReadyCbs = []
  window.onNuxtReady = (cb) => {
    window.onNuxtReadyCbs.push(cb)
  }
}

export function createGetCounter (counterObject, defaultKey = '') {
  return function getCounter (id = defaultKey) {
    if (counterObject[id] === undefined) {
      counterObject[id] = 0
    }
    return counterObject[id]++
  }
}

export function empty () {}

export function globalHandleError (error) {
  if (Vue.config.errorHandler) {
    Vue.config.errorHandler(error)
  }
}

export function interopDefault (promise) {
  return promise.then(m => m.default || m)
}

export function hasFetch(vm) {
  return vm.$options && typeof vm.$options.fetch === 'function' && !vm.$options.fetch.length
}
export function purifyData(data) {
  if (process.env.NODE_ENV === 'production') {
    return data
  }

  return Object.entries(data).filter(
    ([key, value]) => {
      const valid = !(value instanceof Function) && !(value instanceof Promise)
      if (!valid) {
        console.warn(`${key} is not able to be stringified. This will break in a production environment.`)
      }
      return valid
    }
    ).reduce((obj, [key, value]) => {
      obj[key] = value
      return obj
    }, {})
}
export function getChildrenComponentInstancesUsingFetch(vm, instances = []) {
  const children = vm.$children || []
  for (const child of children) {
    if (child.$fetch) {
      instances.push(child)
      continue; // Don't get the children since it will reload the template
    }
    if (child.$children) {
      getChildrenComponentInstancesUsingFetch(child, instances)
    }
  }
  return instances
}

export function applyAsyncData (Component, asyncData) {
  if (
    // For SSR, we once all this function without second param to just apply asyncData
    // Prevent doing this for each SSR request
    !asyncData && Component.options.__hasNuxtData
  ) {
    return
  }

  const ComponentData = Component.options._originDataFn || Component.options.data || function () { return {} }
  Component.options._originDataFn = ComponentData

  Component.options.data = function () {
    const data = ComponentData.call(this, this)
    if (this.$ssrContext) {
      asyncData = this.$ssrContext.asyncData[Component.cid]
    }
    return { ...data, ...asyncData }
  }

  Component.options.__hasNuxtData = true

  if (Component._Ctor && Component._Ctor.options) {
    Component._Ctor.options.data = Component.options.data
  }
}

export function sanitizeComponent (Component) {
  // If Component already sanitized
  if (Component.options && Component._Ctor === Component) {
    return Component
  }
  if (!Component.options) {
    Component = Vue.extend(Component) // fix issue #6
    Component._Ctor = Component
  } else {
    Component._Ctor = Component
    Component.extendOptions = Component.options
  }
  // If no component name defined, set file path as name, (also fixes #5703)
  if (!Component.options.name && Component.options.__file) {
    Component.options.name = Component.options.__file
  }
  return Component
}

export function getMatchedComponents (route, matches = false, prop = 'components') {
  return Array.prototype.concat.apply([], route.matched.map((m, index) => {
    return Object.keys(m[prop]).map((key) => {
      matches && matches.push(index)
      return m[prop][key]
    })
  }))
}

export function getMatchedComponentsInstances (route, matches = false) {
  return getMatchedComponents(route, matches, 'instances')
}

export function flatMapComponents (route, fn) {
  return Array.prototype.concat.apply([], route.matched.map((m, index) => {
    return Object.keys(m.components).reduce((promises, key) => {
      if (m.components[key]) {
        promises.push(fn(m.components[key], m.instances[key], m, key, index))
      } else {
        delete m.components[key]
      }
      return promises
    }, [])
  }))
}

export function resolveRouteComponents (route, fn) {
  return Promise.all(
    flatMapComponents(route, async (Component, instance, match, key) => {
      // If component is a function, resolve it
      if (typeof Component === 'function' && !Component.options) {
        try {
          Component = await Component()
        } catch (error) {
          // Handle webpack chunk loading errors
          // This may be due to a new deployment or a network problem
          if (
            error &&
            error.name === 'ChunkLoadError' &&
            typeof window !== 'undefined' &&
            window.sessionStorage
          ) {
            const timeNow = Date.now()
            const previousReloadTime = parseInt(window.sessionStorage.getItem('nuxt-reload'))

            // check for previous reload time not to reload infinitely
            if (!previousReloadTime || previousReloadTime + 60000 < timeNow) {
              window.sessionStorage.setItem('nuxt-reload', timeNow)
              window.location.reload(true /* skip cache */)
            }
          }

          throw error
        }
      }
      match.components[key] = Component = sanitizeComponent(Component)
      return typeof fn === 'function' ? fn(Component, instance, match, key) : Component
    })
  )
}

export async function getRouteData (route) {
  if (!route) {
    return
  }
  // Make sure the components are resolved (code-splitting)
  await resolveRouteComponents(route)
  // Send back a copy of route with meta based on Component definition
  return {
    ...route,
    meta: getMatchedComponents(route).map((Component, index) => {
      return { ...Component.options.meta, ...(route.matched[index] || {}).meta }
    })
  }
}

export async function setContext (app, context) {
  // If context not defined, create it
  if (!app.context) {
    app.context = {
      isStatic: process.static,
      isDev: true,
      isHMR: false,
      app,
      store: app.store,
      payload: context.payload,
      error: context.error,
      base: app.router.options.base,
      env: {"LESSOPEN":"| /usr/bin/lesspipe %s","npm_package_devDependencies_firebase_tools":"^10.5.0","npm_package_devDependencies_babel_core":"7.0.0-bridge.0","npm_package_devDependencies__nuxtjs_eslint_module":"^3.0.2","npm_package_devDependencies__nuxt_typescript_build":"^2.1.0","npm_package_dependencies_vue_template_compiler":"^2.6.14","USER":"abelha","LC_TIME":"pt_BR.UTF-8","npm_package_devDependencies_jest":"^27.4.4","npm_package_devDependencies__nuxt_types":"^2.15.8","npm_config_version_commit_hooks":"true","npm_config_user_agent":"yarn/1.22.19 npm/? node/v16.17.0 linux x64","npm_package_devDependencies__nuxt_postcss8":"^1.1.3","npm_package_dependencies_vue":"^2.6.14","npm_config_bin_links":"true","XDG_SESSION_TYPE":"wayland","npm_node_execpath":"/home/abelha/.nvm/versions/node/v16.17.0/bin/node","npm_package_devDependencies_vue_jest":"^3.0.4","npm_config_init_version":"1.0.0","SHLVL":"1","HOME":"/home/abelha","npm_package_devDependencies_stylelint_config_recommended_vue":"^1.1.0","npm_package_devDependencies_eslint_plugin_nuxt":"^3.1.0","npm_package_dependencies_vue_the_mask":"^0.11.1","DESKTOP_SESSION":"ubuntu","NVM_BIN":"/home/abelha/.nvm/versions/node/v16.17.0/bin","npm_package_dependencies_jspdf":"^2.5.1","npm_package_dependencies__types_js_cookie":"^3.0.1","NVM_INC":"/home/abelha/.nvm/versions/node/v16.17.0/include/node","npm_config_init_license":"MIT","GNOME_SHELL_SESSION_MODE":"ubuntu","GTK_MODULES":"gail:atk-bridge","YARN_WRAP_OUTPUT":"false","npm_package_devDependencies__nuxtjs_vuetify":"^1.12.3","npm_package_dependencies__nuxtjs_firebase":"^8.2.2","npm_config_version_tag_prefix":"v","LC_MONETARY":"pt_BR.UTF-8","LC_CTYPE":"pt_BR.UTF-8","npm_package_devDependencies_stylelint_config_standard":"^24.0.0","npm_package_dependencies_webpack":"^4.46.0","npm_package_scripts_lint_style":"stylelint \"**/*.{css,scss,sass,html,vue}\" --ignore-path .gitignore","DBUS_STARTER_BUS_TYPE":"session","SYSTEMD_EXEC_PID":"2022","DBUS_SESSION_BUS_ADDRESS":"unix:path=/run/user/1000/bus,guid=767e7e92f2559209f26a7da2630fe4a5","npm_package_dependencies_moment":"^2.29.2","npm_package_dependencies__nuxtjs_pwa":"^3.3.5","COLORTERM":"truecolor","npm_package_description":"## Build Setup","npm_package_dependencies_algoliasearch":"^4.13.0","NVM_DIR":"/home/abelha/.nvm","npm_package_readmeFilename":"README.md","npm_package_dependencies_nuxt":"^2.15.8","IM_CONFIG_PHASE":"1","WAYLAND_DISPLAY":"wayland-0","npm_package_devDependencies_babel_jest":"^27.4.4","npm_package_scripts_dev":"concurrently \"nuxt\" \"yarn functions:watch\" \"yarn emulator\"","FORCE_COLOR":"3","LOGNAME":"abelha","npm_package_dependencies_vuetify_js_utils":"^0.5.10","_":"/home/abelha/.nvm/versions/node/v16.17.0/bin/yarn","npm_package_devDependencies_ts_jest":"^27.1.1","npm_package_dependencies_firebase_config":"^0.0.2","npm_package_private":"true","XDG_SESSION_CLASS":"user","npm_package_devDependencies__types_uuid":"^8.3.4","npm_package_scripts_lint":"yarn lint:js && yarn lint:style","npm_config_registry":"https://registry.yarnpkg.com","USERNAME":"abelha","TERM":"xterm-256color","npm_package_devDependencies_stylelint":"^14.1.0","npm_package_devDependencies__types_lodash":"^4.14.180","npm_package_dependencies_vuetify":"^2.6.4","npm_package_dependencies_core_js":"^3.19.3","npm_package_dependencies_cookieparser":"^0.1.0","GNOME_DESKTOP_SESSION_ID":"this-is-deprecated","npm_package_devDependencies__nuxtjs_router":"^1.7.0","npm_package_scripts_start":"nuxt start","npm_config_ignore_scripts":"","npm_package_scripts_download_firebase_config":"dotenv -- cross-var firebase apps:sdkconfig web %APP_ID% --json > firebase-config.json -P %PROJECT_ID%","PATH":"/tmp/yarn--1661995022535-0.13800130460801374:/home/abelha/TCC Raquel/projecao/node_modules/.bin:/home/abelha/.config/yarn/link/node_modules/.bin:/home/abelha/.yarn/bin:/home/abelha/.nvm/versions/node/v16.17.0/libexec/lib/node_modules/npm/bin/node-gyp-bin:/home/abelha/.nvm/versions/node/v16.17.0/lib/node_modules/npm/bin/node-gyp-bin:/home/abelha/.nvm/versions/node/v16.17.0/bin/node_modules/npm/bin/node-gyp-bin:/home/abelha/.nvm/versions/node/v16.17.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin","NODE":"/home/abelha/.nvm/versions/node/v16.17.0/bin/node","SESSION_MANAGER":"local/abelha-Raquel:@/tmp/.ICE-unix/2022,unix/abelha-Raquel:/tmp/.ICE-unix/2022","npm_package_devDependencies_postcss_html":"^1.3.0","npm_package_devDependencies__nuxtjs_eslint_config_typescript":"^8.0.0","npm_package_devDependencies__babel_eslint_parser":"^7.16.3","npm_package_dependencies_cross_var":"^1.1.0","npm_package_scripts_lint_js":"eslint --ext \".js,.ts,.vue\" --ignore-path .gitignore .","npm_package_name":"if-connection","XDG_MENU_PREFIX":"gnome-","LC_ADDRESS":"pt_BR.UTF-8","GNOME_TERMINAL_SCREEN":"/org/gnome/Terminal/screen/6dc75e9b_444a_42ea_a0e1_88b5a348273b","GNOME_SETUP_DISPLAY":":1","XDG_RUNTIME_DIR":"/run/user/1000","npm_package_scripts_emulator":"firebase emulators:start --import emulator --export-on-exit emulator --only firestore,storage,functions,auth","DISPLAY":":0","npm_package_devDependencies_vuex_module_decorators":"^2.0.0","npm_package_scripts_functions_watch":"cd functions && yarn build --watch","LANG":"en_US.UTF-8","XDG_CURRENT_DESKTOP":"ubuntu:GNOME","LC_TELEPHONE":"pt_BR.UTF-8","npm_package_devDependencies_eslint":"^8.4.1","npm_package_devDependencies__vue_test_utils":"^1.3.0","npm_package_dependencies_firebase_admin":"^10.0.2","XMODIFIERS":"@im=ibus","XDG_SESSION_DESKTOP":"ubuntu","XAUTHORITY":"/run/user/1000/.mutter-Xwaylandauth.MC5ER1","LS_COLORS":"rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:","GNOME_TERMINAL_SERVICE":":1.703","npm_lifecycle_script":"concurrently \"nuxt\" \"yarn functions:watch\" \"yarn emulator\"","SSH_AGENT_LAUNCHER":"gnome-keyring","SSH_AUTH_SOCK":"/run/user/1000/keyring/ssh","npm_package_devDependencies_concurrently":"^7.1.0","npm_package_scripts_test":"jest","npm_config_version_git_message":"v%s","SHELL":"/bin/bash","LC_NAME":"pt_BR.UTF-8","npm_lifecycle_event":"dev","npm_package_dependencies_vuedraggable":"^2.24.3","npm_package_dependencies_jquery":"^3.6.1","npm_package_version":"1.0.0","QT_ACCESSIBILITY":"1","GDMSESSION":"ubuntu","npm_config_argv":"{\"remain\":[],\"cooked\":[\"run\",\"dev\"],\"original\":[\"dev\"]}","npm_package_dependencies_dotenv_cli":"^5.0.0","npm_package_scripts_build":"nuxt build","LESSCLOSE":"/usr/bin/lesspipe %s %s","npm_package_dependencies_lodash":"^4.17.21","LC_MEASUREMENT":"pt_BR.UTF-8","npm_package_dependencies__nuxt_content":"^1.15.1","npm_config_version_git_tag":"true","npm_config_version_git_sign":"","LC_IDENTIFICATION":"pt_BR.UTF-8","npm_package_scripts_generate":"nuxt generate","npm_config_strict_ssl":"true","QT_IM_MODULE":"ibus","npm_package_dependencies_js_cookie":"^3.0.1","npm_package_dependencies_firebase":"^9.6.9","npm_package_scripts_lintfix":"yarn lint:js --fix && yarn lint:style --fix","PWD":"/home/abelha/TCC Raquel/projecao","npm_execpath":"/home/abelha/.nvm/versions/node/v16.17.0/lib/node_modules/yarn/bin/yarn.js","XDG_CONFIG_DIRS":"/etc/xdg/xdg-ubuntu:/etc/xdg","NVM_CD_FLAGS":"","DBUS_STARTER_ADDRESS":"unix:path=/run/user/1000/bus,guid=767e7e92f2559209f26a7da2630fe4a5","XDG_DATA_DIRS":"/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop","npm_package_devDependencies__nuxtjs_stylelint_module":"^4.1.0","npm_package_dependencies_vue_server_renderer":"^2.6.14","LC_NUMERIC":"pt_BR.UTF-8","npm_package_devDependencies_eslint_plugin_vue":"^8.2.0","npm_config_save_prefix":"^","npm_config_ignore_optional":"","LC_PAPER":"pt_BR.UTF-8","npm_package_dependencies__nuxtjs_axios":"^5.13.6","VTE_VERSION":"6800","INIT_CWD":"/home/abelha/TCC Raquel/projecao","NODE_ENV":"development","_applied":"true","PROJECT_ID":"if-connection","APP_ID":"1:1031917992091:web:b3ce005755ab864a5cae3e","EMULATED_ENV":"true","THEME_BASE":"#1C5C27","TOOLBAR_BACKGROUND":"#1C5C27","TOOLBAR_COLOR":"white"}
    }
    // Only set once

    if (context.req) {
      app.context.req = context.req
    }
    if (context.res) {
      app.context.res = context.res
    }

    if (context.ssrContext) {
      app.context.ssrContext = context.ssrContext
    }
    app.context.redirect = (status, path, query) => {
      if (!status) {
        return
      }
      app.context._redirected = true
      // if only 1 or 2 arguments: redirect('/') or redirect('/', { foo: 'bar' })
      let pathType = typeof path
      if (typeof status !== 'number' && (pathType === 'undefined' || pathType === 'object')) {
        query = path || {}
        path = status
        pathType = typeof path
        status = 302
      }
      if (pathType === 'object') {
        path = app.router.resolve(path).route.fullPath
      }
      // "/absolute/route", "./relative/route" or "../relative/route"
      if (/(^[.]{1,2}\/)|(^\/(?!\/))/.test(path)) {
        app.context.next({
          path,
          query,
          status
        })
      } else {
        path = withQuery(path, query)
        if (process.server) {
          app.context.next({
            path,
            status
          })
        }
        if (process.client) {
          // https://developer.mozilla.org/en-US/docs/Web/API/Location/replace
          window.location.replace(path)

          // Throw a redirect error
          throw new Error('ERR_REDIRECT')
        }
      }
    }
    if (process.server) {
      app.context.beforeNuxtRender = fn => context.beforeRenderFns.push(fn)
    }
    if (process.client) {
      app.context.nuxtState = window.__NUXT__
    }
  }

  // Dynamic keys
  const [currentRouteData, fromRouteData] = await Promise.all([
    getRouteData(context.route),
    getRouteData(context.from)
  ])

  if (context.route) {
    app.context.route = currentRouteData
  }

  if (context.from) {
    app.context.from = fromRouteData
  }

  app.context.next = context.next
  app.context._redirected = false
  app.context._errored = false
  app.context.isHMR = Boolean(context.isHMR)
  app.context.params = app.context.route.params || {}
  app.context.query = app.context.route.query || {}
}

export function middlewareSeries (promises, appContext) {
  if (!promises.length || appContext._redirected || appContext._errored) {
    return Promise.resolve()
  }
  return promisify(promises[0], appContext)
    .then(() => {
      return middlewareSeries(promises.slice(1), appContext)
    })
}

export function promisify (fn, context) {
  let promise
  if (fn.length === 2) {
      console.warn('Callback-based asyncData, fetch or middleware calls are deprecated. ' +
        'Please switch to promises or async/await syntax')

    // fn(context, callback)
    promise = new Promise((resolve) => {
      fn(context, function (err, data) {
        if (err) {
          context.error(err)
        }
        data = data || {}
        resolve(data)
      })
    })
  } else {
    promise = fn(context)
  }

  if (promise && promise instanceof Promise && typeof promise.then === 'function') {
    return promise
  }
  return Promise.resolve(promise)
}

// Imported from vue-router
export function getLocation (base, mode) {
  if (mode === 'hash') {
    return window.location.hash.replace(/^#\//, '')
  }

  base = decodeURI(base).slice(0, -1) // consideration is base is normalized with trailing slash
  let path = decodeURI(window.location.pathname)

  if (base && path.startsWith(base)) {
    path = path.slice(base.length)
  }

  const fullPath = (path || '/') + window.location.search + window.location.hash

  return normalizeURL(fullPath)
}

// Imported from path-to-regexp

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
export function compile (str, options) {
  return tokensToFunction(parse(str, options), options)
}

export function getQueryDiff (toQuery, fromQuery) {
  const diff = {}
  const queries = { ...toQuery, ...fromQuery }
  for (const k in queries) {
    if (String(toQuery[k]) !== String(fromQuery[k])) {
      diff[k] = true
    }
  }
  return diff
}

export function normalizeError (err) {
  let message
  if (!(err.message || typeof err === 'string')) {
    try {
      message = JSON.stringify(err, null, 2)
    } catch (e) {
      message = `[${err.constructor.name}]`
    }
  } else {
    message = err.message || err
  }
  return {
    ...err,
    message,
    statusCode: (err.statusCode || err.status || (err.response && err.response.status) || 500)
  }
}

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
const PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  const tokens = []
  let key = 0
  let index = 0
  let path = ''
  const defaultDelimiter = (options && options.delimiter) || '/'
  let res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    const m = res[0]
    const escaped = res[1]
    const offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    const next = str[index]
    const prefix = res[2]
    const name = res[3]
    const capture = res[4]
    const group = res[5]
    const modifier = res[6]
    const asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    const partial = prefix != null && next != null && next !== prefix
    const repeat = modifier === '+' || modifier === '*'
    const optional = modifier === '?' || modifier === '*'
    const delimiter = res[2] || defaultDelimiter
    const pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter,
      optional,
      repeat,
      partial,
      asterisk: Boolean(asterisk),
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str, slashAllowed) {
  const re = slashAllowed ? /[?#]/g : /[/?#]/g
  return encodeURI(str).replace(re, (c) => {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURIComponentPretty(str, true)
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens, options) {
  // Compile all the tokens into regexps.
  const matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (let i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options))
    }
  }

  return function (obj, opts) {
    let path = ''
    const data = obj || {}
    const options = opts || {}
    const encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      const value = data[token.name || 'pathMatch']
      let segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (let j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

export function addLifecycleHook(vm, hook, fn) {
  if (!vm.$options[hook]) {
    vm.$options[hook] = []
  }
  if (!vm.$options[hook].includes(fn)) {
    vm.$options[hook].push(fn)
  }
}

export const urlJoin = joinURL

export const stripTrailingSlash = withoutTrailingSlash

export const isSamePath = _isSamePath

export function setScrollRestoration (newVal) {
  try {
    window.history.scrollRestoration = newVal;
  } catch(e) {}
}
