const middleware = {}

middleware['authenticate'] = require('../src/middleware/authenticate.js')
middleware['authenticate'] = middleware['authenticate'].default || middleware['authenticate']

export default middleware
