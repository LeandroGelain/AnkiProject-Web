import api from '../api'

const get = () => {
  return api.get('/cards')
}

const post = (data) => {
  return api.post(
    '/cards',
    { ...data },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }
  )
}

const edit = (data) => {
  return api.patch(
    '/cards',
    { ...data },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }
  )
}

const destroy = (id) => {
  return api.delete(`/cards/${id}`)
}

export default { get, post, edit, destroy }
