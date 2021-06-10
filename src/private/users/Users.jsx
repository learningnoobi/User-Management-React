
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import { useState, useEffect } from 'react'
import Wrapper from "../Wrapper"
import Paginator from "../../components/Paginator"
import Deleter from "../../components/Deleter"
import usePaginate from "../../usePaginate"

const Users = () => {

    const [loading, setLoading] = useState(true)

    const [users, setUsers] = useState([])
    const { page,
        setnext_page,
        setPrev_page,
        next, prev } = usePaginate()

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

    }, [page, setPrev_page, setnext_page, history])

    //deleting user
    const handleDelete = async (id) => {
        setUsers(users.filter(user => user.id !== id))
    }





    return (
        <Wrapper>

            <Link to="/users/create">
                <button className="btns edit">Add User</button>
            </Link>
            <div className="table-responsive  mt-2">
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
                                            <div className="btn-group mr-2">
                                                <Link to={`/users/${user.id}/edit`}> <button className="btns edit mx-1">Edit</button></Link>

                                                <Deleter id={user.id} endpoint={'api/users'} handleDelete={handleDelete} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}


                    </tbody>
                </table>
            </div>
            <Paginator next={next} prev={prev} />
        </Wrapper>
    )
}

export default Users
