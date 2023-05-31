import { useState } from 'react';
import './BattleScreen.css';

function BattleScreen({ enemyDetails, setPage, setEnemyDetails, selectedPokemon, setOwnedPokemons, ownedPokemons }) {
    const [playerStats, setPlayerStats] = useState(Object.assign({}, selectedPokemon.stats));
    const [enemyStats, setEnemyStats] = useState({
        hp: enemyDetails.stats[0]["base_stat"],
        attack: enemyDetails.stats[1]["base_stat"],
        defense: enemyDetails.stats[2]["base_stat"]
    })
    const [playerAttack, setPlayerAttack] = useState(calculateAttackValue(playerStats.attack, playerStats.defense));
    const [enemyAttack, setEnemyAttack] = useState(calculateAttackValue(enemyStats.attack, enemyStats.defense));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    const returnToMainPage = () => {
        setPage("main");
        setEnemyDetails(null);
    }

    function calculateAttackValue(attack, defense) {
        const randomNumber = Math.random() * (255 - 217) + 217;
        return Math.round(((((2 / 5 + 2) * Number(attack) * 60 / Number(defense)) / 50) + 2) * randomNumber / 255);
    }

    const setAttackValues = () => {
        setPlayerAttack(calculateAttackValue(playerStats.attack, playerStats.defense));
        setEnemyAttack(calculateAttackValue(enemyStats.attack, enemyStats.defense));
    }

    const addPokemonToCollection = () => {
        const objectToPush = {
            name: enemyDetails.name[0].toUpperCase() + enemyDetails.name.substring(1,),
            stats: {
                hp: enemyDetails.stats[0]["base_stat"],
                attack: enemyStats.attack,
                defense: enemyStats.defense
            },
            img: enemyDetails.sprites["front_default"]
        }
        setOwnedPokemons([...ownedPokemons,...[objectToPush]]);
    }

    const handleAttackButton = () => {

        const handlePlayerTurn = () => {
            if (isPlayerTurn) {
                if (playerStats.hp > 0 && enemyStats.hp > 0) {
                    setEnemyStats(Object.assign(enemyStats, { hp: enemyStats.hp - playerAttack }));
                    setIsPlayerTurn(false);
                    if (enemyStats.hp <= 0) {
                        setIsPlayerTurn(true);
                        setEnemyStats(Object.assign(enemyStats, { hp: 0 }));
                        setTimeout(() => {
                            setPage("won_battle")
                            addPokemonToCollection();
                        }, 500);
                    }
                }
            }
        }

        const handleEnemyTurn = () => {
            setTimeout(() => {
                if (playerStats.hp > 0 && enemyStats.hp > 0) {
                    setPlayerStats(Object.assign(playerStats, { hp: playerStats.hp - enemyAttack }));
                    setIsPlayerTurn(true);
                    if (playerStats.hp <= 0) {
                        setIsPlayerTurn(false);
                        setPlayerStats(Object.assign(playerStats, { hp: 0 }));
                    }
                }
            }, 1000);
        }

        setAttackValues();
        handlePlayerTurn();
        handleEnemyTurn();
    }

    calculateAttackValue();
    return (
        <div className='battle-screen flex-row-center-center'>
            <div className='header-text'>Pokemon Battle</div>
            <div className='pokemons-fight-details flex-row-center-center'>
                <div className='pokemon-details flex-row-center-center'>
                    <div className='pokemon-battle-name'>{selectedPokemon.name}</div>
                    <img className='battle-picture' src={selectedPokemon.img} alt={selectedPokemon.name} />
                    <div className='health-bar'>{playerStats.hp}/{selectedPokemon.stats.hp} HP</div>
                </div>
                <div className='versus-text'>Vs</div>
                <div className='pokemon-details flex-row-center-center'>
                    <div className='pokemon-battle-name'>{enemyDetails.name[0].toUpperCase() + enemyDetails.name.substring(1,)}</div>
                    <img className='battle-picture' src={enemyDetails.sprites["front_default"]} alt={enemyDetails.name} />
                    <div className='health-bar'>{enemyStats.hp}/{enemyDetails.stats[0]["base_stat"]} HP</div>
                </div>
            </div>
            <div className='buttons flex-row-center-center'>
                <button className='attack-button' onClick={handleAttackButton} disabled={isPlayerTurn === false}>Attack</button>
                <button className='escape-button' onClick={returnToMainPage}>Escape</button>
            </div>
        </div>
    )
}

export default BattleScreen;