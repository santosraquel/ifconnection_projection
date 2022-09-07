/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
'use strict'

import { Config } from './config'

export class Logger {
  obfuscatedConfig: unknown;

  constructor(config: Config) {
    this.obfuscatedConfig = {
      ...config,
      apiKey: '********',
    }
  }

  init(): void {
    console.info('Initializing extension with configuration', this.obfuscatedConfig)
  }

  start(): void {
    console.info('Started extension execution with configuration', this.obfuscatedConfig)
  }

  warn(...args: unknown[]): void {
    console.warn(args)
  }

  error(err: unknown): void {
    console.error('Error when performing Algolia index', err)
  }

  info(...args: unknown[]): void {
    console.info(args)
  }

  debug(...args: unknown[]): void {
    console.debug(args)
  }

  createIndex(id: string, data: unknown): void {
    console.info(`Creating new Algolia index for document ${ id }`, data)
  }

  updateIndex(id: string, data: unknown): void {
    console.info(`Updating existing Algolia index for document ${ id }`, data)
  }

  deleteIndex(id: string): void {
    console.info(`Deleting existing Algolia index for document ${ id }`)
  }

  fieldNotExist(field: string): void {
    console.warn(`The field "${ field }" was specified in the extension config but was not found on collection data.`)
  }
}
