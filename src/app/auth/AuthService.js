import AbstracService from '@/utils/AbstractService'

class AuthService extends AbstracService {
  sendPasswordResetEmail (email) {
    return new Promise((resolve, reject) => {
      this
        .request()
        .post('/resetPassword', { email })
        .then((response) => {
          resolve(response.data)
        }).catch((err) => {
          console.error('Can\'t send', err)
          reject(err)
        })
    })
  }
}
export const authService = new AuthService()
