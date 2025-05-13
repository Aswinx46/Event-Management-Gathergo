import { NotificationDTO } from "@/types/notificationEntity";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface NotificationState {
    notification: NotificationDTO[];
}


const initialState: NotificationState = {
    notification: []
}

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotifications: (state, action: PayloadAction<NotificationDTO[]>) => {
            state.notification = action.payload
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notification=state.notification.filter((notification) => notification._id !== action.payload)
        },
        addSingleNotification: (state, action: PayloadAction<NotificationDTO>) => {
            state.notification.push(action.payload)
        },
        clearAllNotifications: (state, action) => {
            state.notification = action.payload
        }
    }
})

export const { addNotifications, removeNotification, addSingleNotification, clearAllNotifications } = notificationSlice.actions
export default notificationSlice.reducer