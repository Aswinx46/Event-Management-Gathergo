import { Request, Response, Router } from "express";
import { ClientAuthenticationController } from "../../../adapters/controllers/client/authentication/clientAuthenticationController";
import { clientAuthenticationController } from "../../Di/clientInject";

export class clientRoute {
    public clientRoute:Router
    constructor(){
        this.clientRoute=Router()
        this.setRoute()
    }
    private setRoute(){
        this.clientRoute.post('/signup',(req:Request,res:Response)=>{
            clientAuthenticationController.sendOtp(req,res)
        })
        this.clientRoute.post('/createAccount',(req:Request,res:Response)=>{
            clientAuthenticationController.register(req,res)
        })
    }
}