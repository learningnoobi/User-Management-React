import React, { useEffect, useState } from 'react'
import Wrapper from '../Wrapper'
import axios from "axios"
import { useHistory, useParams, Link } from "react-router-dom"
import ImageUpload from '../../components/ImageUpload'
import EditSuccess from '../../components/EditSuccess'

const CreateProduct = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')

    const [success, setSuccess] = useState('')
    const { id } = useParams()
    let history = useHistory()

    useEffect(() => {
        const getData = async () => {
            let response = await axios.get(`pro/products/${id}`)
            let res = response.data
            console.log(res)
            setTitle(res.title)
            setDescription(res.description)
            setImage(res.image)
            setPrice(res.price)
        }
        getData()
    }, [id])

    const submit = async (e) => {
        e.preventDefault()
        await axios.put(`pro/products/${id}/`,
            {
                title,
                description,
                image,
                price
            });
        setSuccess('Product Succesfully Updated !')
        // history.push('/products')
    }


    return (
        <Wrapper>
            {success.length > 0 &&
                <EditSuccess success={success} setSuccess={setSuccess} />
            }
            <form className="col-lg-19 col-md-10 m-auto col-sm-11" onSubmit={submit}>
                <div className="form-group">
                    <label>Title</label>
                    <input value={title} type="text" className="form-control" name="title"
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea value={description} className="form-control" name="description"
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Image</label>

                    <ImageUpload value={image} imageChanged={setImage} />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input value={price} type="number" className="form-control" name="email"
                        onChange={e => setPrice(parseFloat(e.target.value))}
                    />
                </div>

                <button className="btns edit float-left mx-2"><i className="fa fa-save"></i> Save</button>
                <Link to="/products"><button className="btns back float-left mx-1"> Go Back</button></Link>
            </form>
        </Wrapper>
    )
}

export default CreateProduct
