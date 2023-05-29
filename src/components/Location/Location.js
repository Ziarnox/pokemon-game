import './Location.css'

function Location({name, setPage}) {
    const locationName = name[0].toUpperCase() + name.replaceAll("-"," ").substring(1,);

    return (
        <button className='location' onClick={() => setPage("encounter")}>{locationName}</button>
    )
}

export default Location;