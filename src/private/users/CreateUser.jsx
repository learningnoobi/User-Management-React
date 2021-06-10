import React, { useState, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import '../../public/Public.css'
import axios from "axios"
import useForm from "../../useForm"
import Wrapper from "../Wrapper"



const CreateUser = () => {

    const [values, handleChange] = useForm()
    const [roles, setRoles] = useState([])
    const [inputRole, setinputRole] = useState('')

    let history = useHistory()
    const { firstname, lastname, email } = values

    const disabled =
        !email?.length ||
        !firstname?.length ||
        !lastname?.length ||
        inputRole.length === 0;

    useEffect(() => {
        const getroles = async () => {
            const response = await axios.get('/api/roles/')
            setRoles(response.data.results)
        }
        getroles()
        // setRoles(response)
    }, [])

    //Create User and redirect to user list
    const submitForm = async (e) => {

        e.preventDefault();
        const url = 'api/users/'
        try {
            await axios.post(url, {
                first_name: firstname,
                last_name: lastname,
                email: email,
                role: inputRole
            })
            history.push('/users')
        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <Wrapper>
            <form onSubmit={submitForm} className="col-lg-6 col-sm-10 m-auto">
                <h1 className="h3 mb-3 font-weight-normal">Create User</h1>

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



                <select className="form-control" aria-label="Default select example"
                    onChange={(e) => setinputRole(parseInt(e.target.value))}
                >   <option value="" >------- </option>
                    {roles.map(role => {
                        return (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        )
                    })}
                </select>
                <button disabled={disabled} className="mt-2 btn btn-lg btn-primary btn-block" type="submit">Create User</button>
                <Link to="/users"><button className="my-1 btns delete float-left mx-1"> Go Back</button></Link>

            </form>
        </Wrapper >
    )
}

export default CreateUser
