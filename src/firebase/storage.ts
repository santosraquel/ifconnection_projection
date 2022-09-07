import storage  from './firestorage'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { v1 as uuid } from 'uuid'
/**
 * Upload a file to firebase storage.
 * @param {File} file
 * @param {String} path
 * @param {Function} onProgress
 * @returns {Promise<String>}
 */
export function upload (file: any, path: string, onProgress: any) {
  return new Promise((resolve, reject) => {
    console.log('uploading file', file, path)
    path = `${path}/${uuid()}.${file.name.split('.').pop()}`.toLocaleLowerCase()
    const storageRef = ref(storage, path)

    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        onProgress instanceof Function && onProgress(progress)
      },
      error => reject(error),
      () => {
        resolve(path)
      },
    )
  })
}

/**
 * Get a download url for a file.
 * @param {String} path
 * @returns {Promise<String>}
 */
export function getDownloadUrl (path: any) {
  const storageRef = ref(storage, path)

  return getDownloadURL(storageRef)
}

/**
 * Remove a file from firebase storage.
 * @param {String} path
 * @returns {Promise<void>}
 */
export function removeObject (path: any) {
  const storageRef = ref(storage, path)

  return deleteObject(storageRef)
}
