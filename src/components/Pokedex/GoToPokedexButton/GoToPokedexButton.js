import './GoToPokedexButton.css'

function GoToPokedexButton ({setPage}) {
const handlePokedexButton = () => {
    setPage("Pokedex")
}

    return (
        <>
        <button className="goToPokedex" onClick={handlePokedexButton}>Go to Pokedex</button>
        </>
    )
}

export default GoToPokedexButton