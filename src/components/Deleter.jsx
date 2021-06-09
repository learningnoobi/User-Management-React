import React from 'react'
import axios from "axios"


const Deleter = ({ id, endpoint, handleDelete }) => {

    const deleter = async (id) => {
        try {
            if (window.confirm('Are you sure you want to delete this Products ?')) {
                await axios.delete(`${endpoint}/${id}`)
                console.log('deleted')
                handleDelete(id)
            }
        }
        catch (err) {
            alert(err.response.data.detail)
        }
    }
    return (
        <div>
            <button onClick={() => deleter(id)}
                className="btn btn-danger mx-1">Delete</button>
        </div>
    )
}

export default Deleter
