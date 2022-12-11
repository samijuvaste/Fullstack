import { useEffect, useState } from 'react'
import  axios from 'axios'

const List = ({countries, buttonHandling}) => {
  return (
    <div>
      {countries.map(c =>
        <div key={c.name.common}>
          {c.name.common}
          <button value={c.name.common} onClick={buttonHandling}>show</button>
        </div>
      )}
    </div>
  )
}

const WeatherInfo = ({latlng, weather, setWeather}) => {

  const api_key = process.env.REACT_APP_API_KEY
  
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latlng[0]}&lon=${latlng[1]}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${api_key}`
      )
      .then(response => {
        const temperature = response.data.current.temp
        const icon = response.data.current.weather[0].icon
        const windSpeed = response.data.current.wind_speed
        setWeather([temperature, icon, windSpeed])
      })
  }, [])
  
  return(
    <div>
      temperature {weather[0]} Celsius <br/>
      <img src={`http://openweathermap.org/img/wn/${weather[1]}@2x.png`}/> <br/>
      wind {weather[2]} m/s
    </div>
  )
}

const CountryInfo = ({country, weather, setWeather}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>

      capital {Array.isArray
        ? country.capital.reduce((a, b) => a + ", " + b)
        : country.capital}
      <br/>
      area {country.area} <br/><br/>

      <b>languages:</b> <br/>
      <ul>
        {Object.values(country.languages).map(l =>
          <li key={l}>{l}</li>
        )}
      </ul>
      <br/>
      
      <img src={country.flags.png} width='20%' height='auto'/>

      <h3>
        Weather in {Array.isArray
        ? country.capital[0]
        : country.capital}
      </h3>
      <WeatherInfo latlng={country.capitalInfo.latlng} weather={weather} setWeather={setWeather}/>
    </div>
  )
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([0, '01d', 0])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(e => console.log(e))
  }, [])

  const filterHandler = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = countries.filter(c =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const buttonHandler = (event) => {
    setFilter(event.target.value)
  }

  const toShow = () => {
    if (countriesToShow.length > 10) {
      return 'Too many matches, specify another filter'
    } else if (countriesToShow.length > 1) {
      return <List countries={countriesToShow} buttonHandling={buttonHandler}/>
    } else if (countriesToShow.length == 1) {
      const country = countriesToShow[0]
      return <CountryInfo country={country} weather={weather} setWeather={setWeather}/>
    } else return (<></>)
  }

  return (
    <div>
      <div>
        find countries <input
          value={filter}
          onChange={filterHandler}
        />
      </div>
      {toShow()}
    </div>
  )
}

export default App;