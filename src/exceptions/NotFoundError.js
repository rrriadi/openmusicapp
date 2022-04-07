const ClientError = require('./ClientError')

class NotFoundError extends ClientError {
  constructor (message) {
    super(message, 404)
    this.statusCode = statusCode
    this.name = 'NotFoundError'
  }
}

module.exports = NotFoundError
