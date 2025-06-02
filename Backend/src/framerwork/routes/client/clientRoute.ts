import { Request, Response, Router } from "express";
import { clientAuthenticationController, injectedAddReviewController, injectedBookingCancellationController, injectedChangeClientPasswordController, injectedChangeProfileImageClientController, injectedClientLoginController, injectedClientLogoutController, injectedConfirmBookingPaymentController, injectedConfirmTicketAndPaymentController, injectedCreateBookingController, injectedCreateTicketController, injectedFindCategoryForClientController, injectedFindClientWalletController, injectedFindEventByIdClientController, injectedFindEventsBasedOnCategoryController, injectedFindEventsClientController, injectedFindEventsNearToUserController, injectedFindServiceForClientController, injectedFindServiceOncategoryBasis, injectedFindVendorProfileWithSample, injectedFindVendosForClientCarousalController, injectedForgetPasswordClientController, injectedGoogleLogincontroller, InjectedInititateBookingPaymentController, injectedSearchCategoryController, injectedSearchEventsController, injectedSearchServiceController, injectedSendOtpForgetPasswordController, injectedShowBookingInClientController, injectedShowReviewController, injectedShowServiceWithVendorCController, injectedTicketAndEventDetailsCientController, injectedTicketCancellationController, injectedUpdateProfileClientController, injectedVerifyingForgetOtpClientController, injectedWalletPayController } from "../../Di/clientInject";
import { injectedClientStatusCheckingMiddleware, injectedTokenExpiryValidationChecking, injectedVerifyTokenAndCheckBlacklistMiddleWare } from "../../Di/serviceInject";
import { checkRoleBaseMiddleware } from "../../../adapters/middlewares/vendorStatusCheckingMiddleware";
import { injectedFindAllCategoryController } from "../../Di/adminInject";
import { injectedDeleteAllNotificationsController, injectedDeleteSingleNotificationController, injectedFindChatsOfUserController, injectedLoadPreviousChatController, injectedReadNotificationController } from "../../Di/chatInject";

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
        this.clientRoute.post('/createBooking', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {

            injectedCreateBookingController.handleCreateBooking(req, res)
        })
        this.clientRoute.get('/showClientWithVendor', (req: Request, res: Response) => {
            injectedShowServiceWithVendorCController.handleShowServiceWithVendor(req, res)
        })
        this.clientRoute.get('/showBookings/:clientId/:pageNo', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedShowBookingInClientController.handleShowBookingsInClient(req, res)
        })
        this.clientRoute.post('/logout', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedClientLogoutController.handleClientLogout(req, res)
        })
        // this.clientRoute.get('/services/:categoryId/:pageNo/:sortBy/:query', (req: Request, res: Response) => {
        //     injectedFindServiceOncategoryBasis.handleFindServiceOnCategorybasis(req, res)
        // })
        this.clientRoute.get('/servicesFiltering', (req: Request, res: Response) => {
            injectedFindServiceOncategoryBasis.handleFindServiceOnCategorybasis(req, res)
        })
        this.clientRoute.get('/categories/:pageNo', (req: Request, res: Response) => {
            injectedFindAllCategoryController.handleFindCategory(req, res)
        })
        this.clientRoute.patch('/updateProfileImage', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedChangeProfileImageClientController.handleUpdateProfileImageClient(req, res)
        })
        this.clientRoute.put('/updateProfileClient', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedUpdateProfileClientController.handleUpdateProfileClient(req, res)
        })
        this.clientRoute.patch('/changePasswordClient', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedChangeClientPasswordController.handeChangePasswordClient(req, res)
        })
        this.clientRoute.get('/searchCategory', (req: Request, res: Response) => {
            injectedSearchCategoryController.handleSearchCategory(req, res)
        })
        this.clientRoute.get('/findEvents/:pageNo', (req: Request, res: Response) => {
            injectedFindEventsClientController.handleFindAllEventsClient(req, res)
        })
        this.clientRoute.get('/findEventById/:eventId', (req: Request, res: Response) => {
            injectedFindEventByIdClientController.handleFindEventById(req, res)
        })
        this.clientRoute.post('/createTicket', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedCreateTicketController.handleCreateUseCase(req, res)
        })
        this.clientRoute.post('/confirmTicket', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedConfirmTicketAndPaymentController.handleConfirmTicketAndPayment(req, res)
        })
        this.clientRoute.get('/getTicketAndEventDetails/:userId/:pageNo', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedTicketAndEventDetailsCientController.handleFetchTicketAndEventDetails(req, res)
        })
        this.clientRoute.get('/wallet/:userId/:pageNo', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedFindClientWalletController.handleFindClientWallet(req, res)
        })
        this.clientRoute.post('/createBookingPayment', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            InjectedInititateBookingPaymentController.handleInititateBookingPayment(req, res)
        })
        this.clientRoute.post('/confirmBookingPayment', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedConfirmBookingPaymentController.handleConfirmBookingPaymentUseCase(req, res)
        })
        this.clientRoute.get('/events/:category/:pageNo/:sortBy', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedFindEventsBasedOnCategoryController.handleFindEventsBasedOnCategory(req, res)
        })
        this.clientRoute.get('/service/search', (req: Request, res: Response) => {
            injectedSearchServiceController.handleSearchService(req, res)
        })
        this.clientRoute.get('/events/search', (req: Request, res: Response) => {
            injectedSearchEventsController.handleSearchEvents(req, res)
        })
        this.clientRoute.get('/eventsNearToUse/:latitude/:longitude/:pageNo/:range', (req: Request, res: Response) => {
            injectedFindEventsNearToUserController.handleEventsNearToUse(req, res)
        })
        this.clientRoute.get('/loadPreviousChat', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedLoadPreviousChatController.handleLoadPreviousMessage(req, res)
        })
        this.clientRoute.get('/chats', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedFindChatsOfUserController.handleFindChatOfUser(req, res)
        })
        this.clientRoute.patch('/ticketCancel', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedTicketCancellationController.handleTicketCancellation(req, res)
        })
        this.clientRoute.patch('/cancelBooking', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedBookingCancellationController.handleCancelBooking(req, res)
        })
        this.clientRoute.post('/addReview', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedAddReviewController.handleAddReview(req, res)
        })
        this.clientRoute.get('/injectedShowReviewController', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedShowReviewController.handleShowReview(req, res)
        })
        this.clientRoute.delete('/deleteSingleNotification', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedDeleteSingleNotificationController.handleDeleteSingleNotification(req, res)
        })
        this.clientRoute.delete('/deleteAllNotifications', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedDeleteAllNotificationsController.handleDeleteAllNotification(req, res)
        })
        this.clientRoute.get('/vendorProfile/:vendorId/:PageNo', (req: Request, res: Response) => {
            injectedFindVendorProfileWithSample.handleFindVendorProfile(req, res)
        })
        this.clientRoute.patch('/readNotification', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedReadNotificationController.handleReadNotification(req, res)
        })
        this.clientRoute.post('/paymentUsingWallet', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkRoleBaseMiddleware('client'), injectedClientStatusCheckingMiddleware, (req: Request, res: Response) => {
            injectedWalletPayController.handleWalletPayment(req, res)
        })
    }
}
