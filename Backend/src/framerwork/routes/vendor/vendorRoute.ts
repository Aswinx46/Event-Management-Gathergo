import { Request, Response, Router } from "express";
import { injectedApproveBookingController, injectedChangeStatusServiceController, injectedCreateServiceController, injectedEditServiceController, injectedFindCategoryForServiceController, injectedFindServiceController, injectedResendOtpVendorController, injectedShowBookingsInVendorController, injectedUpdateImageVendorController, injectedVendorAuthenticationController, injectedVendorLoginController } from "../../Di/vendorInject";

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
        this.vendorRoute.post('/updateProfileImage', (req: Request, res: Response) => {
            injectedUpdateImageVendorController.handleUpdateImageVendor(req, res)
        })
        this.vendorRoute.post('/createService', (req: Request, res: Response) => {
            injectedCreateServiceController.handleCreateService(req, res)
        })
        this.vendorRoute.get('/categories', (req: Request, res: Response) => {
            injectedFindCategoryForServiceController.handleFindCategoryForServiceUseCase(req, res)
        })
        this.vendorRoute.post('/services', (req: Request, res: Response) => {
            injectedFindServiceController.handleFindService(req, res)
        })
        this.vendorRoute.put('/editService', (req: Request, res: Response) => {
            injectedEditServiceController.handleEditService(req, res)
        })
        this.vendorRoute.patch('/changeStatusService', (req: Request, res: Response) => {
            injectedChangeStatusServiceController.handleChangeStatusUseCase(req, res)
        })
        this.vendorRoute.get('/showBookings/:vendorId', (req: Request, res: Response) => {
            injectedShowBookingsInVendorController.handleShowBookingsInVendor(req, res)
        })
        this.vendorRoute.patch('/approveBooking', (req: Request, res: Response) => {
            injectedApproveBookingController.handleApproveBooking(req, res)
        })
    }
}