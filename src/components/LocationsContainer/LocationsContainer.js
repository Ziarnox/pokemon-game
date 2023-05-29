import './LocationsContainer.css'
import Location from '../Location/Location';

function LocationsContainer({ locations, setPage }) {

    return (
        <>
            <div className='locations_container'>
                {
                    locations.map((element, index) => <Location key={"location" + index} name={element.name} setPage={setPage}/>)
                }
            </div>
        </>
    )
}

export default LocationsContainer;