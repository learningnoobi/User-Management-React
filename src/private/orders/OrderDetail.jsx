import React from 'react'
import { useParams } from "react-router-dom"
import Wrapper from '../Wrapper'
import { useEffect, useState } from 'react'
import axios from "axios"
import Moment from "moment"
import { Link } from "react-router-dom"

const OrderDetail = () => {
    const [orderItem, setOrderItem] = useState([])

    const { id } = useParams()
    useEffect(() => {
        const fetchOrderIem = async () => {
            const response = await axios.get(`ord/orders/${id}`)
            console.log(response)
            setOrderItem(response.data.data.order_items)
        }
        fetchOrderIem()
    }, [id])


    return (
        <Wrapper>
            <>

                <div className="table-responsive mt-3">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Created At</th>
                                <th>Quantity</th>
                                <th>Order</th>
                            </tr>
                        </thead>
                        <tbody >

                            {orderItem.map(ord => {
                                let dt = ord.created_at
                                return (
                                    <tr key={ord.id}>
                                        <td>{ord.id} </td>
                                        <td>{ord.product_title}</td>
                                        <td>{ord.price}</td>
                                        <td>
                                            {Moment({ dt }).format('MMM Do YY')}</td>

                                        <td>{ord.quantity} </td>
                                        <td>{ord.order}</td>
                                    </tr>)
                            })}


                        </tbody>
                    </table>
                </div>
                <Link to="/orders"> <button title="View" className="btns edit mx-1">Go Back</button></Link>
            </>
        </Wrapper >
    )
}

export default OrderDetail
