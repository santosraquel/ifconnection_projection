<template>
  <modal-base persistent :width="580">
    <template slot="content">
      <v-form ref="form">
        <avatar-input 
          class="w-32 h-32 rounded-full" 
          v-model="target.photoURL"
          default-src="https://kgms.kgms.ca/wp-content/plugins/testimonial-add/templates/user-icon.jpg"
        />
        <v-text-field
          v-model="target.name"
          label="Nome"
          :rules="[rules.required]"
        /> 
        <v-text-field
          v-model="target.lastname"
          label="Sobrenome"
          :rules="[rules.required]"
        />
        <v-text-field
          v-model="target.email"
          label="E-mail"
          type="email"
          :rules="[rules.email]"
        />
        <v-text-field
          v-model="target.password"
          label="Senha"
          :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showPass ? 'text' : 'password'"
          :disabled="loading"
          @input="notMatch = false"
          @click:append="showPass = !showPass"
        />
        <v-select
          v-model="target.role"
          :rules="[rules.required]"
          :items="['Admin', 'Editor']"
          label="Grupo de acesso"
        />
      </v-form>
    </template>
  </modal-base>
</template>

<script>
import { OnRules } from 'vuetify-js-utils'

import { OnFormModal } from '@/mixins'
import InputFile from '@/components/commons/upload/InputFile.vue'

import { usersService } from '../UsersService'
import { User } from '../User'
import AvatarInput from '@/components/AvatarInput.vue'

export default {
  components: { InputFile, AvatarInput },

  mixins: [OnRules, OnFormModal],

  data: () => ({
    showPass: false,
    loading: false,
    notMatch: false,
  }),

  computed: {
    title () {
      return this.isUpdate ? 'Editar Usuário' : 'Adicionar novo Usuário'
    },
  },

  beforeCreate () {
    this.Model = User
    this.$service = usersService
  },
}
</script>
