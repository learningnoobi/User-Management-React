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
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const { page,
        setnext_page,
        setPrev_page,
        next, prev } = usePaginate();

    useEffect(() => {
        let debouncer;
        const fetchProducts = async (extra) => {
            const response = await axios.get(extra)
            console.log(response.data)
            setProducts(response.data.data)
            setnext_page(response.data.meta.next)
            setPrev_page(response.data.meta.previous)
            setLoading(false)
        }

        if (search) {
            clearTimeout(debouncer)
            debouncer = setTimeout(() => {
                fetchProducts(`pro/products/?keyword=${search}`)
            }, 1000)
        }
        else {
            fetchProducts(`pro/products/?page=${page}`)
        }

    }, [page, setPrev_page, setnext_page, search])

    const handleDelete = async (id) => {
        setProducts(products.filter(pro => pro.id !== id))
    }

    return (
        <Wrapper>
            <Link to="/products/create">
                <button className="btns edit float-left">Add Product</button>
            </Link><br />
            <div className="input-div">
                <i className="fa fa-search search-icon"></i>
                <input onChange={e => setSearch(e.target.value)} placeholder="Search ..." type="text" className="input-search" />
            </div>
            <div className="table-responsive my-5">
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
                        {loading ?
                            <tr className="text-center justify-content-center mt-4 spinner-border text-danger " role="status">
                            </tr>
                            :
                            products.map(pro => {
                                return (
                                    <tr key={pro.id}>
                                        <td>{pro.id}</td>
                                        <td><img src={pro.image} alt="img" className="product_img" /></td>
                                        <td>{pro.title}</td>
                                        <td>{pro.description}</td>
                                        <td>{pro.price}</td>
                                        <td>
                                            <div className="btn-group mr-2">
                                                <Link to={`/products/${pro.id}/edit`}> <button title="Edit" className="btns edit mx-1">Edit</button></Link>

                                                <Deleter id={pro.id} endpoint={'pro/products'} handleDelete={handleDelete} />
                                            </div>

                                        </td>
                                    </tr>
                                )
                            })
                        }




                    </tbody>
                </table>
            </div>
            <Paginator next={next} prev={prev} />

        </Wrapper>
    )
}

export default Products
