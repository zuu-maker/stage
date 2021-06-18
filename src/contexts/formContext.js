import React, {useState, useEffect, useContext} from 'react'

const FormContext = React.createContext()

export function useForm() {
    return useContext(FormContext)
}

export function FormProvider({ children }) {
  const [formType, setFormType] = useState('')
  const [options, setOptions] = useState([])

    const value = {
        formType,
        setFormType,
        options,
        setOptions
    }

    return (
        <FormContext.Provider value={value}>
            { children}
        </FormContext.Provider>
    )
}
