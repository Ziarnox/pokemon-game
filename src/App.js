import { useEffect, useState } from 'react';
import './App.css';
import LocationsContainer from './components/LocationsContainer/LocationsContainer';


function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations().catch(error => console.error("I am a teapot"));
    console.log(locations);
  }, [])

  async function getLocations(){
    const response = await fetch("https://pokeapi.co/api/v2/location");
    const data = await response.json();
    setLocations(data.results);
  }

  return (
    <div className="App">
      {
        locations.length > 0 && <LocationsContainer locations={locations}/>
      }
    </div>
  );
}

export default App;
