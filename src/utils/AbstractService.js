import axios from 'axios'
import Cookies from 'js-cookie'
import cookieparser from 'cookieparser'
import { getFunctionURL } from '@/firebase/functions'

/**
 * Abstract Service for Cloud Function/Auth Token require requests API
 */
export default class AbstracService {
  /**
   * New services Constuctor, passs endpoint entrie for actions
   * @param {String} endpoint
   * @param {Object} req
   */
  constructor (endpoint, req) {
    this.req = req
    this.endpoint = endpoint
    this.baseURL = getFunctionURL()
  }

  request (contentType = 'application/json') {
    let config = {}

    // SSR
    if (typeof this.req === 'object') {
      config = {
        baseURL: `${this.baseURL}`,
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': contentType,
          Authorization: `${cookieparser.parse(this.req.headers.cookie).access_token}`,
        },
      }
    } else {
      config = {
        baseURL: `${this.baseURL}`,
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': contentType,
          Authorization: `${Cookies.get('access_token')}`,
        },
      }
    }

    return axios.create(config)
  }
}
