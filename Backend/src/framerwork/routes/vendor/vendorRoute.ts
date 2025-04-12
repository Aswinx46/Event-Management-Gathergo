import { Request, Response, Router } from "express";
import { injectedApproveBookingController, injectedChangeStatusServiceController, injectedCreateServiceController, injectedEditServiceController, injectedFindCategoryForServiceController, injectedFindServiceController, injectedRejectBookingInVendor, injectedResendOtpVendorController, injectedShowBookingsInVendorController, injectedUpdateImageVendorController, injectedVendorAuthenticationController, injectedVendorLoginController, injectedVendorLogoutController } from "../../Di/vendorInject";
import { injectedTokenExpiryValidationChecking, injectedVerifyTokenAndCheckBlacklistMiddleWare } from "../../Di/serviceInject";
import { checkRoleBaseMiddleware } from "../../../adapters/middlewares/vendorStatusCheckingMiddleware";

export class VendorRoute {
    public vendorRoute: Router
    constructor() {
        this.vendorRoute = Router()
        this.setRoute()
    }
    private setRoute() {
        this.vendorRoute.post('/signup', (req: Request, res: Response) => {
            injectedVendorAuthenticationController.sendOtp(req, res)
        })
        this.vendorRoute.post('/verify', (req: Request, res: Response) => {
            injectedVendorAuthenticationController.registerVendor(req, res)
        })
        this.vendorRoute.post('/login', (req: Request, res: Response) => {
            injectedVendorLoginController.handleLoginVendor(req, res)
        })
        this.vendorRoute.post('/resendOtp', (req: Request, res: Response) => {
            injectedResendOtpVendorController.handleResendOtp(req, res)
        })
        this.vendorRoute.post('/updateProfileImage', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), (req: Request, res: Response) => {
            injectedUpdateImageVendorController.handleUpdateImageVendor(req, res)
        })
        this.vendorRoute.post('/createService', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), (req: Request, res: Response) => {
            injectedCreateServiceController.handleCreateService(req, res)
        })
        this.vendorRoute.get('/categories', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), (req: Request, res: Response) => {
            injectedFindCategoryForServiceController.handleFindCategoryForServiceUseCase(req, res)
        })
        this.vendorRoute.get('/services', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), (req: Request, res: Response) => {
            injectedFindServiceController.handleFindService(req, res)
        })
        this.vendorRoute.put('/editService', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), (req: Request, res: Response) => {
            injectedEditServiceController.handleEditService(req, res)
        })
        this.vendorRoute.patch('/changeStatusService', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), (req: Request, res: Response) => {
            injectedChangeStatusServiceController.handleChangeStatusUseCase(req, res)
        })
        this.vendorRoute.get('/showBookings/:vendorId/:pageNo', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), (req: Request, res: Response) => {
            injectedShowBookingsInVendorController.handleShowBookingsInVendor(req, res)
        })
        this.vendorRoute.patch('/approveBooking', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), (req: Request, res: Response) => {
            injectedApproveBookingController.handleApproveBooking(req, res)
        })
        this.vendorRoute.patch('/rejectBooking', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), (req: Request, res: Response) => {
            injectedRejectBookingInVendor.handleRejectBookingInVendor(req, res)
        })
        this.vendorRoute.post('/logout', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), (req: Request, res: Response) => {
            injectedVendorLogoutController.handleVendorLogout(req, res)
        })
    }
}