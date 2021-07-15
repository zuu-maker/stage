import React, {useState, useContext} from 'react'

const TransactionContext = React.createContext()

export function useTransaction() {
    return useContext(TransactionContext)
}

export function TransactionProvider({ children }) {
    const [Transactions,setTransactions] = useState([]);
    const [depositSuccess,setDepositSuccess] = useState('');
    const [depositError,setDepositError] = useState('');


    const value = {
        Transactions,
        setTransactions,
        depositSuccess,setDepositSuccess,
        depositError,setDepositError
    }

    return (
        <TransactionContext.Provider value={value}>
            {   children}
        </TransactionContext.Provider>
    )
}
