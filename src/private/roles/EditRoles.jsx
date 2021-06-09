import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom"
import Wrapper from "../Wrapper"
const EditRoles = () => {
    const { id } = useParams()
    const [perm, setPerm] = useState([])
    const [inputPerm, setInputPerm] = useState([])
    const [roleName, setRoleName] = useState('')
    let history = useHistory()


    useEffect(() => {
        const fetchPermissions = async () => {
            const response = await axios.get('api/permissions/')
            const roleCall = await axios.get(`api/roles/${id}`)
            const usersPerm = roleCall.data
            const res = response.data.results

            console.log(usersPerm)

            setRoleName(usersPerm.name)

            setPerm(res)

            setInputPerm(usersPerm.permissions.map(p => p.id))

        }
        fetchPermissions()

    }, [id])

    //MARK ALREADY GOT PERMISSIONS
    const check = (id) => {
        if (inputPerm.includes(id)) {
            return true

        }

    }
    const editRole = async (e) => {
        e.preventDefault()
        await axios.put(`api/roles/${id}/`, {
            name: roleName,
            permissions: inputPerm
        })
        console.log('edited')
    }
    return (
        <Wrapper>
            <form onSubmit={editRole}>
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="name" id="name"
                            defaultValue={roleName} onChange={e => setRoleName(e.target.value)}
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
                                        <input defaultChecked={check(p.id)}
                                            className="form-check-input" type="checkbox" value={p.id}
                                            onChange={e => setInputPerm([...inputPerm, parseInt(e.target.value)])}
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

export default EditRoles
