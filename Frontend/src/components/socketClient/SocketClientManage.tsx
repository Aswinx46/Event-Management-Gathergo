// components/socket/SocketManager.tsx
import { useEffect, useState } from 'react'
import socket from '../../hooks/ConnectSocketIo'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import LiveNotification from '../other components/LiveNotification'
import { Notification } from '@/types/NotificationType'
import { addNotifications, addSingleNotification } from '@/store/slices/notification/notificationSlice'
import { NotificationDTO } from '@/types/notificationEntity'


const SocketManager = () => {
    const [data, setData] = useState<Notification | null>(null)
    const [notification, setNotification] = useState<boolean>(false)

    const location = window.location
    const path = location.pathname.split('/')[1]
    const client = useSelector((state: RootState) => state.clientSlice.client)
    const vendor = useSelector((state: RootState) => state.vendorSlice.vendor)
    const dispatch = useDispatch()
    // let user = path === 'vendor' ? vendor : client

    let user = null
    if (path == 'vendor') {
        user = vendor
    } else {
        user = client
    }
    useEffect(() => {
        if (!user) return

        socket.connect()
        socket.emit('register', { userId: user._id, name: user.name }, (data: NotificationDTO[]) => {
            dispatch(addNotifications(data))
        })

        socket.on('notification', (data) => {
            const notification: Notification = {
                from: data.from,
                message: data.message,
                type: 'info'
            }
            setData(notification)
            dispatch(addSingleNotification(data.notification))
            setNotification(true)
        })

        return () => {
            socket.disconnect()
            socket.off('notification')
        }
    }, [user])

    return (
        <>
            {notification && (
                <LiveNotification
                    notification={data!}
                    onClose={() => setNotification(false)}
                    duration={5000}
                />
            )}
        </>
    )
}

export default SocketManager
