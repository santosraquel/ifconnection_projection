import { planeObject } from '@/utils'
import AbstracService from '@/utils/AbstractService'
import { API_URL } from './apiURL'

/**
 * Abstract Service for CRUD Operations in REST full API
 */
export class ApiCrudService extends AbstracService {
  constructor (path) {
    super()

    this.baseUrl = API_URL

    this.baseUrl += 'api/' + path

    this.references = []
  }

  save (obj, isUpdate = false) {
    try {
      const data = planeObject(obj)
      this.flatRefs(data)
      let response
      if (!isUpdate) {
        response = await this.request().post('/', data)
      } else {
        response = await this.request().put(`/${obj._id}`, data)
      }
      return response.data
    } catch (err) {
      reject(err)
    }
  }

  flatRefs (data) {
    // Auto flat refereces
    this.references.forEach((field) => {
      data[field] = data[field] ? data[field]._id : ''
    })
  }

  async get (_id) {
    try {
      const response = await this.request().get('/' + _id)
      return response.data
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async list (params) {
    try {
      const response = await this.request().get('/', { params })
      resolve(response.data)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async remove (data) {
    try {
      const response = await this.request().delete('/' + data._id)
      resolve(response.data)
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}
