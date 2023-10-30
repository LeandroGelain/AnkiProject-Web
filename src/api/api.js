import axios from 'axios'
import history from './history'
import humps from 'humps'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.request.use((request) => {
  const token = localStorage.getItem('anki/token')
  if (token != null) {
    request.headers.authorization = token
  }
  request.headers.crossDomain = true
  request.params = humps.decamelizeKeys(request.params)
  request.data = humps.decamelizeKeys(request.data)

  return request
})

api.interceptors.response.use(
  (response) => {
    response.headers.crossDomain = true
    response.params = humps.camelizeKeys(response.params)
    response.data = humps.camelizeKeys(response.data)

    return response
  },

  async (error) => {
    if (error?.response?.status === 403) {
      localStorage.removeItem('anki/token')
      localStorage.removeItem('anki/user')

      history.push('/')
      return Promise.reject(humps.camelizeKeys(error))
    }

    return Promise.reject(humps.camelizeKeys(error))
  }
)

export default api
