import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        addNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return null
        }
    }
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (text, time) => {
    return async dispatch => {
        dispatch(addNotification(text))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer