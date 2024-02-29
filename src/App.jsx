import axios from 'axios';
import './App.css';

function App() {
    async function countries() {
        try {
            const result = await axios.get('https://restcountries.com/v3.1/all')
            console.log(result.data)
        } catch (e) {
            console.error(e);
        }
    }




    return (
        <>
            <button onClick={handleClick}>Klik hier voor alle landen</button>
        </>
    )
}

export default App
