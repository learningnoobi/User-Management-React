import { Link, useHistory } from "react-router-dom"
import axios from "axios"


const Nav = ({ menuChange }) => {
    let history = useHistory()
    const logout = async (e) => {
        await axios.post('/api/logout/', {})
        history.push('/login')
        console.log('logged out')
    }

    return (

        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <Link to="/">
                <span className="navbar-brand col-sm-3 col-md-2 mr-0" ><b>Weeb Admin</b></span>
            </Link>

            <i onClick={menuChange} className="fa fa-bars bars"></i>
            <ul className="navbar-nav px-3">

                <li className="nav-item form-inline p-2">
                    <Link to="/profile">
                        <span className="nav-a mx-3" >Profile</span>
                    </Link>


                    <button onClick={logout}
                        className="btn btn-danger nav-a mx-3" >Logout</button>
                </li>
            </ul>
        </nav>

    )
}

export default Nav
