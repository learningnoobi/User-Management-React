import { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import Wrapper from '../Wrapper'

import Moment from 'moment';
import usePaginate from '../../usePaginate'
import Paginator from '../../components/Paginator'


const Orders = () => {
    const { page,
        setnext_page,
        setPrev_page,
        next, prev } = usePaginate();
    const [orders, setOrders] = useState([])


    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get(`ord/orders/?page=${page}`)
            console.log(response)
            setOrders(response.data.data)
            setnext_page(response.data.meta.next)
            setPrev_page(response.data.meta.previous)
        }
        fetchOrders()
    }, [setnext_page, page,
        setPrev_page,])

    const handleExport = async () => {
        const response = await axios.get('ord/export', { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'text/csv' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'orders.csv';
        link.click();
    }
    return (
        <Wrapper>
            <button onClick={handleExport} className="btns edit float-left">Export To CSV</button>
            <div className="table-responsive my-5">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {orders.map(pro => {
                            var dt = pro.created_at
                            return (
                                <tr key={pro.id}>
                                    <td>{pro.id}</td>
                                    <td>{pro.first_name} {pro.last_name}</td>
                                    <td>{pro.email}</td>
                                    <td>
                                        {Moment({ dt }).format('MMM Do YY')}</td>
                                    <td>{pro.total}</td>

                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/orders/${pro.id}`}> <button title="View" className="btns edit mx-1">View</button></Link>

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

export default Orders
