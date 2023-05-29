import './Location.css'

function Location({ name, setPage, url, setCurrentLocation }) {
    const locationName = name[0].toUpperCase() + name.replaceAll("-", " ").substring(1,);
    
    async function getAreaData() {
        const modifiedURL = url.replace("location","location-area");
        const response = await fetch(modifiedURL);
        const data = await response.json();
        setCurrentLocation(data);
    }

    const handleEncounterButton = () => {
        getAreaData();
        setPage("encounter");
    }

    return (
        <button className='location' onClick={handleEncounterButton}>{locationName}</button>
    )
}

export default Location;