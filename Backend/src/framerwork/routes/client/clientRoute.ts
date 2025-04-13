import { Request, Response, Router } from "express";
import { clientAuthenticationController, injectedChangeClientPasswordController, injectedChangeProfileImageClientController, injectedClientLoginController, injectedClientLogoutController, injectedCreateBookingController, injectedFindCategoryForClientController, injectedFindServiceForClientController, injectedFindServiceOncategoryBasis, injectedFindVendosForClientCarousalController, injectedForgetPasswordClientController, injectedGoogleLogincontroller, injectedSendOtpForgetPasswordController, injectedShowBookingInClientController, injectedShowServiceWithVendorCController, injectedUpdateProfileClientController, injectedVerifyingForgetOtpClientController } from "../../Di/clientInject";
import { injectedClientStatusCheckingMiddleware, injectedTokenExpiryValidationChecking, injectedVerifyTokenAndCheckBlacklistMiddleWare } from "../../Di/serviceInject";
import { checkRoleBaseMiddleware } from "../../../adapters/middlewares/vendorStatusCheckingMiddleware";
import { injectedFindAllCategoryController } from "../../Di/adminInject";

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
        this.clientRoute.post('/createBooking', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'),injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {

            injectedCreateBookingController.handleCreateBooking(req, res)
        })
        this.clientRoute.get('/showClientWithVendor/:serviceId', (req: Request, res: Response) => {
            injectedShowServiceWithVendorCController.handleShowServiceWithVendor(req, res)
        })
        this.clientRoute.get('/showBookings/:clientId/:pageNo',injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'),injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedShowBookingInClientController.handleShowBookingsInClient(req, res)
        })
        this.clientRoute.post('/logout', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'),injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedClientLogoutController.handleClientLogout(req, res)
        })
        this.clientRoute.get('/services/:categoryId/:pageNo', (req: Request, res: Response) => {
            injectedFindServiceOncategoryBasis.handleFindServiceOnCategorybasis(req, res)
        })
        this.clientRoute.get('/categories/:pageNo', (req: Request, res: Response) => {
            injectedFindAllCategoryController.handleFindCategory(req, res)
        })
        this.clientRoute.patch('/updateProfileImage', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'),injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedChangeProfileImageClientController.handleUpdateProfileImageClient(req, res)
        })
        this.clientRoute.put('/updateProfileClient', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'),injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedUpdateProfileClientController.handleUpdateProfileClient(req, res)
        })
        this.clientRoute.patch('/changePasswordClient', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'),injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedChangeClientPasswordController.handeChangePasswordClient(req, res)
        })
    }
}
