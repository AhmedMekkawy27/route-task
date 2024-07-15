/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useContext, useState, useRef, MouseEventHandler } from 'react';
import { StateContext } from './StateProvider';
import BasicBars from "../components/ui/BasicBars";
import React, { MouseEvent } from 'react';
const Table = () => {
    const { customerData, setCustomerData, nameFilter, transactionFilter } = useContext(StateContext)
    const [visibility, setVisibility] = useState(false)
    const ref = useRef<HTMLTableRowElement>(null);
    const [dates, setDates] = useState([] as string[])
    const [amount, setAmount] = useState([] as number[])
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
    const handleVisibility = (e: MouseEvent<HTMLTableRowElement>) => {
        const datesArr = []
        const amountArr = []
        setVisibility(true)
        if (ref.current?.parentElement) {
            for (let i = 0; i < ref.current.parentElement.children.length; i++) {
                if (e.currentTarget.firstElementChild?.textContent === ref.current.parentElement.children[i].firstElementChild?.textContent) {
                    datesArr.push(ref.current.parentElement?.children[i]?.lastElementChild?.textContent as string)
                    amountArr.push(ref.current.parentElement?.children[i]?.lastElementChild?.previousElementSibling?.textContent as string)
                }
            }
            const parsedAmountArr = amountArr.map(amount => parseInt(amount))
            setDates(datesArr)
            setAmount(parsedAmountArr)
            console.log(datesArr)
            console.log(parsedAmountArr)
        }
    }
    return (
        <div className='mt-6 w-full'>
            <table className='w-full'>
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
                    }).filter((customer) => {
                        return nameFilter == "" ? customer : customer.name?.toLowerCase().startsWith(nameFilter.toLowerCase())
                    }).map(customer => (
                        <tr key={customer.id} ref={ref} className='border-b-[1px] border-gray-700' onClick={handleVisibility}>
                            <td className='py-3'>{customer.customer_id}</td>
                            <td >{customer.name}</td>
                            <td >{customer.amount}</td>
                            <td >{customer.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {visibility && <BasicBars xAxis={dates} yAxis={amount} />}
        </div>
    )
}

export default Table
