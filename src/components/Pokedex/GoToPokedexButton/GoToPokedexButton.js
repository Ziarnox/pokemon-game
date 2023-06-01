import './GoToPokedexButton.css'
import pokeball from "./pokeball.png"

function GoToPokedexButton({ setPage, target }) {
    const handlePokedexButton = () => {
        setPage(target)
    }

    return (
        <>
            <button className="goToPokedex" onClick={handlePokedexButton}><img src={pokeball} alt='pokeball'></img></button>
        </>
    )
}

export default GoToPokedexButton