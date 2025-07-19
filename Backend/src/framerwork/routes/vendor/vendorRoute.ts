import { Request, Response, Router } from "express";
import { injectedApproveBookingController, injectedCancelEventController, injectedChangePasswordVendorController, injectedChangeStatusServiceController, injectedCreateServiceController, injectedCreateWorkSampleController, injectedEditServiceController, injectedEventCreationController, injectedFindAllEventsVendorController, injectedFindCategoryForServiceController, injectedFindServiceController, injectedFindWorkSamplesOfVendorController, injectedForgetPasswordChangeVendorController, injectedPdfDownloadVendorController, injectedRejectBookingInVendor, injectedResendOtpVendorController, injectedSendOtpForgetPasswordVendorController, injectedShowBookingsInVendorController, injectedTicketDetailsWithUserController, injectedTicketVerificationController, injectedUpdateAboutAndPhoneController, injectedUpdateBookingAmountController, injectedUpdateBookingAsCompleteController, injectedUpdateEventController, injectedUpdateImageVendorController, injectedVendorAuthenticationController, injectedVendorDashboardController, injectedVendorLoginController, injectedVendorLogoutController, injectedVerifyOtpForgetPasswordVendorController, injectedWalletDetailsVendorController } from "../../Di/vendorInject";
import { injectedTokenExpiryValidationChecking, injectedVendorStatusCheckingMiddleware, injectedVerifyTokenAndCheckBlacklistMiddleWare } from "../../Di/serviceInject";
import { checkRoleBaseMiddleware } from "../../../adapters/middlewares/vendorStatusCheckingMiddleware";
import { injectedDeleteAllNotificationsController, injectedDeleteSingleNotificationController, injectedFindChatsOfUserController, injectedLoadPreviousChatController, injectedReadNotificationController } from "../../Di/chatInject";
import { upload } from "../../../adapters/middlewares/multerMiddleware/multerMiddleware";
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
        this.vendorRoute.patch('/updateProfileImage/:vendorId', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, upload.array('image', 1), (req: Request, res: Response) => {
            injectedUpdateImageVendorController.handleUpdateImageVendor(req, res)
        })
        this.vendorRoute.post('/createService', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedCreateServiceController.handleCreateService(req, res)
        })
        this.vendorRoute.get('/categories', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedFindCategoryForServiceController.handleFindCategoryForServiceUseCase(req, res)
        })
        this.vendorRoute.get('/services', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedFindServiceController.handleFindService(req, res)
        })
        this.vendorRoute.put('/editService', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedEditServiceController.handleEditService(req, res)
        })
        this.vendorRoute.patch('/changeStatusService', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedChangeStatusServiceController.handleChangeStatusUseCase(req, res)
        })
        this.vendorRoute.get('/showBookings/:vendorId/:pageNo', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedShowBookingsInVendorController.handleShowBookingsInVendor(req, res)
        })
        this.vendorRoute.patch('/approveBooking', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), (req: Request, res: Response) => {
            injectedApproveBookingController.handleApproveBooking(req, res)
        })
        this.vendorRoute.patch('/rejectBooking', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedRejectBookingInVendor.handleRejectBookingInVendor(req, res)
        })
        this.vendorRoute.post('/logout', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedVendorLogoutController.handleVendorLogout(req, res)
        })
        this.vendorRoute.patch('/updateDetailsVendor', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedUpdateAboutAndPhoneController.handleUpdateAboutAndPhone(req, res)
        })
        this.vendorRoute.patch('/changePassword', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedChangePasswordVendorController.handleChangePasswordVendor(req, res)
        })
        this.vendorRoute.post('/createWorkSample', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, upload.array('image', 5), (req: Request, res: Response) => {
            injectedCreateWorkSampleController.handleAddWorkSample(req, res)
        })
        this.vendorRoute.post('/createEvent', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, upload.array('image', 5), (req: Request, res: Response) => {
            injectedEventCreationController.handleCreateEvent(req, res)
        })
        this.vendorRoute.get('/showEvents/:pageNo/:vendorId', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedFindAllEventsVendorController.handleFindAllEventsVendor(req, res)
        })
        this.vendorRoute.put('/updateEvent', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedUpdateEventController.handleUpdateEvent(req, res)
        })
        this.vendorRoute.post('/verifyTicket', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedTicketVerificationController.handleTicketConfirmation(req, res)
        })
        this.vendorRoute.get('/walletDetails/:userId/:pageNo', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedWalletDetailsVendorController.handleShowWalletDetaills(req, res)
        })
        this.vendorRoute.patch('/completeBooking/:bookingId', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedUpdateBookingAsCompleteController.handleUpdateBookingComplete(req, res)
        })
        this.vendorRoute.get('/loadPreviousChat', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedLoadPreviousChatController.handleLoadPreviousMessage(req, res)
        })
        this.vendorRoute.get('/chats', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedFindChatsOfUserController.handleFindChatOfUser(req, res)
        })
        this.vendorRoute.get('/vendorDashboard', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedVendorDashboardController.handleVendorDashboard(req, res)
        })
        this.vendorRoute.get('/ticketDetailsWithUser', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedTicketDetailsWithUserController.handleTicketAndUserDetails(req, res)
        })
        this.vendorRoute.delete('/deleteSingleNotification', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedDeleteSingleNotificationController.handleDeleteSingleNotification(req, res)
        })
        this.vendorRoute.delete('/deleteAllNotifications', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedDeleteAllNotificationsController.handleDeleteAllNotification(req, res)
        })
        this.vendorRoute.get('/workSamples', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedFindWorkSamplesOfVendorController.handleFindWorkSampleOfVendor(req, res)
        })
        this.vendorRoute.patch('/readNotification', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedReadNotificationController.handleReadNotification(req, res)
        })
        this.vendorRoute.post('/sendOtpForgetPassword', (req: Request, res: Response) => {
            injectedSendOtpForgetPasswordVendorController.handleSendOtpForForgetPassword(req, res)
        })
        this.vendorRoute.post('/verifyOtpForgetPassword', (req: Request, res: Response) => {
            injectedVerifyOtpForgetPasswordVendorController.handleVerifyOtpForgetPassword(req, res)
        })
        this.vendorRoute.post('/changePasswordUsingForgetPassword', (req: Request, res: Response) => {
            injectedForgetPasswordChangeVendorController.handleForgetPasswordChange(req, res)
        })
        this.vendorRoute.post('/pdfDownload', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedPdfDownloadVendorController.handlePdfDownloaderVendor(req, res)
        })
        this.vendorRoute.put('/cancelEvent/:eventId', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedCancelEventController.handleCancelEvent(req, res)
        })
        this.vendorRoute.patch('/updateBookingAmount/:bookingId', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('vendor'), injectedVendorStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedUpdateBookingAmountController.handleUpdateBookingAmount(req, res)
        })
    }
}