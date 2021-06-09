import Wrapper from '../Wrapper'
import axios from "axios"
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import Paginator from '../../components/Paginator'
import Deleter from '../../components/Deleter'
import usePaginate from '../../usePaginate'

const Roles = () => {
    const [roles, setRoles] = useState([])
    const { page,
        setnext_page,
        setPrev_page,
        next, prev } = usePaginate();


    useEffect(() => {
        const fetchRoles = async () => {
            const response = await axios.get(`api/roles/?page=${page}`)
            const res = response.data.results
            setnext_page(response.data.next)
            setPrev_page(response.data.previous)
            setRoles(res)
        }
        fetchRoles()
    }, [page, setPrev_page, setnext_page])

    const handleDelete = async (id) => {
        setRoles(roles.filter(role => role.id !== id))

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
                                        <div className="btn-group mr-2">
                                            <Link to={`/roles/${role.id}/edit`}> <button className="btn btn-info mx-1">Edit</button></Link>

                                            <Deleter id={role.id} endpoint={'api/roles'} handleDelete={handleDelete} />
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

export default Roles
