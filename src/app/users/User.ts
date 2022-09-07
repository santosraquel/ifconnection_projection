import { FirestoreData } from '@/firebase/FirestoreData'

export class User extends FirestoreData {
  name = ''
  lastname = ''
  photoURL = ''
  email = ''
  username = ''
  password? = ''
  passwordConfirm? = ''
  role = ''
}
