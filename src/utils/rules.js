export const required = v => !!v || 'Campo obrigatório'
export const object = v => (v && Object.keys(v).length > 0) || 'Campo obrigatório'
export const date = v => (v && v.length === 10) || 'Campo obrigatório'
export const email = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'E-mail deve ser válido'
export const min6 = () => minNum(6, 'Ao menos 6 caracteres')
export const minNum = (min, msg) => v => (
  (v && v >= min) || msg
)
export const maxNum = (max, msg) => v => (
  (v && v <= max) || msg
)
export const minLenght = (min, msg) => v => (
  (v && v.toString().length >= min) || msg
)
export const maxLenght = (max, msg) => v => (
  (v && v.toString().length <= max) || msg
)
export const id = (v) => {
  const regex = /^[0-9a-z-]+$/
  return regex.test(v) || 'Apenas letras minúsculas, numeros e hifens são permitidos'
}
