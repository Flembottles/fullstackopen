import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_WeatherKey

const DetailedCountryData = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const languages = country.languages
  const flagUrl = country.flags.png
  
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
    .then(returnedWeather => {
      setWeather(returnedWeather.data)
    })
  }, [])
  
  if (!country || !weather) {
    return null
  }
  const icon = weather.weather[0].icon
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flagUrl}></img>
      <h1>Weather in {country.capital}</h1>
      <p>Temperature: {weather.main.temp}</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
      <p>Wind: {weather.wind.speed} m/s</p>
      {console.log(weather.weather[0].icon)}
    </>
  )
}

const CountryList = ({ userInput, countryNames, countries, handleDetailedList }) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase()
    .includes(userInput.toLowerCase()))

  const numberOfCountries = filteredCountries.length

  if (numberOfCountries < 10) {
    if (numberOfCountries === 1) {
      return (
        <DetailedCountryData country={filteredCountries[0]}/>
      )
    }
    return (
      <ul>
        {filteredCountries.map(country =>
          <li key={country.name.common}>{country.name.common}
            <button onClick={() => handleDetailedList(country)}>Show</button></li>)}
      </ul>
    )
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
}

const InputForm = ({ query }) => {
  return (
    <form>
      <div>Find Countries: <input onChange={query} /></div>
    </form>
  )
}

function App() {
  const [countryQuery, setCountryQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [countryNames, setNames] = useState([])
  const [detailedCountry, setDetailedCountry] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((apiCountries) => {
        setCountries(apiCountries.data)
        setNames(apiCountries.data.map(country => country.name.common))
      })
  }, [])

  const handleDetailedList = (country) => {
    setDetailedCountry(country)
  }

  const handleInputChange = (event) => {
    const newSearch = event.target.value
    setCountryQuery(newSearch)
  }

  return (
    <>
      <InputForm query={handleInputChange} />
      <CountryList userInput={countryQuery}
        countryNames={countryNames}
        countries={countries}
        handleDetailedList={handleDetailedList} />
      {detailedCountry != null &&
        <DetailedCountryData country={detailedCountry} getWeatherData={getWeatherData} />}
    </>
  )
}

export default App
