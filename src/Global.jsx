
import { useState, useEffect, createContext } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios"

export const GlobalContext = createContext({});
const Global = ({ children }) => {

    const [permission, setPermission] = useState('')
    const [authenticated, setAuthenticated] = useState(false)
    let history = useHistory()

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get('/api/currentuser')
                setPermission(response.data.data.role.permissions)
                setAuthenticated(true)
            }
            catch (err) {
                console.log('Need to log in')
            }

        }
        fetchUser()

    }, [history])

    const canView = (page) => {
        if (permission.length > 0) {
            return permission.some(p => p.name === `view_${page}`);
        }

    }

    const canEdit = (page) => {
        if (permission.length > 0) {
            return permission.some(p => p.name === `edit_${page}`);
        }

    }


    return (
        <GlobalContext.Provider
            value={{
                canView,
                canEdit,
                permission,
                authenticated
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default Global
