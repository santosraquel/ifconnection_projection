import { SearchIndex } from 'algoliasearch'
import { DocumentSnapshot } from 'firebase-functions/v1/firestore'
import { SearchParams } from '.'
import { Config } from './config'
import extract from './extract'
import { Logger } from './logs'
import { areFieldsUpdated } from './util'

export const handleCreateDocument = async (
    snapshot: DocumentSnapshot,
    timestamp: number,
    index: SearchIndex,
    params: SearchParams,
    config: Config,
    logs: Logger
) => {
  try {
    const data:any = await extract(snapshot, timestamp, config, logs)

    logs.debug(Object.assign({}, data))

    logs.createIndex(snapshot.id, data)
    await index.partialUpdateObject(data, { createIfNotExists: true })
    await updateConfigs(index, params)
  } catch (e) {
    logs.error(e)
  }
}

export const handleUpdateDocument = async (
    before: DocumentSnapshot,
    after: DocumentSnapshot,
    timestamp: number,
    index: SearchIndex,
    params: SearchParams,
    config: Config,
    logs: Logger
) => {
  try {
    if (areFieldsUpdated(config, before, after, logs)) {
      logs.debug('Detected a change, execute indexing')

      const data:any = await extract(after, timestamp, config, logs)
      logs.updateIndex(after.id, data)
      await index.partialUpdateObject(data, { createIfNotExists: true })
    }
    await updateConfigs(index, params)
  } catch (e) {
    logs.error(e)
  }
}

export const handleDeleteDocument = async (
    deleted: DocumentSnapshot,
    index: SearchIndex,
    logs: Logger
) => {
  try {
    logs.deleteIndex(deleted.id)
    await index.deleteObject(deleted.id)
  } catch (e) {
    logs.error(e)
  }
}

const updateConfigs = (index: SearchIndex, params: SearchParams) => {
  return index.setSettings({
    searchableAttributes: params.fields,
  })
}
