import './EncounterCard.css';

function EncounterCard({ setPage }) {

    const returnToMainPage = () => {
        setPage("main");
    }

    return (
        <>
            <div className='encounter_card flex-row-center-center'>
                <div className='top-of-pokedex flex-row-center-center'>
                    <div className='blue-circle' />
                    <div className='red-circle' />
                    <div className='yellow-circle' />
                    <div className='green-circle' />
                </div>
                <div className='pokemon_data flex-row-center-center'>
                    <div className='pokemon-name'>Piłkaczu</div>
                    <div className='details flex-row-center-center'>
                        <div className='stats'>
                            <ul>
                                <li>HP: 21</li>
                                <li>Attack: 3</li>
                                <li>Def: 7</li>
                            </ul>
                        </div>
                        <img src='https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png' />
                    </div>
                </div>
                <button className='battle_button'>Battle</button>
                <button className='back_button' onClick={returnToMainPage}>Back</button>
            </div>
        </>
    )
}

export default EncounterCard;