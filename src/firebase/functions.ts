import { isDev } from '@/utils/jest'
import { projectId } from './configs'

export function getFunctionURL (endpoint:String) {
  endpoint = endpoint || ''
  if (isDev) {
    return `https://us-east1-${projectId}.cloudfunctions.net${endpoint}`
  } else {
    return `http://localhost:5000/${projectId}/us-east1${endpoint}`
  }
}
