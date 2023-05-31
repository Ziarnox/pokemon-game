import './BackToBattleButton.css'

function BackToBattleButton ({setPage}) {
    const handleBackToBattleButton = () => {
        setPage("encounter")
    }
    
        return (
            <>
            <button className="goToBattle" onClick={handleBackToBattleButton}>Go back to Encounter</button>
            </>
        )
    }


export default BackToBattleButton