import { Link, NavLink } from "react-router-dom"
const Menu = () => {
    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to="/dashboard" className="nav-link">
                            <span data-feather="home"></span>
                        Dashboard

                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/users" className="nav-link">
                            <span data-feather="file"></span>
                    Users
                    </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/roles" className="nav-link">
                            <span data-feather="file"></span>
                    Roles
                    </NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default Menu
