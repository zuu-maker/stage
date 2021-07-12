import React, {useState, useContext} from 'react'

const LoaderContext = React.createContext()

export function useLoader() {
    return useContext(LoaderContext)
}

export function LoaderProvider({ children }) {
    const [loader,setLoader] = useState(false);

    const value = {
        loader,
        setLoader
    }

    return (
        <LoaderContext.Provider value={value}>
            {   children}
        </LoaderContext.Provider>
    )
}
