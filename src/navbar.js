import {Link} from 'react-router-dom' 

let Navbar = () => {
    return (
        <ul className='flexer'>
            <li id='first'><Link to='/user' >Create Users</Link></li>
            <li><Link to='/' >Users</Link></li>
            <li><Link to='/post'>Create Excercise</Link></li>
            <li><Link to='/excercises'>Excercises</Link></li>
        </ul>
        )
}

export default Navbar