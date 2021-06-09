import React from 'react'
import Wrapper from '../Wrapper'
import { useEffect, useState } from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom"
const CreateRoles = () => {
    const [perm, setPerm] = useState([])
    const [inputPerm, setInputPerm] = useState([])
    const [roleName, setRoleName] = useState('')
    let history = useHistory()


    useEffect(() => {
        const fetchPermissions = async () => {
            const response = await axios.get('api/permissions/')
            const res = response.data.results
            console.log(res)
            setPerm(res)

        }
        fetchPermissions()
    }, [])

    const submit = async (e) => {
        e.preventDefault()
        const response = await axios.post('api/roles/', {
            name: roleName,
            permissions: inputPerm
        })
        history.push('/roles')
        console.log(response)
    }
    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="name" id="name"
                            onChange={e => setRoleName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Permissions</label>
                    <div className="col-sm-10">

                        {perm.map(
                            (p) => {
                                return (
                                    <div className="form-check form-check-inline col-3" key={p.id}>
                                        <input className="form-check-input" type="checkbox" value={p.id}
                                            onChange={e => setInputPerm([...inputPerm, e.target.value])}
                                        />
                                        <label className="form-check-label">{p.name}</label>
                                    </div>
                                )
                            }
                        )}

                    </div>
                </div>

                <button className="btn btn-outline-info">Save</button>
            </form>
        </Wrapper>
    )
}

export default CreateRoles
