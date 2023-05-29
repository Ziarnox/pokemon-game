import './Location.css'

function Location({ name, setPage, url, setCurrentLocation }) {
    const locationName = name[0].toUpperCase() + name.replaceAll("-", " ").substring(1,);
    
    async function getAreaData() {
        const modifiedURL = url.replace("location","location-area");
        const response = await fetch(modifiedURL);
        return await response.json();
    }

    const handleEncounterButton = () => {
        setCurrentLocation(getAreaData());
        setPage("encounter");
    }

    return (
        <button className='location' onClick={handleEncounterButton}>{locationName}</button>
    )
}

export default Location;