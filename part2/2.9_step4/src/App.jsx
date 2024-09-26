import { useState } from 'react'

const Name = ({person}) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const Filter = ({nameFilter,handleNameFilterChange})=>{
  return (
  <div>
    Filter shown with: <input value={nameFilter} onChange={handleNameFilterChange}/>
  </div>
)}

const Form = ({addPerson,newName,handleNameChange,newNumber,handleNumberChange}) => {
  return (
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
)
}

const Numbers = ({persons,nameFilter}) => {
  return (
    persons.filter((person) => person.name.toLowerCase().includes(nameFilter)).map((person) => (
    <Name person={person} />))
     )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [nameFilter, setNameFilter] = useState('')

  


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    console.log(event.target.value)
    const filterValue = event.target.value.toLowerCase();
    setNameFilter(filterValue);
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
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange}></Filter>
      <h2>add a new</h2>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} ></Form>

      <h2>Numbers</h2>
      <ul>
        <Numbers persons={persons} nameFilter={nameFilter}></Numbers>
      </ul>
    </div>
  )
}

export default App