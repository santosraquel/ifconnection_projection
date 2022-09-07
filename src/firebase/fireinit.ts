import { initializeApp } from 'firebase/app'
import { firebaseConfig, firebaseTesterConfig } from './configs'

export const testerFirebaseApp = initializeApp(firebaseTesterConfig, 'tester')

export default initializeApp(firebaseConfig)
