import { useState, useEffect } from 'react'
import axios from 'axios'





function App() {
  const [countries, setCountries] = useState([])
  const [searchValue,setSearchValue] = useState(null)
  const [countrySelection, setCountrySelection] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [errorApi,setErrorApi] = useState(null)
  
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
          setCountrySelection(null)
          setWeatherData(null)  
      if(countries.length===1){
        const capital = countries[0].capital
        fetchWeatherData(capital);
      }
      }).catch ((error)=> {
        console.error("Error fetching: ",error)
      }) 
      }else{
        console.log('Not entries')
      }
    },[searchValue])


  const fetchWeatherData = (capital) => {
    try{
      const api_key = import.meta.env.VITE_SOME_KEY
      const urlApiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
      console.log('fetching weather')
      axios
      .get(urlApiWeather)
      .then(response => {
        console.log("weather data: ",response.data)
        setWeatherData(response.data)})
    }catch(error){
      console.error('Error fetching weather data:', error)
      setWeatherData(null)
      setErrorApi("Error to fecth weather data")
      console.log(errorApi)
    }
  }

    

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }
  
  const handleCountryButton=(country)=>{
    setCountrySelection(country)
    const capital=country.capital
    fetchWeatherData(capital)
  }

  return (
  <div>
    <h1>Countries</h1>
    <label>Search for a country: 
      <input type='text' value={searchValue} onChange={handleChange} />
    </label>

    {countries.length > 10 && searchValue!="" && (
      <p>Too many countries, please make your entry specific</p>)}

    {countries.length <= 10 && countries.length > 1  && (
      <div>
        <ul>
        {countries.map(country => (<li key={country.cnn3}>{country.name.common}<button onClick={()=>handleCountryButton(country)}>show</button></li>))}
        </ul>
        
      </div>
    )} 

     

    {(countries.length ===1 && (
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
        <h2>Weather in {countries[0].name.common}</h2>
          {
            weatherData && (<div>
              <p>Temperature: {weatherData.main.temp-273} Celsius</p>
              <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt='Weather Icon'></img>
              <p>Wind: {weatherData.wind.speed} m/s</p>
            </div>)
          }
      </div>
    )) }

    {(countrySelection && (
      <div>
        <h1>{countrySelection.name.common}</h1>
        <p>Capital: {countrySelection.capital}</p>
        <p>Area: {countrySelection.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.keys(countrySelection.languages).map((languageCode) => (
          <li key={languageCode}>{countrySelection.languages[languageCode]}</li>
          ))}
        </ul>
        <img src={countrySelection.flags.png} alt={countrySelection.flags.alt} />
        <h2>Weather in {countrySelection.name.common}</h2>
          {
            weatherData && (<div>
              <p>Temperature: {weatherData.main.temp-273} Celsius</p>
              <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt='Weather Icon'></img>
              <p>Wind: {weatherData.wind.speed} m/s</p>
            </div>)
          }
      </div>
    ))}
  </div>
  )
}

export default App
