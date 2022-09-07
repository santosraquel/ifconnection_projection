<template>
  <div class="plansContent" :class="$vuetify.breakpoint.name">
    <div class="shadow top" />
    <v-container>
      <h2 class="text-center">
        Do jeito que você precisa <br class="d-xs-none">para seu negócio
      </h2>
      <v-row>
        <v-col v-for="(col, n) in cols" :key="n" cols="12" md="4">
          <v-card class="flexcard" height="100%">
            <v-card-text class="grow">
              <p class="planName" v-html="col.name" />
              <p class="planPrice">
                {{ col.price }}
                <span>/mês</span>
              </p>
              <ul>
                <li v-for="(line, i) in col.lines" :key="i" v-text="line.text" />
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-btn
                x-large
                outlined
                rounded
                block
                color="accent"
                @click="openModal(col)"
              >
                Contratar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <order-modal ref="modal" />
    </v-container>
    <div class="shadow bottom" />
  </div>
</template>

<script>
export default {
  props: {
    cols: { type: Array, required: true }
  },

  mounted () {
    resize()
    window.addEventListener('resize', resize)
    function resize () {
      const container = document.querySelector('.plansContent .container')
      const wrap = document.querySelector('.plansContent')
      wrap.style.height = container.clientHeight + 325 + 'px'
    }
  },

  methods: {
    openModal (data) {
      this.$refs.modal.open(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.plansContent {
  overflow: hidden;
  position: relative;
  height: 50em;
  margin-top: 5em;
  .v-card {
    padding: 2rem;
  }
  h2 {
    font-size: 2rem;
    padding: 3rem 0;
  }
  .planName {
    font-weight: bold;
    font-size: 1.5rem;
  }
  .planPrice {
    font-weight: bold;
    font-size: 3rem;
    padding-top: 1rem;
    span {
      font-size: 1rem;
      position: relative;
      bottom: 1rem;
      left: -.5rem;
    }
  }
  ul {
    list-style: none;
    text-align: left;
    padding: 0;
    li {
      padding-left: 3rem;
      position: relative;
      margin-top: 2rem;
    }
    li:before {
      content: " "; /* Insert content that looks like bullets */
      background-color: var(--v-primary-base);
      position: absolute;
      left: 0;
      display: block;
      border-radius: 50%;
      top: calc(50% - 0.75rem);
      height: 1.5rem;
      width: 1.5rem;
    }
  }
  &.xs::before {
    height: 98%;
  } &.sm::before  {
    height: 94%;
  }
  &::before {
    background: var(--v-info-base);
    content: ' ';
    display: block;
    height: 80%;
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 10;
  }
  .container {
    z-index: 30;
    position: relative;
  }
  .shadow {
    position: absolute;
    left: -5%;
    padding: 10%;
    width: 110%;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    box-shadow: rgb(54, 54, 54) 3px 0px 15px inset;
    background: var(--v-info-base);
    &.bottom {
      z-index: 30;
      bottom: -20px;
    box-shadow: rgb(54, 54, 54) 3px 0px 15px;
      background: var(--v-primary-base);
    }
  }
}
</style>
