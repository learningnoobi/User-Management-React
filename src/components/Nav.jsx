import { Link, useHistory } from "react-router-dom"
import axios from "axios"


const Nav = () => {
    let history = useHistory()
    const logout = async (e) => {
        await axios.post('/api/logout/', {})
        history.push('/login')
        console.log('logged out')
    }

    return (

        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <span className="navbar-brand col-sm-3 col-md-2 mr-0" >Company name</span>            <ul className="navbar-nav px-3">
                <li className="nav-item form-inline p-2">
                    <Link to="/login">
                        <span className="nav-a mx-3" >Log In</span>
                    </Link>
                    <Link to="/register">
                        <span className="nav-a mx-3" >Register</span>
                    </Link>

                    <button onClick={logout}
                        className="btn btn-danger nav-a mx-3" >Logout</button>
                </li>
            </ul>
        </nav>

    )
}

export default Nav
