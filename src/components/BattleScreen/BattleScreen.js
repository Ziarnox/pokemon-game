import './BattleScreen.css';

function BattleScreen({ pokemonDetails, setPage, setPokemonDetails }) {

    const returnToMainPage = () => {
        setPage("main");
        setPokemonDetails(null);
    }

    return (
        <div className='battle-screen flex-row-center-center'>
            <div className='header-text'>Pokemon Battle</div>
            <div className='pokemons-fight-details flex-row-center-center'>
                <div className='pokemon-details flex-row-center-center'>
                    <div className='pokemon-battle-name'>Piłkaczu</div>
                    <img className='battle-picture' src='https://kupujemyzabawki.pl/img/cms/Blog/12%20Oryginalne%20Pokemony/pikachu.png' />
                    <div className='health-bar'>XX / XX</div>
                </div>
                <div className='versus-text'>Vs</div>
                <div className='pokemon-details flex-row-center-center'>
                    <div className='pokemon-battle-name'>{pokemonDetails.name[0].toUpperCase() + pokemonDetails.name.substring(1,)}</div>
                    <img className='battle-picture' src={pokemonDetails.sprites["front_default"]} alt={pokemonDetails.name} />
                    <div className='health-bar'>{pokemonDetails.stats[0]["base_stat"]} / {pokemonDetails.stats[0]["base_stat"]}</div>
                </div>
            </div>
            <div className='buttons flex-row-center-center'>
                <button className='attack-button'>Attack</button>
                <button className='escape-button' onClick={returnToMainPage}>Escape</button>
            </div>
        </div>
    )
}

export default BattleScreen;