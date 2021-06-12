
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import { useState, useEffect, useContext } from 'react'
import Wrapper from "../Wrapper"
import Paginator from "../../components/Paginator"
import Deleter from "../../components/Deleter"
import usePaginate from "../../usePaginate"
import { GlobalContext } from "../../Global"

const Users = () => {

    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const { page,
        setnext_page,
        setPrev_page,
        next, prev } = usePaginate()

    let history = useHistory()
    const { canEdit } = useContext(GlobalContext)
    useEffect(() => {
        let debouncer;
        try {
            const userFetch = async (url) => {
                let response = await axios.get(url)
                setLoading(false)
                // console.log(response.data)
                let res = response.data
                setUsers(res.data)
                setnext_page(res.meta.next)
                setPrev_page(res.meta.previous)
            }
            if (search) {
                clearTimeout(debouncer)
                debouncer = setTimeout(() => {
                    userFetch(`api/users/?keyword=${search}`)
                }, 1000)
            }
            else {
                userFetch(`api/users?page=${page}`)
            }

        }

        catch (err) {
            console.log('sadf')
            console.log(err.response)
            setLoading(false)
        }
    }, [page, setPrev_page, setnext_page, history, search])

    //deleting user
    const handleDelete = async (id) => {
        setUsers(users.filter(user => user.id !== id))
    }

    const actions = (id) => {
        if (canEdit('users')) {
            return (
                <div className="btn-group mr-2">
                    <Link to={`/users/${id}/edit`}> <button className="btns edit mx-1">Edit</button></Link>

                    <Deleter id={id} endpoint={'api/users'} handleDelete={handleDelete} />
                </div>
            )
        }
    }




    return (
        <Wrapper>

            <Link to="/users/create">
                <button className="btns edit">Add User</button>
            </Link><br />
            <div className="input-div">
                <i className="fa fa-search search-icon"></i>
                <input onChange={e => setSearch(e.target.value)} placeholder="Search ..." type="text" className="input-search" />
            </div>
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
                                            {actions(user.id)}
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
