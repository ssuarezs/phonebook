import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const createPerson = (newObject) => {
  const req = axios.post(baseUrl, newObject)
  return req.then(res => res.data)
}

const updatePerson = ({id, name, number}, newNumber) => {
  const newObject = { name, number: newNumber}
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(res => res.data)
}

const delPerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}


export default {
  getAll,
  createPerson,
  updatePerson,
  delPerson
}
