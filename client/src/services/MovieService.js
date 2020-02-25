import request from './index'

export default {
  create (data) {
    return request.post('/movies', data)
  },
  update (id, data) {
    return request.put(`/movies/${id}`, data)
  },
  delete (id) {
    return request.delete(`/movies/${id}`)
  },
  getById (id) {
    return request.get(`/movies/${id}`)
  },
  getAll (query = '') {
    return request.get(`/movies?${query}`)
  }
}
