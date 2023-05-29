import './Location.css'

function Location({name}) {

    return (
        <button className='location'>{name[0].toUpperCase() + name.replaceAll("-"," ").substring(1,)}</button>
    )
}

export default Location;