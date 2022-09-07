import { Change } from 'firebase-functions/v1'
import { QueryDocumentSnapshot } from 'firebase-functions/v1/firestore'
import { db } from '../firebase'
/**
 * Atualiza o documento de acordo com os parametros
 * @param {string} collection
 * @param {string} prop
 * @param {Array} fields
 * @param {Object} change
 */
export async function updater(collection:string,
    prop:string, fields: string[],
    change: Change<QueryDocumentSnapshot>,
    { isArray= false }: {isArray: boolean}):
    Promise<unknown[] | void> {
  // obtendo dados antigos
  const previousData = change.before.data()
  // obtendo dados atualizados
  const data = change.after.data()

  /**
   * Verifica se foi alterado qualquer um dos campo informados
   * @return {boolean}
   */
  function checkChanges() {
    let result = false
    for (const field of fields) {
      console.log(`${collection} Checking ${prop}.${field}.`)
      if (data[field] != previousData[field]) {
        console.log(`${collection} Updating ${prop}.${field} 
        to ${data[field]}.`)
        result = true
      }
    }
    return result
  }

  if (checkChanges()) {
    const updates:Promise<unknown>[] = []
    // Se teve mudanças
    // Faz uma query obtendo todos os registro que tem o mesmo id dentro da prop
    const expensesRef = db.collection(collection)
    if (isArray) {
      // Pesquisar pelo array precisa ser feito query com objeto inteiro
      console.log('Searching for array.')

      const snaps = await expensesRef
          .where(prop + 'Ids', 'array-contains', data._id).get()

      if (snaps.empty) {
        console.log('Nenhum documento a ser alterado.')
      }

      snaps.forEach((snap) => {
        const content = snap.data()
        content.labels = content.labels
            .map((label) => {
              if (label._id === data._id) {
                const newData = {
                  '_id': data._id,
                }
                for (const field of fields) {
                  newData[field] = data[field]
                }
                return newData
              }
              return label
            })
        updates.push(snap.ref.set(content))
      })
    } else {
      const snapshot = await expensesRef
          .where(`${prop}._id`, '==', data._id).get()
      if (snapshot.empty) {
      // Se listagem vier vazia
        console.log('Nenhum documento a ser alterado.')
        return
      }

      /* Cria dinamicamente o objeto a ser atualizado
      em cada registro com os campos informados */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updatedData:any = {
        _id: data._id,
      }
      for (const field of fields) {
        updatedData[field] = data[field]
      }

      /* Atualiza cada um dos documentos */
      snapshot.forEach((doc) => {
        console.log(doc.id)
        const docRef = expensesRef.doc(doc.id)
        updates.push(
            docRef.update({ [prop]: updatedData })
        )
      })
    }
    return await Promise.all(updates)
    // Aguarda todos os updates serem concluidos
  }
  return
}
