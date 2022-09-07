import { getStorage, ref, getDownloadURL } from 'firebase/storage'

// Create a reference to the file we want to download
const storage = getStorage()

export function downloadFile (path) {
  const starsRef = ref(storage, path)

  // Get the download URL
  return getDownloadURL(starsRef)
    .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
        // File doesn't exist
          break
        case 'storage/unauthorized':
        // User doesn't have permission to access the object
          break
        case 'storage/canceled':
        // User canceled the upload
          break

          // ...

        case 'storage/unknown':
        // Unknown error occurred, inspect the server response
          break
      }
    })
}
