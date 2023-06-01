import { useEffect, useState } from 'react';
import './App.css';
import EncounterCard from './components/EncounterCard/EncounterCard';
import Location from './components/Location/Location';
import GoToPokedexButton from './components/Pokedex/GoToPokedexButton/GoToPokedexButton';
import PokedexDisplay from './components/Pokedex/PokedexDisplay/PokedexDisplay';
import BattleScreen from './components/BattleScreen/BattleScreen';
import BackToMapButton from './components/Pokedex/BackToMapButton/BackToMapButton';
import BackToBattleButton from './components/Pokedex/BackToBattleButton/BackToBattleButton';
import dimonImg from './Dimon.png';


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
        defense: 50,
        level: 1
      },
      img: dimonImg,
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
          <div className='main_page flex-row-center-center'>
            <>
              <div className='main-page-header'>Pick Location</div>
              <div className='pokedex-bar flex-row-center-center'>
                <GoToPokedexButton setPage={setPage} target="Pokedex" />
                <img className='current-pokemon-image' src={selectedPokemon.img} alt={selectedPokemon.name} />
              </div>
              <div className='locations_container flex-row-center-center'>
                {locations.map((element, index) =>
                  <Location key={"location" + index}
                    name={element.name}
                    setPage={setPage}
                    url={element.url}
                    setPokemonURL={setPokemonURL}
                    setHasPokemons={setHasPokemons}
                  />)}
              </div>
            </>
          </div>);
      case "encounter":
        return (
          <div className='encounter-page flex-row-center-center'>
            <EncounterCard setPage={setPage}
              pokemonURL={pokemonURL}
              hasPokemons={hasPokemons}
              enemyDetails={enemyDetails}
              setEnemyDetails={setEnemyDetails} />
                          <div className='pokedex-bar flex-row-center-center'>
              <GoToPokedexButton setPage={setPage} target="encounterPokedex" />
              <img className='current-pokemon-image' src={selectedPokemon.img} alt={selectedPokemon.name} />
            </div>
          </div>
        );
      case "Pokedex":
        return (
          <div className='pokedex-page flex-row-center-center'>
            <BackToMapButton setPage={setPage} />
            <h1>Select your Pokemon</h1>
            <div className='pokemons-container flex-row-center-center'>
              {ownedPokemons.map((element, index) => <PokedexDisplay key={"pokemonID" + index} pokemon={element} setSelectedPokemon={setSelectedPokemon} />)}
            </div>
          </div>
        )
      case "encounterPokedex":
        return (
          <>
            <div className='pokedex-page flex-row-center-center'>
              <BackToBattleButton setPage={setPage} />
              <div className='pokemons-container flex-row-center-center'>
                {ownedPokemons.map((element, index) => <PokedexDisplay key={"pokemonID" + index} pokemon={element} setSelectedPokemon={setSelectedPokemon} />)}
              </div>
            </div>
          </>
        )
      case "battle":
        return <BattleScreen
          enemyDetails={enemyDetails}
          setPage={setPage}
          setEnemyDetails={setEnemyDetails}
          selectedPokemon={selectedPokemon}
          setOwnedPokemons={setOwnedPokemons}
          ownedPokemons={ownedPokemons}
          setSelectedPokemon={setSelectedPokemon} />;
      case "won_battle":
        return (
          <div className='win_screen flex-row-center-center'>
            <h1>Congratulations </h1>
            <h2>{enemyDetails.name[0].toUpperCase() + enemyDetails.name.substring(1,)} has been caught!</h2>
            <img className='battle-picture' src={enemyDetails.sprites["front_default"]} alt={enemyDetails.name} />
            <button className='back_button' onClick={returnToMainPage}>Back</button>
          </div>)
      case "lost_battle":
        return (
          <div className='lost_screen flex-row-center-center'>
            <h1>You lost the battle!</h1>
            <button className='back_button' onClick={returnToMainPage}>Back</button>
          </div>
        )
      default:
        break;
    }
  }

  return (
    <div className="App flex-row-center-center">
      {managePageState()}
    </div>
  );
}

export default App;
