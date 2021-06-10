import { useEffect, useLayoutEffect } from "react"

import { useEfffect } from 'react'
const EditSuccess = ({ success, setSuccess }) => {

    const displaynone = () => {
        setSuccess('')
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setSuccess('')
        }, 3000);
        return () => {
            clearInterval(interval)
        }
    }, [])
    return (
        <div className="success">
            {success}
            <span className="float-right">
                <i
                    onClick={displaynone}
                    className="fa fa-times"></i>
            </span>
        </div>
    )
}

export default EditSuccess
