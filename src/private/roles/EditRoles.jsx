import React from 'react'
import { useParams } from "react-router-dom"

const EditRoles = () => {
    const { id } = useParams()
    return (
        <div>
            Roles - {id}
        </div>
    )
}

export default EditRoles
