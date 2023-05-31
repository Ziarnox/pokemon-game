import './BackToMapButton.css'

function BackToMapButton ({setPage}) {
    const handleBackToMapButton = () => {
        setPage("main")
    }
    
        return (
            <>
            <button className="goToMap" onClick={handleBackToMapButton}>Go to Map</button>
            </>
        )
    }


export default BackToMapButton