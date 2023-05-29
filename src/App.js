import { useEffect, useState } from 'react';
import './App.css';
import LocationsContainer from './components/LocationsContainer/LocationsContainer';
import EncounterCard from './components/EncounterCard/EncounterCard';


function App() {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState("main");

  useEffect(() => {
    getLocations().catch(error => console.error("I am a teapot"));
  }, [])

  async function getLocations() {
    const response = await fetch("https://pokeapi.co/api/v2/location");
    const data = await response.json();
    setLocations(data.results);
  }

  const managePageState = () => {
    switch (page) {
      case "main":
        return locations.length > 0 && <LocationsContainer locations={locations} setPage={setPage}/>;
      case "encounter":
        return <EncounterCard setPage={setPage}/>;
    }
  }

  return (
    <div className="App">
      {managePageState()}
    </div>
  );
}

export default App;
