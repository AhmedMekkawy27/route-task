/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useContext } from 'react';
import { StateContext } from './StateProvider';
const Table = () => {
    const { customerData, setCustomerData, nameFilter, transactionFilter } = useContext(StateContext)
    useEffect(() => {
        fetch('http://localhost:3000/api/customer-data').then(response => response.json()).then(data => {
            const customers = data.customers
            const transactions = data.transactions
            const newData = []
            for (let i = 0; i < transactions.length; i++) {
                for (let j = 0; j < customers.length; j++) {
                    if (transactions[i].customer_id === customers[j].id) {
                        newData.push({ ...transactions[i], ...customers[j], id: i })
                    }
                }
            }
            setCustomerData({ "customers": newData })
        })
    }, [])
    console.log(customerData)
    return (
        <table className='mt-6'>
            <thead className='text-white border-b-[1px] border-gray-700'>
                <tr>
                    <th className='text-start py-3'>Customer id</th>
                    <th className='text-start'>Name</th>
                    <th className='text-start'>Transaction Amount</th>
                    <th className='text-start'>Date</th>
                </tr>
            </thead>
            <tbody className='text-white'>
                {customerData.customers && customerData.customers.filter((customer) => {
                    return transactionFilter == "" || transactionFilter == "0" ? customer : customer.amount?.toString().startsWith(transactionFilter)
                    // nameFilter == "" ? customer : customer.name?.toLowerCase().startsWith(nameFilter.toLowerCase())
                }).filter((customer) => {
                    return nameFilter == "" ? customer : customer.name?.toLowerCase().startsWith(nameFilter.toLowerCase())
                }).map(customer => (
                    <tr key={customer.id} className='border-b-[1px] border-gray-700'>
                        <td className='py-3'>{customer.customer_id}</td>
                        <td >{customer.name}</td>
                        <td >{customer.amount}</td>
                        <td >{customer.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
