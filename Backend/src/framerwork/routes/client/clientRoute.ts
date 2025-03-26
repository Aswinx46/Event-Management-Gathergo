import { Request, Response, Router } from "express";
import { clientAuthenticationController, injectedClientLoginController, injectedFindAllClientController, injectedGoogleLogincontroller } from "../../Di/clientInject";

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
        this.clientRoute.post('/resendOtp',(req:Request,res:Response)=>{
            clientAuthenticationController.resendOtp(req,res)
        })
        this.clientRoute.post('/login',(req:Request,res:Response)=>{
            injectedClientLoginController.handleLogin(req,res)
        })
        this.clientRoute.post('/googleLogin',(req:Request,res:Response)=>{
            injectedGoogleLogincontroller.handleGoogleLogin(req,res)
        })
    }
}