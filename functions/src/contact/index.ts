import { defaultRegion } from '../firebase'
import { sendMail } from '../sendMail'
import { Response } from 'firebase-functions/v1'
import { Request } from 'firebase-functions/v1/https'

export const sendContactEmail = defaultRegion.https
    .onRequest(async (req: Request, res: Response) => {
      await sendMail({
        replyTo: `${req.body.name} <${req.body.email}>`,
        to: 'ifconnection@gmail.com',
        from: 'ifConnection <ifconnection@gmail.com>',
        subject: req.body.subject,
        text: req.body.message,
        html: req.body.message,
      })
      res.send(req.body)
      console.log(req.body)
    })
