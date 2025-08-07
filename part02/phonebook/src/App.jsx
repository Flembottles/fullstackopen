import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="message">{message}</div>
}

const Filter = ({ handleFilter }) => {
  return (
    <>
      <div>filter shown with <input onChange={handleFilter} /></div>
    </>
  )
}

const PersonForm = ({ addName, handleNameChange, handleNumberChange }) => {
  return (
    <>
      <form onSubmit={addName}>
        <div>name: <input onChange={handleNameChange} /></div>
        <div>number: <input onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
    </>
  )
}

const Persons = ({ persons, filteredName, handleDeletion }) => {
  return (
    <>
      <ul>
        {persons.filter(person => person.name.toLowerCase()
          .includes(filteredName.toLowerCase()))
          .map(person => <li key={person.name}>{person.name} {person.number}
            <button onClick={() => handleDeletion(person.id)}>Delete</button></li>)}
      </ul>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const url = 'http://localhost:3001/persons'
    const found = persons.find(({ name }) => name === newName)
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setFilteredName("")

    found ? updateNumber(found.id, found.name, newNumber) :
      personService.addPerson(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
  }

  const handleDeletion = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Do you want to delete ${personToDelete.name}`)) {
      const newList = persons.filter(person => person.id !== id)

      personService.deletePerson(id)
        .then(setPersons(newList))
        setNotification(`Deleted ${personToDelete.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
    }
  }

  const updateNumber = (id) => {
    if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
      const personToUpdate = persons.find(p => p.id === id)
      const changedPerson = { ...personToUpdate, number: newNumber }

      personService
        .updateNumber(id, changedPerson)
        .then(personToInsert => {
          setPersons(persons.map(person => person.id === id ? personToInsert : person))
          setNotification(`Updated ${changedPerson.name}'s number`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    const newSearch = event.target.value
    setFilteredName(newSearch)
  }
  console.log(filteredName)
  return (

    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter handleFilter={handleFilter} />
      <h2>Add a New</h2>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filteredName={filteredName} handleDeletion={handleDeletion} />
    </div>
  )
}

export default App