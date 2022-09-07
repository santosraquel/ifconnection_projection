import sgMail, { MailDataRequired } from '@sendgrid/mail'
/**
   *
   * @param {any} msg
   * @return {Promise<void>}
   */
export function sendMail(msg: MailDataRequired): Promise<void> {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  return sgMail.send(msg).then(() => {
    console.log('Email sent')
  }).catch((error) => {
    console.error(error.response.body)
  })
}
