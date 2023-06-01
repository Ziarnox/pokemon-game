import { useState } from 'react';
import './BattleScreen.css';

function BattleScreen({ enemyDetails, setPage, setEnemyDetails, selectedPokemon, setOwnedPokemons, ownedPokemons, setSelectedPokemon }) {
    const [playerStats, setPlayerStats] = useState(Object.assign({}, selectedPokemon.stats));
    const [enemyStats, setEnemyStats] = useState({
        hp: enemyDetails.stats[0]["base_stat"],
        attack: enemyDetails.stats[1]["base_stat"],
        defense: enemyDetails.stats[2]["base_stat"]
    })
    const [playerAttack, setPlayerAttack] = useState(calculateAttackValue(playerStats.attack, playerStats.defense));
    const [enemyAttack, setEnemyAttack] = useState(calculateAttackValue(enemyStats.attack, enemyStats.defense));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [isAutoBattleOn, setIsAutoBattleOn] = useState(false);

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
            img: enemyDetails.sprites["front_default"],
            level: 1
        }
        setOwnedPokemons([...ownedPokemons, ...[objectToPush]]);
    }

    const lvlUP = () => {
        const index = ownedPokemons.findIndex(element => element.name === selectedPokemon.name);
        const copiedPokemonsArr = [...ownedPokemons];
        console.log(selectedPokemon.stats.hp, selectedPokemon.stats.hp * 1.1, Math.round(selectedPokemon.stats.hp * 1.1))
        copiedPokemonsArr[index] = {
            name: selectedPokemon.name,
            stats: {
                hp: Math.round(selectedPokemon.stats.hp * 1.1),
                attack: Math.round(selectedPokemon.stats.attack * 1.1),
                defense: Math.round(selectedPokemon.stats.defense * 1.1)
            },
            img: selectedPokemon.img,
            level: selectedPokemon.level ++
        } 
        setOwnedPokemons(copiedPokemonsArr);
    }

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
                        lvlUP();
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
                    setTimeout(() => {
                        setPage("lost_battle");
                    }, 500);
                }
            }
        }, 1000);
    }

    const handleAttackButton = () => {
        setAttackValues();
        handlePlayerTurn();
        handleEnemyTurn();
    }

    const handleAutoBattleButton = () => {
        setIsAutoBattleOn(!isAutoBattleOn);
        while (isAutoBattleOn && playerStats.hp > 0 && enemyStats.hp > 0) {
            setAttackValues();
            handlePlayerTurn();
            handleEnemyTurn();
        }
    }

    calculateAttackValue();
    return (
        <div className='battle-screen flex-row-center-center'>
            <div className='header-text'>Pokemon Battle</div>
            <div className='pokemons-fight-details flex-row-center-center'>
                <div className='pokemon-details flex-row-center-center'>
                    <div className='pokemon-battle-name'>{selectedPokemon.name}</div>
                    <div className='pokemon-battle-level'>Lvl {selectedPokemon.level}</div>
                    <img className='battle-picture' src={selectedPokemon.img} alt={selectedPokemon.name} />
                    <div className='health-bar'>{playerStats.hp}/{selectedPokemon.stats.hp} HP</div>
                </div>
                <div className='versus-text'>Vs</div>
                <div className='pokemon-details flex-row-center-center'>
                    <div className='pokemon-battle-name'>{enemyDetails.name[0].toUpperCase() + enemyDetails.name.substring(1,)}</div>
                    <div className='pokemon-battle-level'>Lvl ???</div>
                    <img className='battle-picture' src={enemyDetails.sprites["front_default"]} alt={enemyDetails.name} />
                    <div className='health-bar'>{enemyStats.hp}/{enemyDetails.stats[0]["base_stat"]} HP</div>
                </div>
            </div>
            <div className='buttons flex-row-center-center'>
                <button className='attack-button' onClick={handleAttackButton} disabled={isPlayerTurn === false}>Attack</button>
                <button className='escape-button' onClick={returnToMainPage}>Escape</button>
                {
                    isAutoBattleOn
                        ? <button className='autobattle-button' onClick={handleAutoBattleButton}>Turn auto-battle off</button>
                        : <button className='autobattle-button' onClick={handleAutoBattleButton}>Turn auto-battle on</button>
                }

            </div>
        </div>
    )
}

export default BattleScreen;