
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./grindery-wallet-sdk.cjs.production.min.js')
} else {
  module.exports = require('./grindery-wallet-sdk.cjs.development.js')
}
