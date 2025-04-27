import { Server } from "socket.io";
import { Server as httpServer } from "http";
export class SocketIoService {
    private io: Server
    private users: Map<string, string>
    constructor(server: httpServer) {
        this.io = new Server(server, {
            cors: {
                origin: process.env.ORIGIN,
                credentials: true
            }
        })
        this.users = new Map()
        this.setUpListeners()
    }
    private setUpListeners() {
        this.io.on('connect', (socket) => {
            console.log(`socket connected ${socket.id}`)

            socket.on('register', (userId: string) => {

            })

            socket.on('sendMessage', (data) => {
                console.log('Received message', data)
            })

            socket.on('disconnect', () => {
                console.log(`Socket disconnected ${socket.id}`)
            })

            socket.on('joinRoom', (data) => {
                console.log(`data from join room`, data)
                socket.join(data.roomId)
            })
        })
    }
    public getSocket() {
        return this.io
    }
}