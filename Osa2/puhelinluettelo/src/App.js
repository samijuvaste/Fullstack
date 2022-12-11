import { useEffect, useState } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Filter = ({value, onChange}) => (
  <div>
      filter shown with <input
        value={value}
        onChange={onChange}
      />
  </div>
)

const PersonForm = ({name, nameHandling, number, numberHandling, addPerson}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input
        value={name}
        onChange={nameHandling}
      />
    </div>
    <div>
      number: <input
        value={number}
        onChange={numberHandling}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({persons, deleteHandling}) => (
  <div>
    {persons().map(person =>
      <div key={person.id}>
        {person.name} {person.number}
        <button value={person.id} onClick={deleteHandling}>delete</button>
      </div>
    )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [note, setNote] = useState(null)
  const [noteClass, setNoteClass] = useState('success')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const notificate = (msg, msgClass) => {
    setNoteClass(msgClass)
    setNote(msg)
    setTimeout(() => {
      setNote(null)
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (Array.isArray(persons) && persons.map(p => p.name).includes(newName)) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )) {
        const id = persons.find(p => p.name === newName).id
        const updatedPerson = {name: newName, number: newNumber}

        personService
          .update(id, updatedPerson)
          .then(person => {
            setPersons(persons.map(p => p.id === person.id ? person : p))
            notificate(`Updated ${person.name}`, 'success')
          })
          .catch(e => {
            notificate(
              `Information of ${updatedPerson.name} has already been removed from server`,
              'error'
            )
            setPersons(persons.filter(p => p.id !== id))
          })

        setNewName('')
        setNewNumber('')
      }
    } else {
      const newPerson = { name: newName, number: newNumber }

      personService
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          notificate(`Added ${person.name}`, 'success')
        })
        .catch( e => console.log(e))

      setNewName('')
      setNewNumber('')
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = () => (
    Array.isArray(persons)
    ? persons.filter(p =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    )
    : []
  )

  const deleteHandling = event => {
    const person = persons.find(p => p.id === Number(event.target.value))
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deleteObject(event.target.value)
        .then(() => {
          setPersons(oldPersons => oldPersons.filter(p => p !== person))
          notificate(`Deleted ${person.name}`, 'success')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification msg={note} className={noteClass}/>

      <Filter value={filter} onChange={handleFilterChange}/>

      <h3>Add a new</h3>

      <PersonForm
        name={newName}
        nameHandling={handleNameChange}
        number={newNumber}
        numberHandling={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} deleteHandling={deleteHandling}/>

    </div>
  )

}

export default App