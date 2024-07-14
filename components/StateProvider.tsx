"use client"
import React, { createContext, useState } from "react"

export type ResponseDataType = {
    "customers": {
        id: number;
        name: string;
        customer_id: number;
        date: string;
        amount: number;
    }[]
}

type DataContextType = {
    customerData: ResponseDataType;
    setCustomerData: (customerData: ResponseDataType) => void;
    nameFilter: string;
    setNameFilter: (nameFilter: string) => void;
    transactionFilter: string;
    setTransactionFilter: (transactionFilter: string) => void;
}
export const StateContext = createContext({} as DataContextType)
function StateProvider({ children }: { children: React.ReactNode }) {
    const [customerData, setCustomerData] = useState<ResponseDataType>({} as ResponseDataType)
    const [nameFilter, setNameFilter] = useState("")
    const [transactionFilter, setTransactionFilter] = useState("0")
    return (
        <StateContext.Provider value={{ customerData, setCustomerData, nameFilter, setNameFilter, transactionFilter, setTransactionFilter }}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider
