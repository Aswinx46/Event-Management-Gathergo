import { NotificationEntity } from "@/types/notificationEntity";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface NotificationState {
    notification: NotificationEntity[];
}


const initialState: NotificationState = {
    notification: []
}

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotifications: (state, action: PayloadAction<NotificationEntity>) => {
            state.notification.push(action.payload)
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notification.filter((notification) => notification._id !== action.payload)
        }
    }
})

export const { addNotifications, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer