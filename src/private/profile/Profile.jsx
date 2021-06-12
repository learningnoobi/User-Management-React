import React from 'react'
import Wrapper from '../Wrapper'
import { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import EditSuccess from '../../components/EditSuccess'
const Profile = () => {
    const [profile, setProfile] = useState([])
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')


    const [formerror, setFormerror] = useState('')

    const [old_password, setOld_password] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirm, setPassword_confirm] = useState('')
    const [success, setSuccess] = useState('')

    // setProfile(data.data)
    useEffect(() => {
        const getChart = async () => {


            const response = await axios.get('api/currentuser/')
            console.log(response.data.data)
            let res = response.data.data
            setProfile(res)
            setFirstname(res.first_name)
            setLastname(res.last_name)
            setEmail(res.email)

        }
        getChart()

    }, [])
    const submit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put('api/updateprofile/', {
                first_name: firstname,
                last_name: lastname,
                email: email,

            })
            console.log(response.data)

            setFirstname(response.data.first_name)
            setLastname(lastname)
            setEmail(email)
            setSuccess('Profile Succesfully Updated !')
        }
        catch (err) {
            console.log(err.response)
        }
    }
    const changePassword = async (e) => {
        e.preventDefault()
        try {
            await axios.put('api/updatepassword/', {
                old_password: old_password,
                password: password,
                password_confirm: password_confirm,
            })
            console.log('edited')
            setSuccess('Profile Succesfully Updated !')
        }

        catch (err) {
            console.log(err.response.data)
            setFormerror(err.response.data)
        }
    }



    return (
        <Wrapper>
            {success.length > 0 &&
                <EditSuccess success={success} setSuccess={setSuccess} />
            }
            <h2>Hello, {firstname}</h2>
            <div className="card cards">
                <div className="col-lg-6 card-body">
                    <p> <b>Full Name </b> : {firstname} {lastname}</p>
                    <p><b>Email </b>: {profile.email}</p>

                </div>
            </div>
            <h3 className="banner mt-3">Edit your Profile :</h3>
            <form className="col-lg-19 col-md-10 m-auto col-sm-11 form-edit" onSubmit={submit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input value={firstname} type="text" className="form-control" name="title"
                        onChange={e => setFirstname(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input value={lastname} type="text" className="form-control" name="title"
                        onChange={e => setLastname(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>email</label>
                    <input value={email} type="text" className="form-control" name="email"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <button className="btns edit float-left mx-2"><i className="fa fa-save"></i> Edit</button>

            </form>
            <br />
            <hr />

            <div style={{ marginTop: "20px" }}>
                <h3 className="banner mt-3">Change Password :</h3>
                <form onSubmit={changePassword} className="col-lg-19 col-md-10 m-auto col-sm-11 form-edit" onSubmit={submit}>

                    <div className="form-group">
                        <label>Old Password</label>
                        <input value={old_password} type="password" className="form-control" name="title"
                            onChange={e => setOld_password(e.target.value)}
                        />
                        <p className="error-msg"> {formerror.old}</p>
                    </div>
                    <div className="form-group">

                        <label>New Password</label>
                        <input value={password} type="password" className="form-control" name="title"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Re-enter New Password</label>
                        <input value={password_confirm} type="password" className="form-control" name="title"
                            onChange={e => setPassword_confirm(e.target.value)}
                        />
                        <p className="error-msg"> {formerror.new}</p>
                        <p className="error-msg"> {formerror.len}</p>
                    </div>


                    <button onClick={changePassword} type="submit" className="btns edit float-left mx-2"><i className="fa fa-save"></i> Change Password</button>

                </form>
            </div>


        </Wrapper>
    )
}

export default Profile
