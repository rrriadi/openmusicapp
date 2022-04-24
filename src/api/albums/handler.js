const ClientError = require('../../exceptions/ClientError')

class AlbumsHandler {
  constructor (albumsService, songsService, validator) {
    this._albumsService = albumsService
    this._songsservice = songsService
    this.validator = validator

    this.postAlbumHandler = this.postAlbumHandler.bind(this)
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this)
    this.putAlbumbyIdHandler = this.putAlbumByIdHandler.bind(this)
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this)
  }

  async postAlbumHandler (request, h) {
    try {
      this.validator.validateAlbumPayload(request.payload)

      const albumId = await this._albumsService.addAlbum(request.payload)

      const response = h.response({
        status: 'success',
        message: 'Album berhasil ditambahkan',
        data: {
          albumId
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

  async getAlbumByIdHandler (request, h) {
    try {
      const { id } = request.params

      const requestedAlbum = await this._albumsService.getAlbumById(id)
      const requestedAlbumSongs = await this._songsService.getSongsByAlbumId(id)
      const album = { ...requestedAlbum, songs: requestedAlbumSongs }

      return {
        status: 'success',
        data: {
          album
        }
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: (error.message)
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

  async putAlbumByIdHandler (request, h) {
    try {
      this._validator.validateAlbumPayload(request.payload)
      const { id } = request.params
      await this._albumsService.editAlbumById(id, request.payload)

      return {
        status: 'success',
        message: 'Data berhasil diperbarui'
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: (error.message)
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

  async deleteAlbumByIdHandler (request, h) {
    try {
      const { id } = request.params

      await this._albumsService.deleteAlbumById(id)

      return {
        status: 'success',
        message: 'Data berhasil dihapus'
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: (error.message)
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

module.exports = AlbumsHandler
