/* eslint-disable camelcase */
const mapDBToSongModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  album_id
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id
})

const mapDBToSongsModel = ({
  id,
  title,
  performer
}) => ({
  id,
  title,
  performer
})

module.exports = { mapDBToSongModel, mapDBToSongsModel }
