import { useEffect, useState } from 'react';
import './EncounterCard.css';

function EncounterCard({ setPage, pokemonURL, hasPokemons }) {
    const [pokemonDetails, setPokemonDetails] = useState(null);

    useEffect(() => {
        async function getPokemonStats() {
            const response = await fetch(pokemonURL);
            const data = await response.json();
            setPokemonDetails(data);
        }

        getPokemonStats();
    }, [])

    const returnToMainPage = () => {
        setPage("main");
    }

    return (
        <>
            {hasPokemons ?
                (pokemonDetails && <div className='encounter_card flex-row-center-center'>
                    <div className='top-of-pokedex flex-row-center-center'>
                        <div className='blue-circle' />
                        <div className='red-circle' />
                        <div className='yellow-circle' />
                        <div className='green-circle' />
                    </div>
                    <div className='pokemon_data flex-row-center-center'>
                        <div className='pokemon-name'>{pokemonDetails.name[0].toUpperCase() + pokemonDetails.name.substring(1,)}</div>
                        <div className='details flex-row-center-center'>
                            <div className='stats'>
                                <ul>
                                    <li>HP: {pokemonDetails.stats[0]["base_stat"]}</li>
                                    <li>Attack: {pokemonDetails.stats[1]["base_stat"]}</li>
                                    <li>Def: {pokemonDetails.stats[2]["base_stat"]}</li>
                                </ul>
                            </div>
                            <img src={pokemonDetails.sprites["front_default"]} alt={pokemonDetails.name} />
                        </div>
                    </div>
                    <button className='battle_button'>Battle</button>
                    <button className='back_button' onClick={returnToMainPage}>Run</button>
                </div>)
                :
                <div className='no-pokemons-left flex-row-center-center'>
                    <h1>There is no pokemon left in this area</h1>
                    <button className='back_button' onClick={returnToMainPage}>Back</button>
                </div>
            }
        </>
    )
}

export default EncounterCard;