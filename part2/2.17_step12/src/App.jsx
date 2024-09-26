import { useState, useEffect } from 'react'
import axios from 'axios'
import Name from './components/Names'
import Notification from './components/Notification'
import commsService from './services/backEndComms'
import backEndComms from './services/backEndComms'
import './index.css'




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

const Numbers = ({persons,nameFilter, deleteName}) => {
  return (
    persons.filter((person) => person.name.toLowerCase().includes(nameFilter)).map((person) => (
    <Name key={person.id} person={person} deleteName={deleteName}/>))
     )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [nameFilter, setNameFilter] = useState('')

  const [confirmationMessage, setConfirmationMessage]  = useState (null)



  useEffect(  ()=>{ 
  console.log('hello from a hook')
  commsService
    .getAll()//Step 8
    .then(initialPersons => {
      console.log(initialPersons)
      setPersons(initialPersons)
    })
  }, [])


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



  
  //const numberExists = persons.some((person)=>person.number === newNumber )

  const addPerson = (event) => {

    event.preventDefault()
    console.log('button clicked', event.target);
    const noteObject = {
      name: newName,
      number: newNumber
    }
    console.log("Nuevo Obejto "+noteObject)



    const existingPerson = persons.find(person=>person.name === newName)

    // console.log("Existing person"+ existingPerson.id);
    
    if(existingPerson){
      const confirmUpdate = window.confirm(`${existingPerson.name} is already added to phonebook, 
      replaced the old number with a new one?`)

      if (!confirmUpdate) {
        console.log(
          "Update confirmation: "+confirmUpdate)
        return;
      }
      console.log("Update confirmation: "+confirmUpdate)
      
      
      //Update the number
      commsService
      .update(existingPerson.id,noteObject)
      .then(response => {
        setPersons(persons.map(person=>person.id === existingPerson.id?response:person))
        console.log(existingPerson.id)
        setConfirmationMessage (`Updated '${existingPerson.name}' number `)
        setTimeout(() => {
          setConfirmationMessage(null)
          }, 5000)  
      })
      .catch((error)=>{
        console.error("Error updating number: ", error.message)
        alert("Error updating")
      })
      setNewName("")
      setNewNumber("")
      
      return;

    }else{
      commsService
      .create(noteObject)//Step 9
      .then(returnedName => {
        setPersons(persons.concat(returnedName))
        setConfirmationMessage (`Created '${existingPerson.name}' number `)
        setTimeout(() => {
          setConfirmationMessage(null)
          }, 5000) 
        setNewName("")
        setNewNumber("")})
        .catch((error)=>{
          console.error("Error creating user: ", error.message)
          alert("Error creating user")
        })
    }


    
  }

  const deleteName = (id, name) =>{

    const confirmDelete= window.confirm(`Delete ${name}?`)
    if(!confirmDelete){
      return;
    }

    backEndComms
    .remove(id)
    .then(()=>{
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch((error)=>{
      console.log('Error deleting person', error.message)
      alert("Error deleting person");
    })
  }

  

  return (
    <div>
      <Notification message={confirmationMessage} ></Notification>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange}></Filter>
      <h2>add a new</h2>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} ></Form>

      <h2>Numbers</h2>
      <ul>
        <Numbers persons={persons} nameFilter={nameFilter} deleteName={deleteName}></Numbers>
      </ul>
    </div>
  )
}

export default App