import React from 'react'
import Wrapper from '../Wrapper'
import { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import Paginator from '../../components/Paginator'
import Deleter from '../../components/Deleter'
import usePaginate from '../../usePaginate'

const Products = () => {
    const [products, setProducts] = useState([])
    const { page,
        setnext_page,
        setPrev_page,
        next, prev } = usePaginate();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`pro/products/?page=${page}`)
            console.log(response.data)
            setProducts(response.data.data)
            setnext_page(response.data.meta.next)
            setPrev_page(response.data.meta.previous)
        }
        fetchProducts()
    }, [page, setPrev_page, setnext_page])

    const handleDelete = async (id) => {
        setProducts(products.filter(pro => pro.id !== id))
    }

    return (
        <Wrapper>
            <div className="table-responsive my-4">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {products.map(pro => {
                            return (
                                <tr key={pro.id}>
                                    <td>{pro.id}</td>
                                    <td><img src={pro.image} alt="img" height="50" width="90" /></td>
                                    <td>{pro.title}</td>
                                    <td>{pro.description}</td>
                                    <td>{pro.price}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/products/${pro.id}/edit`}> <button className="btn btn-info mx-1">Edit</button></Link>

                                            <Deleter id={pro.id} endpoint={'pro/products'} handleDelete={handleDelete} />
                                        </div>

                                    </td>
                                </tr>
                            )
                        })}




                    </tbody>
                </table>
            </div>
            <Paginator next={next} prev={prev} />

        </Wrapper>
    )
}

export default Products
