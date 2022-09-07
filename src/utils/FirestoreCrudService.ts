import {
    collection, query, where, getDocs,
    limit, getDoc, doc, setDoc, updateDoc,
    deleteDoc, orderBy, CollectionReference,
    DocumentData, Transaction, WriteBatch, serverTimestamp,
  } from 'firebase/firestore'
  import { User } from 'firebase/auth'
  import { db } from '@/firebase/firestore'
  import { auth } from '@/firebase/fireauth'
  import _ from 'lodash'
  import { ListParams } from './ListParams'
  import { planeObject } from '.'
  
  /**
   * Abstract Service for CRUD Operations in Firestore
   */
  export class FirestoreCrudService {
    db = db
    serviceName: string
    collection: CollectionReference<DocumentData>
    Model: any
  
    constructor (serviceName: string, Model?: any) {
      this.Model = Model
      this.serviceName = serviceName
      this.db = db
      this.collection = collection(db, serviceName)
    }
  
    getSubcollectionService (docId: string, subcollectionName: string) {
      const path = this.serviceName + '/' + docId + '/' + subcollectionName
      return new FirestoreCrudService(path)
    }
  
    /**
     * Merge a pice of data to a stored doc.
     */
    merge (_id: string, obj: unknown) {
      const user: User|null = auth.currentUser
      if (!user) {
        throw new Error('User not identified')
      }
      const data = planeObject(obj)
      data.updatedAt = serverTimestamp()
      data.updater = {
        email: user.email,
        name: user.displayName || user.email?.split('@')[0],
      }
      const ref = doc(this.collection, _id)
      return updateDoc(ref, data)
        .then((docRef) => {
          return docRef
        })
        .catch((error) => {
          console.error('Error to merge', error)
          throw error
        })
    }
  
    /**
     * Create or update a doc
     */
    async save (obj: any, isUpdate = false,
      transaction?: Transaction | WriteBatch,
      process = true) {
      const data = process ? planeObject(obj) : obj
  
      if (!data.createdAt) {
        data.createdAt = serverTimestamp()
      }
      data.updatedAt = serverTimestamp()
  
      if (isUpdate && !obj._id) {
        throw new Error('Object _id not valid.')
      }
  
      const captalize = ['title', 'displayName', 'name', 'description']
  
      for (const prop in data) {
        let v = data[prop]
        if (_.isString(v) && prop !== '_id') {
          v = v.trim()
          if (captalize.includes(prop)) {
            v = v.charAt(0).toUpperCase() + v.slice(1)
          }
        }
        data[prop] = v
      }
  
      let ref = doc(this.collection)
      if (data._id) {
        ref = doc(this.collection, data._id)
        if (!isUpdate) {
          // Check if doc exist
          let doc
          if (transaction instanceof Transaction) {
            doc = await transaction.get(ref)
          } else {
            doc = await getDoc(ref)
          }
          if (doc.exists()) {
            throw new Error('doc_exists')
          }
        }
      }
  
      data.active = true
      data._id = ref.id
  
      // Define commit function to save data
      const commit = async () => {
        try {
          if (transaction instanceof Transaction) {
          // Return Promise
            await transaction.set(ref, data)
          } else if (transaction instanceof WriteBatch) {
          // Return write batch
            transaction.set(ref, data)
          } else {
          // Return Promise
            await setDoc(ref, data)
          }
          return data
        } catch (err) {
          console.error('Error to persist.', err)
          throw err
        }
      }
  
      // Check if process is true, if not, return the commit function
      if (process) {
        return commit()
      } else {
        return Promise.resolve({
          data,
          commit,
        })
      }
    }
  
    /**
     * Get a doc data.
     */
    get (_id: any) {
      if (typeof _id !== 'string' || !_id) {
        throw new TypeError('_id must be a valid string')
      }
      const Model = this.Model
      const docRef = doc(this.collection, _id)
      return getDoc(docRef).then((doc) => {
        if (!doc.exists()) { throw new Error('Doc not exists.') }
        let obj = Object.assign(doc.data(), { _id: docRef.id })
        if (!obj.active) { throw new Error('Doc inactivated, you need restore before get.') }
        if (this.Model) {
          obj = _.merge(new Model(), obj)
          return obj as ReturnType<typeof Model>
        }
        return obj
      }).catch((error) => {
        console.error('Error to get.', error)
        throw error
      })
    }
  
    /**
     * List collection docs.
     */
    async list ({
      itemsPerPage = 10,
      period = undefined,
      sortBy = [],
      sortDesc = [],
      search = '',
      page = 0,
    }:ListParams = {}) {
      // Quering
      const qs = []
      if (period && period.start && period.end) {
        if (!period.field) {
          throw new Error('Field not specified')
        }
        qs.push(where(period.field, '>=', period.start))
        qs.push(where(period.field, '<=', period.end))
      }
      if (itemsPerPage && itemsPerPage > 0) {
        qs.push(limit(itemsPerPage))
      }
      if (Array.isArray(sortBy)) {
        sortBy.forEach((field, n) => {
          if (Array.isArray(sortDesc) && sortDesc[n]) {
            qs.push(orderBy(field, 'desc'))
          } else {
            qs.push(orderBy(field))
          }
        })
      }
  
      let items:unknown[] = []
      if (search) {
        const hits = await this.search(search, {
          hitsPerPage: itemsPerPage,
          page,
        })
        hits.forEach((doc: any) => {
          items.push({ _id: doc.objectID, ...doc })
        })
      } else {
        const querySnapshot = await getDocs(query(this.collection, ...qs))
        querySnapshot.forEach((doc) => {
          items.push(Object.assign(doc.data(), { _id: doc.id }))
        })
      }
      items = items.map((item) => {
        return _.merge(new this.Model(), item)
      })
      return { items }
    }
  
    async search (query: string, params = { hitsPerPage: 1, page: 0 }) {
      const algoliasearch = require('algoliasearch')
      const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY)
      const index = client.initIndex(process.env.ALGOLIA_PREFIX + this.serviceName)
      // Perform an Algolia search:
      // https://www.algolia.com/doc/api-reference/api-methods/search/
      const response = await index.search(query, params)
      return response.hits
    }
  
    /**
     * Remove a doc.
     */
    remove (data: any) {
      const docRef = doc(this.collection, data._id)
      return deleteDoc(docRef).catch(function (error) {
        console.error('Error to delete.', error)
        throw error
      })
    }
  }
  