import { NavLink } from "react-router-dom"



const Menu = ({ menu, canView }) => {

    // const { canView } = useContext(GlobalContext)

    const menuItems = [
        {
            link: '/users',
            name: 'Users',
            icon_class: 'users',
        },
        {
            link: '/roles',
            name: 'Roles',
            icon_class: 'check-circle',
        },
        {
            link: '/products',
            name: 'Products',
            icon_class: 'briefcase',
        },


    ]


    const menus = []

    menuItems.forEach(item => {
        if (canView(item.name.toLowerCase())) {
            menus.push(
                <li key={item.name} className="nav-item">
                    <NavLink to={item.link} className="nav-link">

                        <i className={`fa fa-${item.icon_class}`}></i>
                        <span className="mx-2"> {item.name}</span>
                    </NavLink>
                </li>
            )

        }
    });





    return (
        <nav className={`col-md-2 d-${menu} d-md-block sidebar`}>
            <div className="sidebar-sticky">

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to="/dashboard" className="nav-link">
                            <i className="fa fa-globe"></i>
                            <span className="mx-2">Dashboard</span>

                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/orders" className="nav-link">
                            <i className="fa fa-car"></i>
                            <span className="mx-2">Orders</span>

                        </NavLink>
                    </li>

                    {menus}
                </ul>


                <li className="nav-item">
                    <a href="https://github.com/learningnoobi/User-Management-React" target="_blank" className="nav-link">
                        <i className="fa fa-github"></i>
                        <span className="mx-2">Github</span>

                    </a>
                </li>
            </div>
        </nav >
    )
}

export default Menu
