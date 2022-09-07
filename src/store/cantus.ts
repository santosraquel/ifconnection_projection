
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({
  name: 'cantus',
  stateFactory: true,
  namespaced: true,
})
export default class CantusModule extends VuexModule {
  contentSaved = null

  @Mutation
  setContentOnForm () {
  }

  @Mutation
  setContentSaved (saved: any) {
    this.contentSaved = saved
  }
}
