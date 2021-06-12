import React, { useState, useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import './Public.css'
import useForm from "../useForm"
import axios from "axios"
import { GlobalContext } from "../Global"


const Login = () => {
    const [values, handleChange] = useForm()

    const [formerror, setFormerror] = useState('')
    let history = useHistory()

    const { authenticated } = useContext(GlobalContext)
    useEffect(() => {
        if (authenticated) {
            history.push('/dashboard')
        }
    }, [history, authenticated])

    const submitLogin = async (e) => {
        e.preventDefault();
        const url = 'api/login/'

        try {
            let a = await axios.post(url, {
                email: email,
                password: password,
            })

            history.push('/')


        }
        catch (err) {
            console.log(err.response.data)
            setFormerror(err.response.data.detail)
        }
    }
    const { email, password } = values;
    const disabled =
        !email?.length ||
        !password?.length;

    return (
        <form onSubmit={submitLogin} className="form-signin my-3">
            <h4 className=" mb-3 btns delete">Please Log In</h4>

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
                <Link to="/register">
                    <button className="btns edit nav-a mx-3 my-3 home ">Need to create Account?</button>
                </Link>
            </p>
        </form>
    )
}

export default Login
