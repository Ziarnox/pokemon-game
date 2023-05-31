import './GoToPokedexButton.css'

function GoToPokedexButton ({setPage, target}) {
const handlePokedexButton = () => {
    setPage(target)
}

    return (
        <>
        <button className="goToPokedex" onClick={handlePokedexButton}>Go to Pokedex</button>
        </>
    )
}

export default GoToPokedexButton