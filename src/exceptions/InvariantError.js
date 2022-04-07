const ClientError = require('./ClientError')

class InvariantError extends ClientError {
  constructor (message) {
    super(message)
    this.statusCode = statusCode
    this.name = 'InvariantError'
  }
}

module.exports = InvariantError
