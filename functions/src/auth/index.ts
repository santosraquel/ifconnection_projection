import { auth, defaultRegion } from '../firebase'
import { Response } from 'firebase-functions/v1'
import { Request } from 'firebase-functions/v1/https'
import { sendMail } from '../sendMail'

export const createUser = defaultRegion.https
    .onRequest(async (req: Request, res: Response) => {
      const { email, password } = req.body
      await auth.createUser({
        email,
        password,
      })
      delete req.body.password
      res.send(req.body)
    })


/**
     *
     * @param {any} msg
     */
export const resetPassword = defaultRegion.https
    .onRequest(async (req: Request, res: Response) => {
      const resetLink = await auth
          .generatePasswordResetLink(req.body.email)
          .catch((err) => {
            console.error(err)
            if (err.code === 'auth/user-not-found') {
              res.status(404).send('user-not-found')
              return
            }
            res.status(500).send('internal-server-error')
            return
          })
      await sendMail({
        to: req.body.email, // Change to your recipient
        from: 'ifConnection <ifconnection@gmail.com>', // Change to your verified sender
        subject: 'Alterar senha',
        text: 'Clique no link para alterar sua senha' + resetLink,
        html: '<strong>Acesse o link para alterar sua senha </strong><br>' + resetLink,
      })
      res.send(req.body)
    })
