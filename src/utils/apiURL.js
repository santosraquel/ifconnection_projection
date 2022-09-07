export const API_URL = (() => {
  // Production
  if (process.env.apiURL) {
    return process.env.apiURL
  }

  // Localhost
  if (process.env.LOCAL_API) {
    console.warn('>>>> Unsing local API <<<<')
    return 'http://localhost:8082/'
  }

  // Remote dev
  console.warn('>>>> Unsing remote dev API<<<<')
  return 'https://api-autotech-com-swfkinj7vq-rj.a.run.app/'
})()
