import { useState, useEffect, createContext } from 'react'
import axios from "axios"


export const GlobalContext = createContext()


const Global = ({ children }) => {
    const [user, setUser] = useState('')
    const sname = "ishal"
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get('/api/currentuser')
                console.log("global", response)
                setUser(response.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchUser()
    }, [])
    return (
        <GlobalContext.Provider value={{ user, sname }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default Global
