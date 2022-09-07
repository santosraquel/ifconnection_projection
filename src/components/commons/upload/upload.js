import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'

const storage = getStorage()

export function upload (file, path = '') {
  return new Promise((resolve, reject) => {
    // Upload file and metadata to the object 'images/mountains.jpg'
    if (!path) {
      path = 'uploads/' + file.name
    }
    const storageRef = ref(storage, path)
    const uploadTask = uploadBytesResumable(storageRef, file)

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        reject(error)
      },
      () => {
        resolve(path)
      },
    )
  })
}
/* const pathStorage = ''
if (this.path !== '') {
  pathStorage = path
} */
