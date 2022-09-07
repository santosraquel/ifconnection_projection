import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import AccountModule from './account'
import AppModule from './app'

export function getAccountModule (store: Store<any>): AccountModule {
  return getModule(AccountModule, store)
}

export function getAppModule (store: Store<any>): AppModule {
  return getModule(AppModule, store)
}
