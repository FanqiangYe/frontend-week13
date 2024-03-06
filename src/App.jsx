import axios from 'axios';
import './App.css';
import {useState} from "react";
import worldMap from './assets/world_map.png';
import globes from './assets/4-globes.jpg'
import regionColors from "./helpers/regionColors.js";
import roundMillions from "./helpers/roundMillions.js";


function App() {
    const [countries, setCountries] = useState([]);
    const [countryInfo, setCountryInfo] = useState({})
    const [searchName, setSearchName] = useState('')
    const [error, setError] = useState('');
    const [errorName, setErrorName] = useState('');

    async function fetchCountries() {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all')
            console.log(response.data);
            setCountries(response.data);
        } catch (e) {
            console.error(e)
            setError('Kan de gegevens niet vinden...')
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setErrorName('')
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${searchName}`);
            const country = response.data[0]
            console.log(country)
            setCountryInfo(country)
            setSearchName('');
        } catch (e) {
            console.log(e)
            setErrorName(`${searchName} bestaat niet. Probeer het opnieuw.`)
        }
    }


    return (
        <>
            <header>
                <img src={worldMap} alt="a map of the world" className="world-map"/>
                <h1>world regions</h1>
            </header>
            <main>
                <section className="page-section">
                    <p className="error-message">{error}</p>
                    {countries.length > 0 && (
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
                    )}
                    <button onClick={fetchCountries} type="button">
                        Haal landen op
                    </button>
                </section>

                <section className="section-divider"></section>

                <section className="page-section extra">
                    <h2> Search country information</h2>
                    <img src={globes} alt="picture of globe" className="globes"/>
                    <form className="search-country" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="query"
                            id="query-field"
                            placeholder="Nederland"
                            value={searchName}
                            onChange={(event) => setSearchName(event.target.value)}
                        />
                        <button type="submit"> Zoek</button>
                        <p className="error-message">{errorName}</p>
                    </form>
                    {Object.keys(countryInfo).length > 0 &&
                        <article className="search-result">
                        <span className="flag-container">
                            <img className="search-flag" src={countryInfo.flags.png}/>
                            <h2>{countryInfo.name.common}</h2>
                        </span>
                            <p>{countryInfo.name.common} is situated in {countryInfo.subregion} and the capital
                                is {countryInfo.capital}.</p>
                            <p>It has a population of {roundMillions(countryInfo.population)} million people and it
                                borders with {countryInfo.borders.length} neighbouring countries.</p>
                        </article>
                    }
                </section>
            </main>
        </>
    )
}

export default App;
