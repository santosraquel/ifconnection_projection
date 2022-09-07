import { FirestoreData } from '@/firebase/FirestoreData'

export class Media extends FirestoreData {
  name = ""
  downloadURL = ""
  storagePath = ""
  description = ""
  type = ""
  dateCreation = ""
  dateExpiration = ""
  exhibitionTime = 6000
  medias = []

  // addMedia (media: any) {
  //   this.medias.push(media)  
  // }
}
