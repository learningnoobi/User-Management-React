import Menu from '../components/Menu'
import Nav from '../components/Nav'
import axios from "axios"
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

const Wrapper = (props) => {
    const [redirect, setRedirect] = useState(false)
    const [menu, setMenu] = useState("none")
    let history = useHistory()

    const [permission, setPermission] = useState('')
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get('/api/currentuser')
                setPermission(response.data.data.role.permissions)

            }
            catch {
                setRedirect(true)
            }
        }
        fetchUser()

    }, [])

    if (redirect) {
        history.push('/login')
    }

    const canView = (page) => {
        if (permission.length > 0) {
            return permission.some(p => p.name === `view_${page}`);
        }

    }



    const menuChange = () => {
        if (menu === "none") {
            setMenu("block")
        }
        if (menu === "block") {
            setMenu("none")
        }


    }

    return (

        <>

            <Nav menuChange={menuChange} />

            <div className="container-fluid">
                <div className="row">
                    <Menu menu={menu} canView={canView} />

                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    )
}


export default Wrapper
