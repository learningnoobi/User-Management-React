import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import './Public.css'
import useForm from "../useForm"
import axios from "axios"


const Login = () => {
    const [values, handleChange] = useForm()

    const [formerror, setFormerror] = useState(null)
    let history = useHistory()

    const submitLogin = async (e) => {
        e.preventDefault();
        const url = 'http://127.0.0.1:8000/api/login/'
        try {
            await axios.post(url, {
                email: email,
                password: password,
            })
            history.push('/')
        }
        catch (err) {
            setFormerror(err.response.data.detail)
        }
    }
    const { email, password } = values;
    const disabled =
        !email?.length ||
        !password?.length;
    console.log(disabled)
    return (
        <form onSubmit={submitLogin} className="form-signin my-3">
            <h1 className="h3 mb-3 font-weight-normal">Please Log In</h1>

            <input
                value={email || ""}
                onChange={handleChange}
                type="email"
                name="email"
                className="form-control my-2"
                placeholder="Email address" required autoFocus />


            <input
                value={password || ""}
                onChange={handleChange}
                type="password"
                name="password"
                className="form-control"
                placeholder="Password" required />

            <p className="error-msg">{formerror}</p>

            <button disabled={disabled} className="btn btn-lg btn-primary btn-block" type="submit">Log In</button>
            <p>
                <Link to="/">
                    <span className="nav-a mx-3 my-3 home">Go Home</span>
                </Link>
            </p>
        </form>
    )
}

export default Login
