'use strict'

const config = {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
  collectionPath: '',
  indexName: '',
  indexPrefix: process.env.ALGOLIA_PREFIX,
  fields: '',
}

export type Config = typeof config;
export default config
