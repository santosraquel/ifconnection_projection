(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{475:function(t,e,n){"use strict";var r=n(1),o=n(100);e.a=r.a.extend({methods:{onMsg:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"warning";return Object(o.getAppModule)(this.$store).setPopup({msg:t,type:e,status:!0})},successSnack:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Operação realizada com sucesso";this.onMsg(t,"success")},infoSnack:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Operação finalizada";this.onMsg(t,"info")},warnSnack:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Oops... Algo estranho";this.onMsg(t,"warning")},errorSnack:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Oops... Algo de errado.";this.onMsg(t,"error")}}})},578:function(t,e,n){var content=n(644);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(27).default)("bc02799c",content,!0,{sourceMap:!1})},641:function(t,e,n){t.exports=n.p+"img/avatar.2fda655.png"},642:function(t){t.exports=JSON.parse('[{"to":"/dashboard/","title":"Dashboard","icon":"mdi-view-dashboard","role":"Editor"},{"to":"/medias/","title":"Projeção","icon":"mdi-cast-connected","role":"Admin"},{"to":"/users/","title":"Usuários","icon":"mdi-account-box-multiple","role":"Admin"}]')},643:function(t,e,n){"use strict";n(578)},644:function(t,e,n){var r=n(26)((function(i){return i[1]}));r.push([t.i,".sidebarMenu .profile{background-color:#f9fcff}.sidebarMenu .profile .v-avatar{position:relative;left:-10px}.sidebarMenu .profile .v-list-item__title{font-weight:600;font-size:16px;line-height:normal;color:var(--v-primary-lighten1)!important}.sidebarMenu .profile .v-list-item__subtitle{font-size:10px;letter-spacing:.4px}.sidebarMenu .v-list-item__title{font-size:14px}",""]),r.locals={},t.exports=r},670:function(t,e,n){"use strict";n.r(e);var r=n(17),o=(n(72),n(19),n(6),n(66),n(475)),l=n(642),c=n(100),v={mixins:[o.a],computed:{routes:function(){var t=this;return l.filter((function(e){if(!e.role)return!0;switch(e.role){case"Admin":return"Admin"===t.user.role;case"Editor":return["Admin","Editor"].includes(t.user.role);case"Viewer":return["Admin","Editor","Viewer"].includes(t.user.role);default:return!1}}))},user:function(){return Object(c.getAccountModule)(this.$store).user},drawer:{get:function(){return Object(c.getAppModule)(this.$store).sidebarMenu},set:function(t){Object(c.getAppModule)(this.$store).setSidebarMenu(t)}}},methods:{submit:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(c.getAccountModule)(t.$store).signOut();case 3:window.location.reload(),e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0),t.errorSnack();case 10:case"end":return e.stop()}}),e,null,[[0,6]])})))()}}},d=(n(643),n(36)),m=n(45),f=n.n(m),_=n(221),h=n(318),x=n(500),w=n(501),M=n(484),k=n(499),A=n(502),V=n(479),O=n(486),y=n(658),component=Object(d.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-navigation-drawer",{staticClass:"sidebarMenu",attrs:{permanent:"",absolute:"","expand-on-hover":"",clipped:""},scopedSlots:t._u([{key:"append",fn:function(){return[r("v-list",{attrs:{shaped:""}},[r("v-list-item",{staticClass:"profile",attrs:{"two-line":""}},[r("v-list-item-avatar",{attrs:{size:"40px"}},[r("v-img",{attrs:{src:t.user.photoURL||n(641)}})],1),t._v(" "),t.user?r("v-list-item-content",[r("v-list-item-title",[t._v(t._s(t.user.nickname||t.user.name))]),t._v(" "),r("v-list-item-subtitle",[t._v(t._s(t.user.email))])],1):t._e()],1),t._v(" "),r("v-list-item",{attrs:{"active-class":"primary--text"},on:{click:t.submit}},[r("v-list-item-action",[r("v-icon",[t._v("mdi-arrow-left")])],1),t._v(" "),r("v-list-item-content",[r("v-list-item-title",[t._v("Sair")])],1)],1)],1)]},proxy:!0}]),model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[r("v-list",{attrs:{shaped:""}},[t._l(t.routes,(function(e,i){return[e.items?r("v-list-group",{key:"list-"+i,attrs:{"prepend-icon":e.icon,"no-action":""},scopedSlots:t._u([{key:"activator",fn:function(){return[r("v-list-item-content",[r("v-list-item-title",{domProps:{textContent:t._s(e.title)}})],1)]},proxy:!0}],null,!0)},[t._v(" "),t._l(e.items,(function(e){return r("v-list-item",{key:e.title,attrs:{to:e.to,nuxt:""}},[r("v-list-item-icon",[r("v-icon",[t._v(t._s(e.icon))])],1),t._v(" "),r("v-list-item-content",[r("v-list-item-title",{domProps:{textContent:t._s(e.title)}})],1)],1)}))],2):r("v-list-item",{key:"list-"+i,attrs:{to:e.to,"active-class":"primary--text",nuxt:""}},[r("v-list-item-icon",[r("v-icon",[t._v(t._s(e.icon))])],1),t._v(" "),r("v-list-item-content",[r("v-list-item-title",[t._v(t._s(e.title))])],1)],1)]}))],2)],1)}),[],!1,null,null,null);e.default=component.exports;f()(component,{VIcon:_.a,VImg:h.a,VList:x.a,VListGroup:w.a,VListItem:M.a,VListItemAction:k.a,VListItemAvatar:A.a,VListItemContent:V.a,VListItemIcon:O.a,VListItemSubtitle:V.b,VListItemTitle:V.c,VNavigationDrawer:y.a})}}]);