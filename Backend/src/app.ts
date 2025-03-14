import express,{application, urlencoded} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectMongo } from './framerwork/database/databaseConnection/dbConnection'
import { clientRoute } from './framerwork/routes/client/clientRoute'
import cookie_parser from 'cookie-parser'
export class App{
    private app=application
    private database:connectMongo
    constructor(){
        dotenv.config()
        this.app=express()
        this.database=new connectMongo()
        this.database.connectDb()
        this.setMiddlewares()
        this.setClientRoute()
    }
    private setMiddlewares(){
        this.app.use(cors({
            origin:process.env.ORIGIN,
            credentials:true
        }))
        this.app.use(cookie_parser())
        this.app.use(express.json())
        this.app.use(urlencoded({extended:true}))
    }
    private setClientRoute(){
        this.app.use('/',new clientRoute().clientRoute)
    }
    public listen(){
        const port=process.env.PORT || 3000
        this.app.listen(port,()=>console.log(`server running on ${port}`))
    }

}
 
const app=new App()
app.listen()

