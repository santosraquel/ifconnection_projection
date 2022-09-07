<template>
  <v-form v-if="!sended" ref="form">
    <v-text-field
      v-model="formData.name"
      dark
      outlined
      name="name"
      label="Seu Nome"
      :disabled="loading"
      :rules="[rules.required]"
    />
    <v-text-field
      v-model="formData.email"
      dark
      outlined
      name="subject"
      label="Seu melhor E-mail"
      :disabled="loading"
      :rules="[rules.required, rules.email]"
    />
    <v-text-field
      v-model="formData.subject"
      dark
      outlined
      name="subject"
      label="Assunto"
      :disabled="loading"
      :rules="[rules.required]"
    />
    <v-text-field
      v-model="formData.phone"
      dark
      outlined
      name="phone"
      label="Telefone"
      :disabled="loading"
      :rules="[rules.required]"
    />
    <v-textarea
      v-model="formData.text"
      dark
      outlined
      name="text"
      label="Menssagem"
      :disabled="loading"
      :rules="[rules.required]"
    />
    <p>
      <span v-if="error" class="text--red">
        Ah não! Ouve algo de errado, tente novamente.
      </span>
      <v-btn
        :loading="loading"
        outlined
        rounded
        dark
        @click="submit"
      >
        Enviar
      </v-btn>
    </p>
  </v-form>
  <div v-else class="sended">
    <b>Sua mensagem foi enviada ;)</b>
    <p>Em breve entraremos em contato.</p>
  </div>
</template>
</template>

<script>
import { OnRules } from '~/mixins/OnRules'
import api from '~/utils/api'

export default {
  mixins: [OnRules],

  data: () => ({
    formData: {
      name: '',
      subject: '',
      phone: '',
      text: '',
    },
    loading: false,
    sended: false,
    error: false,
  }),

  methods: {
    async submit () {
      this.error = false
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          await api.post('contact', this.formData)
          this.sended = true
        } catch (err) {
          this.error = true
        }
        this.loading = false
      }
    },
  },
}
</script>
