export function mapLabels (labels) {
  return labels.map((label) => {
    return {
      label, value: label.split(' - ')[0],
    }
  })
}

export const formasPagamento = mapLabels([
  '01 - Dinheiro',
  '02 - Cheque',
  '03 - Cartão de Crédito',
  '04 - Cartão de Débito',
  '05 - Crédito Loja',
  '10 - Vale Alimentação',
  '11 - Vale Refeição',
  '12 - Vale Presente',
  '13 - Vale Combustível',
  '14 - Duplicata Mercantil',
  '15 - Boleto Bancário',
  '90 - Sem pagamento',
  '99 - Outros',
])

export const tiposPresenca = mapLabels([
  '0 - Não se aplica (por exemplo, Nota Fiscal complementar ou de ajuste)',
  '1 - Operação presencial',
  '2 - Operação não presencial, pela Internet',
  '3 - Operação não presencial, Teleatendimento',
  '4 - NFC-e em operação com entrega a domicílio',
  '5 - Operação presencial, fora do estabelecimento',
  '9 - Operação não presencial, outros',
])
