import { useEffect, useState } from 'react';
import './App.css';
import EncounterCard from './components/EncounterCard/EncounterCard';
import Location from './components/Location/Location';


function App() {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState("main");
  const [pokemonURL, setPokemonURL] = useState(null);
  const [hasPokemons, setHasPokemons] = useState(null);


  useEffect(() => {
    async function getLocations() {
      const response = await fetch("https://pokeapi.co/api/v2/location");
      const data = await response.json();
      setLocations(data.results);
    };

    getLocations();
  }, [])


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
                  setPokemonURL={setPokemonURL}
                  setHasPokemons={setHasPokemons}
                   />)
            }
          </div>);
      case "encounter":
        return <EncounterCard setPage={setPage} pokemonURL={pokemonURL} hasPokemons={hasPokemons}/>;
    }
  }

  return (
    <div className="App flex-row-center-center">
      {managePageState()}
    </div>
  );
}

export default App;
