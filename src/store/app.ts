
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'app',
  stateFactory: true,
  namespaced: true,
})
export default class AppModule extends VuexModule {
  popup = {
    status: false,
    msg: '',
    type: '',
  }

  dialog = {
    status: false,
    msg: '',
  }

  sidebarMenu = true

  @Mutation
  setPopup (popup: any) {
    this.popup = popup
  }

  @Mutation
  setDialog (dialog: any) {
    this.dialog = dialog
  }

  @Mutation
  setBoolPopup (bool = false) {
    this.popup.status = bool
  }

  setBoolDialog (bool = false) {
    this.dialog.status = bool
  }

  @Mutation
  setSidebarMenu (sidebarMenu: any) {
    this.sidebarMenu = sidebarMenu
  }

  @Mutation
  toggleSidebarMenu () {
    this.sidebarMenu = !this.sidebarMenu
  }
}
