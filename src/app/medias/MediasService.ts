import { FirestoreCrudService } from '@/firebase/FirestoreCrudService'
import { getDownloadURL } from 'firebase/storage'
import { Media } from './Media'

/**
*
* @class mediasService
*/
class MediasService extends FirestoreCrudService {
  constructor () {
    super('medias', Media)
  }

  list (params: any) {
    params.ignoreActive = true
    return super.list(params)
  }

  async get (mediaId: any) {
    const media = await super.get(mediaId)
    for (const index in media.medias) {
      const item = media.medias[index]
      item.downloadUrl = await getDownloadURL(item.path)
      console.log(item)
    }
    return media
  }
}

export const mediasService = new MediasService()