const ClientError = require('../../exceptions/ClientError')

class SongsHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    this.postSongHandler = this.postSongHandler.bind(this)
    this.getSongsHandler = this.getSongsHandler.bind(this)
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this)
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this)
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this)
  }

  async postSongHandler (request, h) {
    try {
      this._validator.validateSongPayload(request.payload)

      const songId = await this._service.addSong(request.payload)

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
          songId
        }
      })
      response.code(201)
      return response
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }

      const response = h.response({
        status: 'error',
        message: 'Terjadi kegagalan pada server kami. Silakan coba lagi.'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async getSongsHandler (request) {
    const { title, performer } = request.query
    let songs
    if (title && performer) {
      songs = await this._service.getSongByTitleAndPerformer(title, performer)
    } else if (title) {
      songs = await this._service.getSongByTitle(title)
    } else if (performer) {
      songs = await this.service.getSongByPerformer(performer)
    } else {
      songs = await this._service.getSongs()
    }
    return {
      status: 'success',
      data: {
        songs
      }
    }
  }

  async getSongByIdHandler (request, h) {
    try {
      const { id } = request.params

      const song = await this._service.getSongById(id)

      return {
        status: 'success',
        data: {
          song
        }
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }
      const response = h.response({
        status: 'error',
        message: 'Terjadi kegagalan pada server kami. Silakan coba lagi.'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async putSongByIdHandler (request, h) {
    try {
      this._validator.validateSongPayload(request.payload)
      const { id } = request.params

      await this._service.editSongById(id, request.payload)

      return {
        status: 'success',
        message: 'Lagu berhasil diperbarui'
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }

      const response = h.response({
        status: 'error',
        message: 'Terjadi kegagalan pada server kami. Silakan coba lagi.'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async deleteSongByIdHandler (request, h) {
    try {
      const { id } = request.params

      await this._service.deleteSongById(id)

      return {
        status: 'success',
        message: 'Lagu berhasil dihapus'
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }
      const response = h.response({
        status: 'error',
        message: 'Terjadi kegagalan pada server kami. Silakan coba lagi.'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }
}

module.exports = SongsHandler
