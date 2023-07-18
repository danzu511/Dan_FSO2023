import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
        return action.notification
        case 'CLEAR_NOTIFICATION':
        return null
        default:
        return state
    }
}

const NotificationContext = createContext()

export const NotificationProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={{ notification, dispatch }}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider')
    }
    return context
}

export default NotificationContext
