import { useState } from 'react'

const Name = ({person}) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "123-456" }
  ]) 
  
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')



  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const nameExits = persons.some((person)=>person.name === newName)
  if(nameExits){
    alert(`${newName} is already added to phonebook`)
    setNewName("")
    return;
  }

  const addPerson = (event) => {

    event.preventDefault()
    console.log('button clicked', event.target);
    const noteObject = {
      id:persons.length+1,
      name: newName,
      number: newNumber
    }
    console.log(noteObject)

    setPersons(persons.concat(noteObject))
    setNewName("")
    setNewNumber("")
    
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} 
          onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} 
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
      <div>{persons.map(person  => 
        <Name person={person}></Name>)
        }</div>
      </ul>
    </div>
  )
}

export default App