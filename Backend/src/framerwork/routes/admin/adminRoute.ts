import { Request, Response, Router } from "express";
import { injectedAdminLoginController, injectedFindAllVendorController } from "../../Di/adminInject";

export class AdminRoute {
    public adminRoute: Router
    constructor() {
        this.adminRoute = Router()
        this.setRoute()
    }
    private setRoute() {
        this.adminRoute.post('/login', (req: Request, res: Response) => {
            injectedAdminLoginController.handleAdminLogin(req, res)
        })
        this.adminRoute.get('/vendors',(req:Request,res:Response)=>{
            injectedFindAllVendorController.findAllVendor(req,res)
        })
        this.adminRoute.get('/pendingVendors',(req:Request,res:Response)=>{

        })
    }
}