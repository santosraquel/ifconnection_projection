import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

const db = admin.firestore()

const auth = admin.auth()

const defaultRegion = functions.region('us-east1')

const arrayUnion = admin.firestore.FieldValue.arrayUnion
const arrayRemove = admin.firestore.FieldValue.arrayRemove

export {
  db, defaultRegion, auth, arrayUnion, arrayRemove,
}
