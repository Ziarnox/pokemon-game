import { useEffect, useState } from 'react';
import './App.css';
import EncounterCard from './components/EncounterCard/EncounterCard';
import Location from './components/Location/Location';
import GoToPokedexButton from './components/Pokedex/GoToPokedexButton/GoToPokedexButton';
import PokedexDisplay from './components/Pokedex/PokedexDisplay/PokedexDisplay';
import BattleScreen from './components/BattleScreen/BattleScreen';


function App() {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState("main");
  const [pokemonURL, setPokemonURL] = useState(null);
  const [hasPokemons, setHasPokemons] = useState(null);
  const [enemyDetails, setEnemyDetails] = useState(null);
  const [ownedPokemons, setOwnedPokemons] = useState([
    {
      name: "Dimon",
      stats: {
        hp: 50,
        attack: 50,
        defense: 50
      },
      img: "data:image/png;base64,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"
    }
  ]);
  const [selectedPokemon, setSelectedPokemon] = useState(ownedPokemons[0]);

  const returnToMainPage = () => {
    setPage("main");
    setEnemyDetails(null);
}

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
                <GoToPokedexButton setPage={setPage} />
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
        return <EncounterCard setPage={setPage}
          pokemonURL={pokemonURL}
          hasPokemons={hasPokemons}
          enemyDetails={enemyDetails}
          setEnemyDetails={setEnemyDetails} />;
      case "Pokedex":
        return (
          <>
            {ownedPokemons.map(element => <PokedexDisplay pokemon={element} setSelectedPokemon={setSelectedPokemon} />)}
          </>
        )
      case "battle":
        return <BattleScreen
        enemyDetails={enemyDetails}
        setPage={setPage}
        setEnemyDetails={setEnemyDetails}
        selectedPokemon={selectedPokemon}
        setOwnedPokemons={setOwnedPokemons}
        ownedPokemons={ownedPokemons} />;
      case "won_battle":
        return (
          <div className='win_screen flex-row-center-center'>
            <h1>Congratulations </h1>
            <h2>{enemyDetails.name[0].toUpperCase() + enemyDetails.name.substring(1,)} has been caught!</h2>
            <img className='battle-picture' src={enemyDetails.sprites["front_default"]} alt={enemyDetails.name} />
            <button className='back_button' onClick={returnToMainPage}>Back</button>
          </div>)

    }
  }

  return (
    <div className="App flex-row-center-center">
      {managePageState()}
    </div>
  );
}

export default App;
