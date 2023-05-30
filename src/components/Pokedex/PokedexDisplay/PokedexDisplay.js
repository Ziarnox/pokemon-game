import './PokedexDisplay.css'

function PokedexDisplay({pokemon, setSelectedPokemon}) {

const handlePokemonButton = () => {
    setSelectedPokemon(pokemon)
    console.log(pokemon)
}


    return (
        <button className='PokedexDisplay' onClick={handlePokemonButton}>
            <p>Name: {pokemon.name}</p>
            <p>Health: {pokemon.stats.hp}</p>
            <p>Attack: {pokemon.stats.attack}</p>
            <p>Defense: {pokemon.stats.defense}</p>
            <img src={pokemon.img}></img>
        </button>
    )
}

export default PokedexDisplay