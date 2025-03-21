import express,{Express, urlencoded} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectMongo } from './framerwork/database/databaseConnection/dbConnection'
import { clientRoute } from './framerwork/routes/client/clientRoute'
import cookie_parser from 'cookie-parser'
import morgan from 'morgan'
import redisService from './framerwork/services/redisService'
import { VendorRoute } from './framerwork/routes/vendor/vendorRoute'
import { AdminRoute } from './framerwork/routes/admin/adminRoute'
export class App{
    private app:Express
    private database:connectMongo
    constructor(){
        dotenv.config()
        this.app=express()
        this.database=new connectMongo()
        this.database.connectDb()
        this.setMiddlewares()
        this.setClientRoute()
        this.setVendorRoute()
        this.setAdminRoute()
        this.connectRedis()
    }
    private setMiddlewares(){
        this.app.use(cors({
            origin:process.env.ORIGIN,
            credentials:true
        }))
        this.app.use(cookie_parser())
        this.app.use(express.json())
        this.app.use(urlencoded({extended:true}))
        this.app.use(morgan('dev'))
    }
    private async connectRedis(){
        await redisService.connect()
    }
    private setClientRoute(){
        this.app.use('/',new clientRoute().clientRoute)
    }
    public listen(){
        const port=process.env.PORT || 3000
        this.app.listen(port,()=>console.log(`server running on ${port}`))
    }
    private setVendorRoute(){
        this.app.use('/vendor',new VendorRoute().vendorRoute)
    }
    private setAdminRoute(){
        this.app.use('/admin',new AdminRoute().adminRoute)
    }
}
 
const app=new App()
app.listen()

