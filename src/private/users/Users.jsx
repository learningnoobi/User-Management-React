
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import { useState, useEffect } from 'react'
import Wrapper from "../Wrapper"

const Users = () => {

    const [loading, setLoading] = useState(true)

    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [next_page, setnext_page] = useState('')
    const [prev_page, setPrev_page] = useState('')
    let history = useHistory()

    useEffect(() => {
        try {
            const userFetch = async () => {
                let response = await axios.get(`/api/users?page=${page}`)
                setLoading(false)
                console.log(response.data)
                let res = response.data
                setUsers(res.data)
                setnext_page(res.meta.next)
                setPrev_page(res.meta.previous)
            }
            userFetch()
        }
        catch (err) {
            history.push('/login')
        }

    }, [page, history])

    const next = async () => {
        if (next_page === null) return;
        setPage(prev => prev + 1)
    }

    const prev = async () => {
        if (prev_page === null) return;
        setPage(prev => prev - 1)
    }

    //deleting user
    const deleteUser = async (id) => {
        try {
            if (window.confirm('Are you sure you want to delete this user ?')) {
                await axios.delete(`/api/users/${id}`)
                console.log('deleted')
                setUsers(users.filter(user => user.id !== id))
            }
        }
        catch (err) {
            alert(err.response.data.detail)
        }
    }





    return (
        <Wrapper>

            <Link to="/users/create">
                <button className="btn btn-info">Add</button>
            </Link>
            <div className="table-responsive mt-2">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {loading ?
                            <tr className="text-center justify-content-center mt-4 spinner-border text-danger " role="status">
                            </tr>
                            : users.map(user => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id} </td>
                                        <td>{user.first_name} {user.last_name}</td>
                                        <td>{user.email} </td>
                                        {user.role ? <td>{user.role.name} </td> : <td>No role</td>}
                                        <td>
                                            <Link to={`/users/${user.id}/edit`}> <button className="btn btn-info mx-1">Edit</button></Link>
                                            <button onClick={() => deleteUser(user.id)}
                                                className="btn btn-danger mx-1">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}


                    </tbody>
                </table>
            </div>
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button onClick={prev} className="page-link">Previous</button>
                    </li>
                    <li className="page-item">
                        <button onClick={next} className="page-link">Next</button>
                    </li>
                </ul>
            </nav>
        </Wrapper>
    )
}

export default Users
