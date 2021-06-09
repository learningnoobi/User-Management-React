import Wrapper from '../Wrapper'
import axios from "axios"
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'

const Roles = () => {
    const [roles, setRoles] = useState([])
    useEffect(() => {
        const fetchRoles = async () => {
            const response = await axios.get('api/roles/')
            const res = response.data.results
            console.log(res)
            setRoles(res)
        }
        fetchRoles()
    }, [])

    const deleteRole = async (id) => {
        try {
            if (window.confirm('Are you sure you want to delete this Role ?')) {
                await axios.delete(`/api/roles/${id}`)
                console.log('deleted')
                setRoles(roles.filter(role => role.id !== id))
            }
        }
        catch (err) {
            console.log("error")
        }
    }



    return (
        <Wrapper>
            <Link to="/roles/create">
                <button className="btn btn-secondary float-left my-2">Add Role</button>
            </Link >
            <div className="table-responsive my-4">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map(role => {
                            return (
                                <tr key={role.id}>
                                    <td>{role.id}</td>
                                    <td>{role.name}</td>
                                    <td>
                                        <Link to={`/roles/${role.id}/edit`}> <button className="btn btn-info mx-1">Edit</button></Link>
                                        <button onClick={() => deleteRole(role.id)}
                                            className="btn btn-danger mx-1">Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    )
}

export default Roles
