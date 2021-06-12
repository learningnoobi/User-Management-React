import React from 'react'
import { Link } from "react-router-dom"
const NotFound = () => {
    return (
        <div className="notfound">
            <div>
                <h1 className="four">404</h1>
                <h2>Page Not Found !</h2><br />
                <p>Sorry ! The page you requested doesnot exist .</p>
                <Link to="/">
                    <button className="btns edit">Go Back</button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound
