import { io } from 'socket.io-client'
const BASEURL = import.meta.env.VITE_API_BASEURL

export default io(BASEURL, { withCredentials: true, autoConnect: false })