import axios from 'axios';
import './App.css';
import {useState} from "react";
import worldMap from './assets/world_map.png';
import regionColors from "./helpers/regionColors.js";



function App() {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState('')
async function fetchData(){
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all')
        console.log(response.data)
        setCountries(response.data);
    } catch (e) {
        console.error(e)
        setError('Kan de gegevens niet vinden...')
    }
}


    return (
        <>
            <header>
            <img src={worldMap} alt="a map of the world" className="world-map" />
                <h1>world regions</h1>
            </header>
            <main>
            <section className="country-section">
            <p className="error-message">{error}</p>
            <ul className="country-list">
                {countries
                    .sort((a, b) => a.population - b.population)
                    .map((country) => {
                    return <li key={country.name.common}>
                        <img className="country-flags" src={country.flags.png} alt="country flag"/>
                        <span className={regionColors(country.region)}>{country.name.common}</span>
                        <p className="population">Has a population of {country.population} people</p>
                    </li>
                })}
            </ul>
            <button onClick={fetchData} type="button">
                Haal landen op
            </button>
            </section>
            </main>
        </>
    )
}

export default App
