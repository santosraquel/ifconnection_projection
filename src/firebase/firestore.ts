import Cookies from 'js-cookie'
import { getFirestore, doc, collection, connectFirestoreEmulator } from 'firebase/firestore'

import { emulate, isATest } from '@/utils/jest'

import firebaseApp, { testerFirebaseApp } from './fireinit'

function getDb () {
  if (emulate) {
    const db = getFirestore(testerFirebaseApp)
    connectFirestoreEmulator(db, 'localhost', 8080)
    return db
  } else {
    return getFirestore(firebaseApp)
  }
}

const db = getDb()

export default db
export { db }
