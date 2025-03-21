import { Request,Response,Router } from "express";
import { injectedVendorAuthenticationController, injectedVendorLoginController } from "../../Di/vendorInject";

export class VendorRoute {
    public vendorRoute:Router
    constructor(){
        this.vendorRoute=Router()
        this.setRoute()
    }
    private setRoute(){
        this.vendorRoute.post('/signup',(req:Request,res:Response)=>{
            injectedVendorAuthenticationController.sendOtp(req,res)
        })
        this.vendorRoute.post('/verify',(req:Request,res:Response)=>{
            injectedVendorAuthenticationController.registerVendor(req,res)
        })
        this.vendorRoute.post('/login',(req:Request,res:Response)=>{
            injectedVendorLoginController.handleLoginVendor(req,res)
        })
    }
}