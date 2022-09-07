<template>
  <div id="scrollTarget">
    <v-container
      v-for="(row, n) in rows"
      :id="'sobre-'+n"
      :key="n+'-'+row.img"
    >
      <v-row
        v-if="!row.odd || $vuetify.breakpoint.name == 'xs'"
        align="end"
        justify="center"
        class="px-sm-6"
      >
        <v-col cols="12" md="6" class="pb-0">
          <p class="rowTitle" v-html="row.title" />
          <p v-html="row.text" />
          <slot />
        </v-col>
        <v-col cols="12" md="2" class="pa-0">
          <v-img contain :src="row.img" />
        </v-col>
      </v-row>

      <v-row
        v-else-if="row.odd"
        align="end"
        justify="center"
        class="px-sm-6 odd"
      >
        <v-col
          cols="12"
          md="2"
          class="pa-0"
        >
          <v-img contain :src="row.img" />
        </v-col>
        <v-col cols="12" md="6" class="pb-0">
          <p class="rowTitle" v-html="row.title" />
          <p v-html="row.text" />
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    rows: { type: Array, required: true },
  },
}
</script>

<style lang="scss" scoped>
.row {
  line-height: 1.5rem;
  font-size: 1.2rem;
  padding-top: 3em;
  padding-bottom: 3em;
  position: relative;
  .v-image {
    max-width: 60vw;
    margin: 0 auto;
  }
  &::before {
    content: ' ';
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-bottom: .3rem solid var(--v-primary-base);
    border-bottom-right-radius: 40%;
    height: 20%;
  }
  &.odd {
    text-align: right;
    &::before {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 40%;
    }
  }
  .rowTitle {
    // color: var(--v-accent-base);

    font-weight: 900;
    font-size: 2rem;
    line-height: 2.3rem;
  }
}
</style>
