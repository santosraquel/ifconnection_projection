import testerConfig from '@@/firebase-tester-config.json'
import { result } from '@@/firebase-config.json'

const config = result.sdkConfig

export const firebaseTesterConfig = testerConfig
export const firebaseConfig = config
export const projectId = config.projectId
export const storageBucket = config.storageBucket
