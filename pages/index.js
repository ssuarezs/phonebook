import { useState, useEffect } from 'react'
import { Filter, PersonForm, List } from '../components/index'
import perServices from './api/persons'

const useText = (initial) => {
  const [value, setValue] = useState('')

  const handle = e => {setValue(e.target.value)}
  const reset = () => setValue('')

  return [value, handle, reset]
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState([]) 

  const [added, setAdded] = useState('') 
  const [deleted, setDeleted] = useState('') 

  const [filText, handleFilText] = useText('')
  const [newName, handleName, resetName] = useText('')
  const [newNumber, handleNumber, resetNumber] = useText('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = { 
      name: newName, 
      number: newNumber, 
      id: persons.at(-1).id + 1 
    }
    const oldPerson = persons.filter(p => p.name === newName)
    if(oldPerson.length === 0){
      perServices.createPerson(newPerson)
      setPersons(prev => prev.concat(newPerson))
      setAdded(newName)
      setTimeout(()=>{
        setAdded('')
      }, 3000)
      resetName()
      resetNumber()
      setTimeout(()=>{
        setAdded('')
      }, 3000)
      return null
    }

    const sure = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    if(sure){
      perServices.updatePerson(oldPerson[0], newNumber)
      resetName()
      resetNumber()
      setPersons(prev => prev.map(p => {
        if(p.id !== oldPerson[0]?.id)
          return p
        return { ...oldPerson[0], number: newNumber }
      }))
    }
  }
  const handleDelete = (id, name) => {
    const sure = window.confirm(`Delete ${name}?`)
    const old = persons.filter(p => p.id === id)
    if(sure){
      perServices.delPerson(id)
      setPersons(prev => prev.filter(p => p.id !== id))
      setDeleted(old[0]?.name)
      setTimeout(()=>{
        setDeleted('')
      }, 3000)
    }
  }

  useEffect(() => {
    perServices.getAll().then(data => {
      setPersons(data)
    })
  }, [])

  useEffect(() => {
    const re = new RegExp(filText, 'i')
    setFilter(persons.filter(p => re.test(p.name)))
  }, [filText])

  return (
    <div style={{padding: '0 20px'}}>
      <h2>Phonebook</h2>
      {added ? 
        <div 
          style={{
            padding: 10, 
            margin: 10,
            width: 'auto',
            borderRadius: '1em',
            border: 'solid green',
            background: '#eee',
            color: 'green'
          }}
        >
          Added {added} 
        </div>
        : null}
      {deleted ? 
        <div
          style={{
            padding: 10, 
            margin: 10,
            width: 'auto',
            borderRadius: '1em',
            border: 'solid red',
            background: '#eee',
            color: 'red'
          }}
        >
          Information of {deleted} was removed from server
        </div>
        : null}
      <Filter
        value={filText}
        handle={handleFilText}
      />
      <h2>Add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit}
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <List
        filter={filter}
        persons={persons}
        filText={filText}
        del={handleDelete}
      />
    </div>
  )
}

export default App
