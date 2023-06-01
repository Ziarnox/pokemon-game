import './PokedexDisplay.css'

function PokedexDisplay({pokemon, setSelectedPokemon}) {

const handlePokemonButton = () => {
    setSelectedPokemon(pokemon);
}

    return (
        <button className='pokedexDisplay' onClick={handlePokemonButton}>
            <ul>
                <li>
            <p>Name: {pokemon.name}</p>
            <p>Level: {pokemon.stats.level}</p>
            <p>Health: {pokemon.stats.hp}</p>
            <p>Attack: {pokemon.stats.attack}</p>
            <p>Defense: {pokemon.stats.defense}</p>
            </li>
            </ul>
            <img src={pokemon.img} alt={pokemon.name}></img>
        </button>
    )
}

export default PokedexDisplay