import { Link, NavLink } from "react-router-dom"
const Menu = ({ menu }) => {
    return (
        <nav className={`col-md-2 d-${menu} d-md-block sidebar`}>
            <div className="sidebar-sticky">
                <div className="input-div">
                    <i className="fa fa-search search-icon"></i>
                    <input placeholder="Search ..." type="text" className="input-search" />
                </div>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to="/dashboard" className="nav-link">
                            <i className="fa fa-globe"></i>
                            <span className="mx-2">Dashboard</span>

                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/users" className="nav-link">
                            <i className="fa fa-users"></i>
                            <span className="mx-2">Users</span>

                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/roles" className="nav-link">
                            <i className="fa fa-paper-plane"></i>
                            <span className="mx-2">Roles</span>

                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/products" className="nav-link">
                            <i className="fa fa-car"></i>
                            <span className="mx-2">Products</span>

                        </NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default Menu
