import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import './Public.css'
import axios from "axios"
import useForm from "../useForm"


const Register = () => {

    const [values, handleChange, disabled] = useForm()
    const [formerror, setFormerror] = useState(null)
    let history = useHistory()
    const { firstname, lastname, email, password, password_confirm } = values


    const submitForm = async (e) => {

        e.preventDefault();
        const url = 'http://127.0.0.1:8000/api/register/'
        try {
            await axios.post(url, {
                first_name: firstname,
                last_name: lastname,
                email: email,
                password: password,
                password_confirm: password_confirm
            })
            history.push('/login')
        }
        catch (err) {
            setFormerror(err.response.data.detail)
        }

    }
    return (
        <form onSubmit={submitForm} className="form-signin my-3">
            <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>

            <input
                value={firstname || ""}
                name="firstname"
                onChange={handleChange}
                type="text" className="form-control my-2" placeholder="First Name" required autoFocus />


            <input
                value={lastname || ""}
                name="lastname"
                onChange={handleChange}
                type="text" className="form-control my-2" placeholder="Last  Name" required />


            <input
                value={email || ""}
                name="email"
                onChange={handleChange}
                type="email" className="form-control my-2" placeholder="Email address" required />


            <input
                value={password || ""}
                name="password"
                onChange={handleChange}
                type="password" className="form-control" placeholder="Password" required />


            <input
                value={password_confirm || ""}
                name="password_confirm"
                onChange={handleChange}
                type="password" className="form-control" placeholder="Confirm Password" required />


            <p className="error-msg">{formerror}</p>
            <button disabled={disabled} className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            <p>
                <Link to="/">
                    <span className="nav-a mx-3 my-3 home">Go Home</span>
                </Link>
            </p>
        </form>

    )
}

export default Register
