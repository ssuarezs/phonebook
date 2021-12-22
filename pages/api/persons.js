import axios from 'axios'

const baseUrl = 'https://nameless-tundra-33166.herokuapp.com/api/persons'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const createPerson = (newObject) => {
  const req = axios.post(baseUrl, newObject)
  return req.then(res => res.data)
}

const updatePerson = ({id, name, number}, newNumber) => {
  //const newObject = { id, name, number: newNumber}
  //const req = axios.post(`${baseUrl}/${id}`, newObject)
  //return req.then(res => res.data)
  console.log('updatePerson')
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
