import api from '../api'

const login = (data) => {
  return api.post('/users/login', { ...data })
}

const register = (data) => {
  return api.post('/users', { ...data })
}

export default { login, register }
