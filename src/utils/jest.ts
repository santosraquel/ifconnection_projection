export const isATest = process.env.JEST_WORKER_ID !== undefined || process.env.NODE_ENV === 'test'
export const isDev = process.env.NODE_ENV === 'development'
export const emulate = isATest || isDev
