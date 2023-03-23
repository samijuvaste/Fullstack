import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "CREATE":
            return `anecdote '${action.payload}' created`
        case "VOTE":
            return `anecdote '${action.payload}' voted`
        case "NULL":
            return null
        case "ERROR":
            return 'too short anecdote, must have length 5 or more'
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={ [notification, notificationDispatch] }>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext