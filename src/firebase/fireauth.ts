import { emulate } from '@/utils/jest'
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth'

import firebaseApp, { testerFirebaseApp } from './fireinit'

function getAppAuth () {
  const auth = getAuth(emulate ? testerFirebaseApp : firebaseApp)
  if (emulate) {
    connectAuthEmulator(auth, 'http://localhost:9099', {
      disableWarnings: true,
    })
  }
  return auth
}

const auth = getAppAuth()

const googleAuthProvider = new GoogleAuthProvider()
googleAuthProvider.setCustomParameters({
  prompt: 'select_account',
})

export { googleAuthProvider, auth }
