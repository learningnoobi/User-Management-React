import Menu from '../components/Menu'
import Nav from '../components/Nav'
import axios from "axios"
import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

const Wrapper = (props) => {
    const [redirect, setRedirect] = useState(false)
    let history = useHistory()

    useEffect(() => {
        async function fetchUser() {
            try {
                let response = await axios.get('/api/currentuser')
                // console.log(response)
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

    return (

        <>

            <Nav />

            <div className="container-fluid">
                <div className="row">
                    <Menu />

                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Wrapper
