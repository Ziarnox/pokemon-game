import './Location.css'

function Location({ name, setPage, url, setPokemonURL, setHasPokemons }) {
    const locationName = name[0].toUpperCase() + name.replaceAll("-", " ").substring(1,);

    async function loadEncounterData() {
        const modifiedURL = url.replace("location", "location-area");
        const response = await fetch(modifiedURL);
        const data = await response.json();

        //dodać warunek dla pokemonów posiadanych w pokedexie
        if (data["pokemon_encounters"].length > 0) {
            const encountersArray = data["pokemon_encounters"];
            const randomNumber = Math.floor(Math.random() * encountersArray.length);
            setPokemonURL(encountersArray[randomNumber].pokemon.url);
            setHasPokemons(true);
        }
        else{
            setHasPokemons(false);
        }
    }

    const handleEncounterButton = async () => {
        await loadEncounterData();
        setPage("encounter");
    }

    return (
        <button className='location' onClick={handleEncounterButton}>{locationName}</button>
    )
}

export default Location;