/**
 * Processa um conteudo a ser enviado ao slider
 * @param conteudo
 * @returns {any}
 */
export const processSlides = (conteudo) => {
  // Faz uma copia/clone profunda do objeto
  const clone = JSON.parse(JSON.stringify(conteudo))

  if (conteudo.imgs) { return clone }

  let verseNumber = 0
  clone.slides = clone.slides.map((slide) => {
    if (slide.tags[0] && slide.tags[0].match(/verse/i)) {
      verseNumber++
      slide.verseNumber = verseNumber
    }
    return slide
  })

  let often = -1
  let start = 0
  let toRepeat

  // Verificação inicial de cada slide
  clone.slides.forEach(function (slide, index) {
    if (slide.tags[0] === 'chorus') { slide.texto = '<b>Ref.: </b>' + slide.texto }

    // Conversão de marcações text => HTML
    slide.texto = slide.texto.replace(/{/g, '<b>').replace(/}/g, '</b>')
    slide.texto = slide.texto.replace(/\n/g, '<br>')

    // Quando se tem uma tag repeat[n] deve se repetir na frequencia [n]
    slide.tags.forEach(function (tag) {
      if (tag && tag.match(/repeat/)) {
        // Extrai a frequencia
        often = parseInt(tag.substr(tag.length - 1))
        // Objeto a ser repetido
        toRepeat = slide
        // Inicio da repetição
        start = index
      }
    }, this)
  }, this)

  // FIM Verificação inicial

  // Se não for encontrado repetição Finaliza processamento
  if (!toRepeat || clone.slides.length === 1) {
    return clone
  }

  // Inicio processamento segundario

  let count = 0
  const breaks = []
  const slides = []

  // Verifica se os próximos slides são continuações
  let n = start + 1
  while (n < clone.slides.length && clone.slides[n].tags[0] && clone.slides[n].tags[0].match(/break/i)) {
    // Armazena as continuações em array
    breaks.push(clone.slides[n])
    n++
  }

  clone.slides.forEach(function (slide, index) {
    // Vai copiando slide por slide
    slides.push(slide)

    if (index > start) {
      // Quando iniciar repetições
      if (slide.tags[0] && slide.tags[0].match(/verse/i)) {
        // Conta cada verso
        count++
      }

      if (count === often) {
        // Deve ser inserido refrão na frequencia definida
        slides.push(toRepeat)

        // Insere as continuações após o refrão repetido
        breaks.forEach(function (value) {
          slides.push(value)
        })

        // Reinicia a contagem
        count = 0
      }
    }
  }, this)

  clone.slides = slides

  // Conteúdo processado
  return clone
}
