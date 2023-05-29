import { useEffect, useState } from 'react';
import './App.css';
import EncounterCard from './components/EncounterCard/EncounterCard';
import Location from './components/Location/Location';


function App() {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState("main");
  const [currentLocation, setCurrentLocation] = useState({});

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
        return (
          <div className='locations_container flex-row-center-center'>
            {
              locations.map((element, index) =>
                <Location key={"location" + index}
                  name={element.name}
                  setPage={setPage}
                  url={element.url}
                  setCurrentLocation={setCurrentLocation} />)
            }
          </div>);
      case "encounter":
        console.log(currentLocation);
        return <EncounterCard setPage={setPage} />;
    }
  }

  return (
    <div className="App flex-row-center-center">
      {managePageState()}
    </div>
  );
}

export default App;
