import React, { useEffect, useState } from 'react'
import Wrapper from '../Wrapper'
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios"
import useForm from "../../useForm"
import EditSuccess from '../../components/EditSuccess';

const UserEdit = () => {
    const { id } = useParams()

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')

    const [success, setSuccess] = useState('')
    const [roles, setRoles] = useState([])
    const [inputRole, setinputRole] = useState('')
    const [formerror, setFormerror] = useState(null)
    let history = useHistory()

    useEffect(() => {
        const getroles = async () => {
            const response = await axios.get('/api/roles/')
            setRoles(response.data.results)

            const userEdit = await axios.get(`api/users/${id}`)
            let user = userEdit.data
            console.log(user)
            setFirstname(user.first_name)
            setLastname(user.last_name)
            setEmail(user.email)
            setinputRole(user.role.id)

        }
        getroles()

        // setRoles(response)
    }, [id])



    const submitForm = async (e) => {
        e.preventDefault()
        await axios.put(`api/users/${id}/`, {
            first_name: firstname,
            last_name: lastname,
            email: email,
            role: inputRole
        })
        // history.push('/users')
        setSuccess("Successfully Edited !")
    }
    return (
        <Wrapper>
            {success.length > 0 &&
                <EditSuccess success={success} setSuccess={setSuccess} />
            }
            <form onSubmit={submitForm} className="form-signin my-3">
                <h1 className="h3 mb-3 font-weight-normal">Edit User</h1>

                <input
                    value={firstname}
                    name="firstname"
                    onChange={e => setFirstname(e.target.value)}
                    type="text" className="form-control my-2" placeholder="First Name" required autoFocus />


                <input
                    value={lastname || ""}
                    name="lastname"
                    onChange={e => setLastname(e.target.value)}
                    type="text" className="form-control my-2" placeholder="Last  Name" required />


                <input
                    value={email || ""}
                    name="email"
                    onChange={e => setEmail(e.target.value)}
                    type="email" className="form-control my-2" placeholder="Email address" required />



                <select value={inputRole} className="form-control" aria-label="Default select example"
                    onChange={(e) => setinputRole(parseInt(e.target.value))}
                >
                    <option>Select Role</option>
                    {roles.map(role => {
                        return (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        )
                    })}
                </select>



                <p className="error-msg">{formerror}</p>
                <button className="btns edit float-left mx-2"><i className="fa fa-save"></i> Save</button>
                <Link to="/users"><button className="btns delete float-left mx-1"> Go Back</button></Link>

            </form>
        </Wrapper>


    )
}

export default UserEdit
