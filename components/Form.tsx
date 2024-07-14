"use client"
import { useContext } from "react"
import { StateContext } from "./StateProvider"
const Form = () => {
    const { nameFilter, setNameFilter, transactionFilter, setTransactionFilter } = useContext(StateContext)

    return (
        <form>
            <div className="flex flex-col gap-3 mb-5">
                <label className="text-white" htmlFor="name">Filter By Name</label>
                <input type="text" value={nameFilter} onChange={e => setNameFilter(e.target.value)} className="text-white bg-transparent px-5 py-2 rounded-md border-[1px] border-gray-700" id="name" placeholder="Enter customer name" />
            </div>
            <div className="flex flex-col gap-3">
                <label className="text-white" htmlFor="transaction">Filter By Transaction Amount</label>
                <input type="number" value={transactionFilter} onChange={e => setTransactionFilter(e.target.value)} className="text-white border-[1px] px-5 py-2 rounded-md bg-transparent border-gray-700" id="transaction" />
            </div>
        </form>
    )
}

export default Form
