import axios from 'axios'

const getAll = () => {
  return axios
    .get('http://localhost:3001/persons')
    .then(response => {
      const {data} = response
      return data
    })
}

const createPerson = ({name,number,id}) => {
  return axios
    .post('http://localhost:3001/persons', {name,number,id})
    .then(response => {
      const {data} = response
      return data
    })
}

const updatePerson = ({name,number,id}, newNumber) => {
  return axios
    .put(
      `http://localhost:3001/persons/${id}`, 
      {name, number: newNumber, id}
    )
    .then(response => {
      const {data} = response
      return data
    })
}

const delPerson = (id) => {
  return axios
    .delete(`http://localhost:3001/persons/${id}`)
}


export default {
  getAll,
  createPerson,
  updatePerson,
  delPerson
}
