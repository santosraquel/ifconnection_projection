<template>
  <div
    ref="printContainer"
    class="printContainer"
  >
    <div
      v-for="(page, n) in pages"
      :key="`page-${n}`"
      :ref="`page-${n}`"
      class="page a4"
    >
      <header>
        <v-row>
          <v-col cols="7">
            <p class="mb-2 p-0">
              Cantos adicionais
            </p>
            <h1 class="m-0 p-0">
              2º Domingo do Tempo Comum
            </h1>
            <p class="mt-2 p-0 pa">
              Abril de 2022
            </p>
          </v-col>
          <v-col cols="5">
            <v-img
              height="90%"
              width="100%"
              contain
              alt=""
              src="/logo.svg"
            />
          </v-col>
        </v-row>
      </header>
      <div class="contents">
        <v-row>
          <v-col
            v-for="(column,i) in page"
            :key="`column-${i}`"
            :ref="`column-${i}`"
            class="color1 ml-3 mr-3"
          >
            <template v-for="node in column">
              <p v-if="node.type === 'p'" :key="node.key" :ref="node.key" :style="node.style">
                {{ node.content }}
              </p>
              <h2 v-else-if="node.type === 'h2'" :key="node.key" :ref="node.key">
                {{ node.content }}
              </h2>
            </template>
          </v-col>
        </v-row>
      </div>
      <footer>
        <hr>
        <v-row>
          <v-col cols="7" />
          <v-col cols="5">
            <v-img
              height="60%"
              width="100%"
              contain
              alt=""
              src="/logo.svg"
            />
          </v-col>
        </v-row>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Object, required: true },
  },

  data: () => ({
    columnsPerPage: 2,
    pages: [],
  }),

  watch: {
    'value.nodes' () {
      this.distributeNodes()
    },
  },

  mounted () {
    addEventListener('beforeprint', () => {
      // Ao imprir é necessário scrool do preview estar no topo
      // Se não estiver a impressão vai sair zuada!!
      const el = this.$refs.printContainer
      el.scrollTop = 0
    })
  },

  beforeDestroy () {
    removeEventListener('beforeprint', () => {})
  },

  methods: {
    async distributeNodes () {
      const allNodes = this.value.nodes.map((node, n) => {
        return {
          key: `${node.type}-${n}`,
          ...node,
        }
      })

      // pages[columns[nodes]]
      const pages = [[allNodes]]

      if (this.columnsPerPage >= 2) {
        pages[0][1] = []
      }

      if (this.columnsPerPage === 3) {
        pages[0][2] = []
      }

      // renderizar todos os nodes
      this.pages = pages
      await this.$nextTick()

      // obtendo altura de todos os nodes
      for (const node of allNodes) {
        const el = this.$refs[node.key][0]
        node.height = el.clientHeight
      }

      // obtendo a altura da coluna
      const columnHeight = this.$refs['column-0'][0].clientHeight

      const allPages = []

      let page = 0
      let column = 0
      let usedHeight = 0
      // percorrendo o array que contem todos os nodes
      for (const node of allNodes) {
        // se a altura usada + altura do node for maior que o tamanho da coluna
        if (usedHeight + node.height > columnHeight) {
          // 2, talvez um >= faça o mesmo trabalho
          if (column + 2 > this.columnsPerPage) {
            page++
            column = 0
          } else {
            column++
          }
          usedHeight = 0
        }
        // cheque os if pois a primeira interação seja o problema
        if (!allPages[page]) {
          allPages[page] = new Array(this.columnsPerPage)
        }
        // cheque os if pois a primeira interação seja o problema
        if (!allPages[page][column]) {
          allPages[page][column] = []
        }
        allPages[page][column].push(node)
        usedHeight += node.height
      }
      this.pages = allPages
    },
  },
}
</script>

<style lang="scss">

.printContainer{
  font-size: 12pt;
  line-height: 14pt !important;
  width: 210mm;
  height: 100%;
  padding: 5mm;
  margin: 0;
  background-color: rgba(95, 95, 95, 0.308);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  overflow-y: auto;

  .page{
    height: 297mm;
    padding: 10mm;
    margin-bottom: 20px;
    position: relative;

    background-color: white;

    box-shadow: 5px 5px 10px #888888;

    header {
      height: 30mm;
      margin-bottom: 5mm;
      overflow: hidden;
    }
    .contents{
      height: calc(100% - 30mm - 20mm);
      position: relative;
      bottom: 0;
      .row{
        height: 100%;
        .col{
          height: 100%;
          padding: 0;
        }
        h2 {
          font-size: 1.2em;
          padding-bottom: 1em;
        }
        p{
          margin: 0;
          padding-bottom: 16px;
        }
      }
    }
    footer {
      width: 100%;
      height: 20mm;
      position: absolute;
      overflow: hidden;
      bottom: 5mm;
      left:0;
    }
  }
}

hr {
  // border-top: 1px solid #dfc58e;
  border-top: 1px solid #a3a3a3;
  margin-right: 10mm;
  margin-left: 10mm;
}

header{
  font-family: Arial, Helvetica, sans-serif;
  p{
    font-size: 15px;
    margin-bottom: 0 !important;
  }
  h1{
    font-size: 23px;
    text-align: left;
    line-height: 25px;
  }
}

@page {
    size: A4;
    margin: 0;
}

@media print {

  body * {
    visibility: hidden;
  }

  .printContainer, .printContainer * {
    visibility: visible;
  }

  .printContainer {
    position: fixed;
    height: auto !important;
    overflow: hidden;
    left: 0;
    top: 0;
    padding: 0;
  }

  .page {
    margin: 0 !important;
    border: initial;
    border-radius: initial;
    width: 100%;
    min-height: initial;
    box-shadow: initial !important;
    background: initial;
    page-break-before: always;
    page-break-after: always;
    -webkit-print-color-adjust: exact;
  }
}

</style>
