import axios from 'axios';
import './App.css';
import {useState} from "react";


function App() {
    const [countries, setCountries] = useState([]);
async function fetchData(){
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all')
        console.log(response.data)
        setCountries(response.data);
    } catch (e) {
        console.error(e)
    }
}


    return (
        <>
            <button onClick={fetchData} type="button">
                Haal landen op
            </button>
            <ul>
                {countries.map((country) => {
                    return <li key={country}>{country[0]}</li>
                })}
            </ul>

        </>
    )
}

export default App
