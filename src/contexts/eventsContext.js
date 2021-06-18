import React, {useState, useEffect, useContext} from 'react'

const EventContext = React.createContext()

export function useEvent() {
    return useContext(EventContext)
}

export function EventProvider({ children }) {
    const [eventsList,setEventsList] = useState(null);

    const value = {
        eventsList,
        setEventsList
    }

    return (
        <EventContext.Provider value={value}>
            { children}
        </EventContext.Provider>
    )
}
