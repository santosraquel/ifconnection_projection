'use strict'

import * as functions from 'firebase-functions'
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore'
import { Config } from './config'
import { Logger } from './logs'
import { valueProcessor } from './processors'

export enum ChangeType {
  CREATE,
  DELETE,
  UPDATE,
}

export const getChangeType =
(change: functions.Change<DocumentSnapshot>): ChangeType => {
  if (!change.after.exists) {
    return ChangeType.DELETE
  }
  if (!change.before.exists) {
    return ChangeType.CREATE
  }
  return ChangeType.UPDATE
}

export const getObjectSizeInBytes = (object: unknown): number => {
  const recordBuffer = Buffer.from(JSON.stringify(object))
  return recordBuffer.byteLength
}

export const getFields = (config: Pick<Config, 'fields'>): Array<string> =>
  config.fields ? config.fields.split(/[ ,]+/) : []

export const areFieldsUpdated = (
    config: Config,
    before: DocumentSnapshot,
    after: DocumentSnapshot,
    logs: Logger

): boolean => {
  const fields = getFields(config)

  logs.debug(`fields: ${fields}`)
  // If fields are not configured, then execute update record.
  if (fields.length === 0) {
    return true
  }

  /* If fields are configured, then check the before
    and after data for the specified fields. */
  //  If any changes detected, then execute update record.
  for (const field of fields) {
    const beforeFieldValue = valueProcessor(field, before.get(field))[1]
    const afterFieldValue = valueProcessor(field, after.get(field))[1]
    if (JSON.stringify(beforeFieldValue) !== JSON.stringify(afterFieldValue)) {
      return true
    }
  }
  return false
}

export const isValidValue = (value: unknown): boolean => {
  return typeof value !== undefined && value !== null
}
