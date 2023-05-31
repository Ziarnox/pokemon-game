import { useEffect, useState } from 'react';
import './App.css';
import EncounterCard from './components/EncounterCard/EncounterCard';
import Location from './components/Location/Location';
import GoToPokedexButton from './components/Pokedex/GoToPokedexButton/GoToPokedexButton';
import PokedexDisplay from './components/Pokedex/PokedexDisplay/PokedexDisplay';
import BattleScreen from './components/BattleScreen/BattleScreen';
import BackToMapButton from './components/Pokedex/BackToMapButton/BackToMapButton';
import BackToBattleButton from './components/Pokedex/BackToBattleButton/BackToBattleButton';
import dimonImg from './Dimon.png'


function App() {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState("main");
  const [pokemonURL, setPokemonURL] = useState(null);
  const [hasPokemons, setHasPokemons] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [ownedPokemons, setOwnedPokemons] = useState([
    {
      name: "Dimon",
      stats: {
        hp: 50,
        attack: 50,
        defense: 50
      },
      img: dimonImg
    }
  ]);


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
              <>
                <GoToPokedexButton setPage={setPage} target="Pokedex" />
                {locations.map((element, index) =>
                  <Location key={"location" + index}
                    name={element.name}
                    setPage={setPage}
                    url={element.url}
                    setPokemonURL={setPokemonURL}
                    setHasPokemons={setHasPokemons}
                  />)}
              </>
            }
          </div>);
      case "encounter":
        return (
          <>
            <GoToPokedexButton setPage={setPage} target="encounterPokedex"/>
            <EncounterCard setPage={setPage}
              pokemonURL={pokemonURL}
              hasPokemons={hasPokemons}
              pokemonDetails={pokemonDetails}
              setPokemonDetails={setPokemonDetails} />
          </>
        );
      case "Pokedex":
        return (
          <>
          <BackToMapButton setPage={setPage} />
          {ownedPokemons.map(element => <PokedexDisplay pokemon={element} setSelectedPokemon={setSelectedPokemon} />)}
          </>
        )
      case "encounterPokedex":
        return (
          <>
          <BackToBattleButton setPage={setPage} />
            {ownedPokemons.map(element => <PokedexDisplay pokemon={element} setSelectedPokemon={setSelectedPokemon} />)}
          </>
        )
      case "battle":
        return (
          <>
            <BattleScreen pokemonDetails={pokemonDetails} setPage={setPage} setPokemonDetails={setPokemonDetails} />
          </>
        );
    }
  }

  return (
    <div className="App flex-row-center-center">
      {managePageState()}
    </div>
  );
}

export default App;
