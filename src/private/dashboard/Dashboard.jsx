import Wrapper from "../Wrapper"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Bar } from 'react-chartjs-2';
import { Link } from "react-router-dom"
const Dashboard = () => {
    const [records, setRecords] = useState([])
    const [total_products, setTotal_products] = useState(null)
    const [total_ord, setTotal_ord] = useState(null)
    const [total_user, setTotal_user] = useState(null)


    useEffect(() => {

        const getChart = async () => {
            const response = await axios.get('ord/chart/')
            const total = await axios.get('pro/totals/')
            // console.log(total.data)
            setRecords(response.data.data)
            setTotal_products(total.data.total_products)
            setTotal_ord(total.data.total_orders)
            setTotal_user(total.data.total_users)
        }
        getChart()


    }, [])
    // console.log(records)


    const data = {
        labels: [...records.map(r => r.date)],
        datasets: [
            {
                label: 'Total Price of Order',
                backgroundColor: 'rgb(43, 226, 150)',
                // borderColor: 'rgba(0,0,0,1)',
                // borderWidth: 2,
                data: [...records.map(r => r.sum)]
            }
        ]
    }

    return (
        <Wrapper>

            <div className="row m-auto">

                <div className="total col-lg-3 col-sm-10 mt-1 mx-2">
                    <Link to="/products">  <h3>Total Products</h3>
                        <h2><b>{total_products}</b></h2></Link>
                </div>
                <div className="total col-lg-3 col-sm-10 mt-1 mx-2">
                    <Link to="/users">   <h3>Total Users</h3>
                        <h2><b>{total_user}</b></h2></Link>
                </div>
                <div className="total col-lg-3 col-sm-10 mt-1 mx-2">
                    <Link to="/orders">   <h3>Total Orders</h3>
                        <h2><b>{total_ord}</b></h2></Link>
                </div>
            </div>
            <br />
            <h2>Orders</h2>

            <Bar
                data={data}
                height={100}

                options={{
                    title: {
                        display: true,
                        text: 'Total Price',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />

        </Wrapper>
    )
}

export default Dashboard
