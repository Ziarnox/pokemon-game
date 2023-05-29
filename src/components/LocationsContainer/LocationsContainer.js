import './LocationsContainer.css'
import Location from '../Location/Location';

function LocationsContainer({ locations }) {

    return (
        <>
            <div className='locations_container'>
                {
                    locations.map(element => <Location name={element.name} />)
                }
            </div>
        </>
    )
}

export default LocationsContainer;