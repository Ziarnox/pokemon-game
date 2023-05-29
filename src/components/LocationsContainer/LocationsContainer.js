import './LocationsContainer.css'
import Location from '../Location/Location';

function LocationsContainer(locations) {
    return (
        <>
            {
                locations.map(element => <Location name={element.name} />)
            }
        </>
    )
}

export default LocationsContainer;