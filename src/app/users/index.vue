<template>
  <v-container>
    <v-layout class="sectionHeader">
      <h3>{{ pageTitle }}</h3>
      <v-spacer />
      <v-btn dark color="pink" @click="openForm">
        <v-icon>mdi-plus</v-icon>
        Adicionar
      </v-btn>
    </v-layout>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="count"
      class="elevation-1 clickRow"
      @click:row="(item) => openForm(item)"
    >
      <template #[`item.action`]="{ item }">
        <!-- EDITAR !-->
        <v-btn
          title="Editar"
          icon
          @click.stop="openForm(item)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <!-- EXCLUIR !-->
        <v-btn
          title="Excluir"
          icon
          @click.stop="removeHandler(item)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Modal form !-->
    <modal-form ref="form" @saved="addSaved" />

    <modal-confirm
      v-if="target"
      v-model="showConfirmModal"
      confirm-btn-color="error"
      confirm-btn-text="Excluir"
      title="Excluir Usuário"
      :confirm-btn-disabled="!canRemove"
      @cancel="cancelRemove()"
      @confirm="remove(target)"
    >
      <p>Excluindo usuário "<b>{{ target.email }}</b>"</p>
      <v-text-field
        v-model="confirmValue"
        label="Confirme o e-mail:"
        :placeholder="target.email"
        :rules="[rules.required, (v) => canRemove || 'Dados não conferem']"
        outlined
        hide-details
      />
    </modal-confirm>
  </v-container>
</template>

<script>
import { OnRules } from 'vuetify-js-utils'

import ModalConfirm from '@/components/commons/ModalConfirm'
import { OnMsg, CrudPage } from '@/mixins'
import ModalForm from './components/ModalUserForm'
import { usersService } from './UsersService'

export default {

  components: { ModalForm, ModalConfirm },

  mixins: [CrudPage, OnRules, OnMsg],

  data () {
    return {
      pageTitle: 'Usuários',
      docExistsMsg: 'Usuário já cadastrado',
      headers: [
        {
          text: 'Nome',
          value: 'name',
        }, 
        {
          text: 'Sobrenome',
          value: 'lastname',
        },
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'Grupo de acesso',
          value: 'role',
        },
        {
          text: 'Ações',
          value: 'action',
          sortable: false,
        },
      ],
      target: {},
      showConfirmModal: false,
      confirmValue: '',
    }
  },

  computed: {
    canRemove () {
      return this.target && this.confirmValue === this.target.email
    },
  },

  beforeCreate () {
    this.$service = usersService
  },

  methods: {
    removeHandler (item) {
      this.target = item
      this.showConfirmModal = true
    },

    cancelRemove () {
      this.target = {}
      this.infoSnack('Ação cancelada pelo usuário.')
    },
  },
}
</script>
