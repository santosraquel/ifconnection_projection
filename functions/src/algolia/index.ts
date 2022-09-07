import algoliasearch from 'algoliasearch'
import { ChangeType, getChangeType } from './util'
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore'
import { Logger } from './logs'
import config from './config'
import { defaultRegion } from '../firebase'
import { Change, CloudFunction } from 'firebase-functions/v1'
import { handleCreateDocument, handleDeleteDocument, handleUpdateDocument } from './docsOperations'

const client = algoliasearch(config.appId, config.apiKey)

export interface SearchParams{
  fields: string[],
  indexName?: string,
}

/**
 * @param {string} collectionPath
 * @param {Object} params
 * @return {CloudFunction}
 */
export function searchSync(collectionPath: string, params: SearchParams)
    : CloudFunction<Change<DocumentSnapshot>> {
  config.collectionPath = collectionPath + '/{id}'
  config.indexName = params.indexName || collectionPath
  const index = client.initIndex((config.indexPrefix || '') + config.indexName)

  const logs = new Logger(config)

  // Update the search index every time a blog post is written.
  return defaultRegion.firestore.document(config.collectionPath)
      .onWrite(async (change, context) => {
        logs.init()
        const eventTimestamp = Date.parse(context.timestamp)
        const changeType = getChangeType(change)
        switch (changeType) {
          case ChangeType.CREATE:
            await handleCreateDocument(change.after, eventTimestamp, index, params, config, logs)
            break
          case ChangeType.DELETE:
            await handleDeleteDocument(change.before, index, logs)
            break
          case ChangeType.UPDATE:
            await handleUpdateDocument(
                change.before, change.after, eventTimestamp, index, params, config, logs
            )
            break
          default: {
            throw new Error(`Invalid change type: ${ changeType }`)
          }
        }
      })
}
