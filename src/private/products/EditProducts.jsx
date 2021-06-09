import React from 'react'
import { useParams } from "react-router-dom"

const EditProducts = () => {
    const { id } = useParams()
    return (
        <div>
            Edit Products -{id}
        </div>
    )
}

export default EditProducts
