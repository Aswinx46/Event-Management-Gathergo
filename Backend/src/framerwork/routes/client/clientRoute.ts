import { Request, Response, Router } from "express";
import { clientAuthenticationController, injectedClientLoginController, injectedFindAllClientController, injectedFindCategoryForClientController, injectedFindServiceForClientController, injectedFindVendosForClientCarousalController, injectedForgetPasswordClientController, injectedGoogleLogincontroller, injectedSendOtpForgetPasswordController, injectedVerifyingForgetOtpClientController } from "../../Di/clientInject";
import { injectedFindServiceController } from "../../Di/vendorInject";

export class clientRoute {
    public clientRoute: Router
    constructor() {
        this.clientRoute = Router()
        this.setRoute()
    }
    private setRoute() {
        this.clientRoute.post('/signup', (req: Request, res: Response) => {
            clientAuthenticationController.sendOtp(req, res)
        })
        this.clientRoute.post('/createAccount', (req: Request, res: Response) => {
            clientAuthenticationController.register(req, res)
        })
        this.clientRoute.post('/resendOtp', (req: Request, res: Response) => {
            clientAuthenticationController.resendOtp(req, res)
        })
        this.clientRoute.post('/login', (req: Request, res: Response) => {
            injectedClientLoginController.handleLogin(req, res)
        })
        this.clientRoute.post('/googleLogin', (req: Request, res: Response) => {
            injectedGoogleLogincontroller.handleGoogleLogin(req, res)
        })
        this.clientRoute.post('/sendOtpForgetPassword', (req: Request, res: Response) => {
            injectedSendOtpForgetPasswordController.handleSendOtpForgetPassword(req, res)
        })
        this.clientRoute.post('/forgetPassword', (req: Request, res: Response) => {
            injectedForgetPasswordClientController.handleForgetPasswordClient(req, res)
        })
        this.clientRoute.post('/verifyForgetPasswwordOtp', (req: Request, res: Response) => {
            injectedVerifyingForgetOtpClientController.handleVerifyOtp(req, res)
        })
        this.clientRoute.get('/categories', (req: Request, res: Response) => {
            injectedFindCategoryForClientController.handleFindCategoryClient(req, res)
        })
        this.clientRoute.get('/vendorsForcarousal', (req: Request, res: Response) => {
            injectedFindVendosForClientCarousalController.handleFindVenodorForClientCarousal(req, res)
        })
        this.clientRoute.get('/services', (req: Request, res: Response) => {
            injectedFindServiceForClientController.handleFindServiceForClient(req, res)
        })
    }
}