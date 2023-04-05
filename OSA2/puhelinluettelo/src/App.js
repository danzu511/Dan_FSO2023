import { useState, useEffect } from 'react'
import com from './services/communication'

const Notification = ({ message }) => {
  if (message === null){
    return null
  }
  else if (message.endsWith("server")){
    return (
    <div className='successMessage' style={{color: 'red'}}>
      {message}
    </div>
    )
  }
  return (
    <div className='successMessage'>
      {message}
    </div>
  )
}
const Persons = ({persons, input, deletePerson}) => {
  if(input){
    const searchResults = persons.filter(person => person.name.toLowerCase().includes(input.toLowerCase()))
    return searchResults.map(person => <Person key={person.id} person={person}/>)
  }
  return (
    persons.map(person => <Person key={person.id} person={person} deletePerson={deletePerson}/>)
  )
  }
const Person = (props) => {
  const handleDelete = () => {
    console.log(props.person)
    if(window.confirm(`Delete ${props.person.name} ?`)){
      props.deletePerson(props.person.id)
    }
  }
  return (
    <p>
      {props.person.name} {props.person.number}
      <button onClick={handleDelete}>Delete</button>
    </p>
  )
}

const Filter = ({newSearch, handleSearch}) => {
  return (
    <form>
      <div>Filter by name: <input value={newSearch} onChange={handleSearch} /></div>
    </form>
  )
}
const PersonForm = ({addPerson, newName, handleNewName, newPhone, handleNewPhone}) => {
  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handleNewName}/></div>
      <div>phone: <input value={newPhone} onChange={handleNewPhone}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    com.getPeople().then((data) => setPersons(data))
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const personExists = persons.find(person => person.name === newName)
    const personObject = {
      name: newName,
      number: newPhone
    }
    setNewName(''); setNewPhone('')
    //Check if person already exists and change one's number
    if (personExists) {
      console.log(personExists)
      if(window.confirm(`Set new phone number for ${personExists.name}`)){
        com.updatePhone(personExists.id, personObject)
          .then(() => {
            const updatedPersons = persons.map(person => 
              person.id === personExists.id ? {...person, number : personObject.number} : person)
              setPersons(updatedPersons)
              setSuccessMessage(`Changed ${personObject.name} phone number to ${personObject.number}`)
              setTimeout(() =>{
                setSuccessMessage(null)
              }, 3000)
            })
            .catch(error => {
              setSuccessMessage(`${personExists.name} has been removed already from server`)
              setTimeout(() => {
                setSuccessMessage(null)
              }, 3000)
            })
    //Return from number change
          return
      }
    }
    setSuccessMessage(`Added ${personObject.name}`)
      setTimeout(() =>{
        setSuccessMessage(null)
      }, 3000)
    setPersons(persons.concat(personObject))
    console.log(persons)
    com.postPerson(personObject).then((response) => {
      personObject.id = response.data.id
      setPersons(persons.concat(personObject))
    })
  }

  const deletePerson = id => {
    const personToDelete = persons.find(person => person.id === id)
    com.deletePerson(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
      setSuccessMessage(`Deleted ${personToDelete.name}`)
      setTimeout(() =>{
        setSuccessMessage(null)
      }, 3000)
    })
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewPhone = (event) => {
    setNewPhone(event.target.value)
  }
  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage}/>
      <Filter newSearch={newSearch} handleSearch={handleSearch}/>
      <h3>Add a new person</h3>
      <PersonForm 
      addPerson={addPerson} 
      newName={newName} handleNewName={handleNewName} 
      newPhone={newPhone} handleNewPhone={handleNewPhone}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} input={newSearch} deletePerson={deletePerson}/>
    </div>
  )
}

export default App