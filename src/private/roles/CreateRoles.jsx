import React from 'react'
import Wrapper from '../Wrapper'
import { useEffect, useState } from 'react'
import axios from "axios"
import { useHistory, Link } from "react-router-dom"
const CreateRoles = () => {
    const [perm, setPerm] = useState([])
    const [inputPerm, setInputPerm] = useState([])
    const [roleName, setRoleName] = useState('')
    const [formerror, setFormerror] = useState('')
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
        try {
            const response = await axios.post('api/roles/', {
                name: roleName,
                permissions: inputPerm
            })
            history.push('/roles')
            console.log(response)
        }
        catch (err) {
            console.log(err.response.data)
            setFormerror(err.response.data.name)
        }
    }
    return (
        <Wrapper>
            <form onSubmit={submit}>
                <h4 className="text-center">Create Role</h4>
                <div className="mt-2 form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="name"
                            onChange={e => setRoleName(e.target.value)} autoFocus
                        />
                        <p className="error-msg"> {formerror}</p>
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

                <button className="btns edit float-left mx-2"><i className="fa fa-save"></i> Save</button>
                <Link to="/roles"><button className="btns delete float-left mx-1"> Go Back</button></Link>
            </form>
        </Wrapper>
    )
}

export default CreateRoles
