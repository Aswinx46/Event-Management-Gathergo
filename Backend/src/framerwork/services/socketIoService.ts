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

            socket.on('register', (data) => {
                console.log('cliend id for register', data.userId)
                this.users.set(data.userId, socket.id)
                console.log(this.users)
            })

            socket.on('sendMessage', (data) => {
                console.log('Received message', data)
                socket.to(data.roomId).emit('receiveMessage',data.message)
            })

            socket.on('disconnect', () => {
                console.log(`Socket disconnected ${socket.id}`)
            })

            socket.on('joinRoom', (data) => {
                console.log(`data from join room`, data)
                if (!data) throw new Error('No room id available')
                socket.join(data.roomId)
            })
        })
    }
    public getSocket() {
        return this.io
    }
}