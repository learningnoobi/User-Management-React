import React, { useState } from 'react'
import Wrapper from '../Wrapper'
import axios from "axios"
import { useHistory, Link } from "react-router-dom"
import ImageUpload from '../../components/ImageUpload'

const CreateProduct = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [formerror, setFormerror] = useState('')
    let history = useHistory()

    const submit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('pro/products/',
                {
                    title,
                    description,
                    image,
                    price
                });
            history.push('/products')
        }
        catch (err) {
            console.log(err.response.data)
            setFormerror(err.response.data)
        }

    }



    return (
        <Wrapper>
            <form className="col-lg-19 col-md-10 m-auto col-sm-11" onSubmit={submit}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} type="text" className="form-control" name="title"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <p className="error-msg"> {formerror.title}</p>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea value={description} className="form-control" name="description"
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                    <p className="error-msg"> {formerror.description}</p>
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <ImageUpload value={image} imageChanged={setImage} />
                    <p className="error-msg"> {formerror.image}</p>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input value={price} type="number" className="form-control" name="email"
                        onChange={e => setPrice(parseFloat(e.target.value))}
                    />
                    <p className="error-msg"> {formerror.price}</p>
                </div>

                <button className="btns edit float-left">Save</button>
                <Link to="/products"><button className="btns delete float-left mx-1"> Cancel</button></Link>
            </form>
        </Wrapper>
    )
}

export default CreateProduct
