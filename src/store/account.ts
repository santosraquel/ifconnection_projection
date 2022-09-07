import Cookies from 'js-cookie'

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { signInWithEmailAndPassword, signInWithPopup, User as AuthUser } from 'firebase/auth'

import { auth, googleAuthProvider } from '@/firebase/fireauth'
import { usersService } from '@/app/users/UsersService'
import { User } from '@/app/users/User'

@Module({
  name: 'account',
  stateFactory: true,
  namespaced: true,
})
export default class AccountModule extends VuexModule {
  user = new User()

  apiFall = 0
  forceLogin = false

  @Mutation
  setUser ({ storedUser, authUser }:{storedUser: User, authUser: AuthUser}) {
    if (authUser) {
      storedUser.photoURL = authUser.photoURL || ''
    }
    this.user = storedUser
  }

  @Mutation
  setApiFall () {
    this.apiFall = 1
  }

  @Mutation
  setForceLogin (v: boolean) {
    this.forceLogin = v
  }

  get isAuthenticated () {
    return !!this.user && !!this.user._id
  }

  get userRole () {
    return this.user && this.user.role
  }

  get isAdmin () {
    return this.userRole === 'Admin'
  }

  @Action({ rawError: true })
  signIn ({ email = '', password = '' }) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  @Action({ rawError: true })
  signInGoogle () {
    return signInWithPopup(auth, googleAuthProvider)
      .then(() => {
        if (!auth?.currentUser?.email) {
          throw new Error('Not authenticated')
        }
        return usersService.get(auth.currentUser.email)
      })
  }

  @Action
  signOut () {
    return new Promise((resolve) => {
      Cookies.remove('access_token')
      resolve(auth.signOut())
      this.user = new User()
    })
  }

  @Action
  addApiFall () {
    this.apiFall++
  }

  resetApiFall () {
    this.apiFall = 0
  }
}
