import { useState, useEffect } from 'react'
import axios from 'axios'





function App() {
  const [countries, setCountries] = useState([])
  const [searchValue,setSearchValue] = useState(null)
  
  useEffect(()=>{
    console.log('effect run, country is now', searchValue)
    
    if(searchValue){
      const urlApi = `https://restcountries.com/v3.1/name/${searchValue}`;
      console.log('fetching countries...')
      axios
        .get(urlApi)
        .then(response => {
          console.log(response.data)
          setCountries(response.data)  
      }).catch ((error)=> {
        console.error("Error fetching: ",error)
      }) 
      }else{
        console.log('Not entries')
      }
    },[searchValue])

    

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }
  

  return (
  <div>
    <h1>Countries</h1>
    <label>Search for a country: 
      <input type='text' value={searchValue} onChange={handleChange} />
    </label>

    {countries.length > 10 && (
      <p>Too many countries, please make your entry specific</p>)}

    {countries.length <= 10 && countries.length > 1  && (
      <div>
        <ul>
        {countries.map(country => (<li key={country.cnn3}>{country.name.common}</li>))}
        </ul>
        
      </div>
    )} 

     

    {countries.length ===1 && (
      <div>
        <h1>{countries[0].name.common}</h1>
        <p>Capital: {countries[0].capital}</p>
        <p>Area: {countries[0].area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.keys(countries[0].languages).map((languageCode) => (
          <li key={languageCode}>{countries[0].languages[languageCode]}</li>
          ))}
        </ul>
        <img src={countries[0].flags.png} alt={countries[0].flags.alt} />

      </div>
    )} 
  </div>
  )
}

export default App
