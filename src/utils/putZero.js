export function putZero (amount, increment = 0) {
  let value = amount + increment
  if (value < 9) {
    value = `0${value}`
  }
  return value
}
