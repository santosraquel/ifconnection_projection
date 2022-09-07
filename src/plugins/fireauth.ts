import { Store } from 'vuex'
import Cookies from 'js-cookie'
import { User as AuthUser } from 'firebase/auth'

import { getAccountModule } from '@/store'
import { auth } from '@/firebase/fireauth'
import { usersService } from '@/app/users/UsersService'

let interval:number|undefined

function updateToken (store:Store<any>) {
  const accountModule = getAccountModule(store)

  if (!auth || !auth.currentUser) {
    throw new Error('Can\'t update firebase token.')
  }
  auth.currentUser.getIdToken(true)
    .then((token) => {
      Cookies.set('access_token', token)
    })
    .catch(() => {
      accountModule.setApiFall()
    })
}

function setUpdate (store:Store<any>) {
  updateToken(store)
  interval = window.setInterval(() => updateToken(store), 50 * 60 * 1000)
}

export default ({ store }:{store:Store<any>}) => {
  const accountModule = getAccountModule(store)

  auth.onAuthStateChanged(async (user) => {
    try {
      if (!user) { throw new Error('No current user.') }
      await getProfile(store, user)
      // Auto update user token
      setUpdate(store)
      window.addEventListener('blur', () => {
        clearInterval(interval)
        interval = undefined
      })
      window.addEventListener('focus', () => {
        if (!interval) {
          setUpdate(store)
        }
      })
      updateToken(store)
    } catch (e) {
      console.error(e)
      clearInterval(interval)
      accountModule.setForceLogin(true)
      accountModule.signOut()
    }
  })
}

export async function getProfile (store:Store<any>, authUser:AuthUser) {
  // Store module
  const accountModule = getAccountModule(store)

  const token = await authUser.getIdToken(true)

  Cookies.set('access_token', token)

  const storedUser = await usersService.get(authUser.email)

  // if (storedUser.domain && !storedUser.domain._id) {
  //   const domain = await domainsService
  //     .get(storedUser.domain._id || storedUser.domain)
  //     .catch(() => { return {} })
  //   storedUser.domain = domain
  // }
  // localStorage.setItem('domain', storedUser.domain._id)
  // storedUser.email = authUser.email

  // if (storedUser.role !== 'Admin' && !storedUser.domain) {
  //   throw new Error('User don\'t have a domain.')
  // }
  accountModule.setUser({ storedUser, authUser })
}
