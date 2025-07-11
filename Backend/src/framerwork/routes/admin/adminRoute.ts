import { Request, Response, Router } from "express";
import { injectedAdminDashboardController, injectedAdminLoginController, injectedAdminLogoutController, injectedApproveVendorStatus, injectedBlockClientController, InjectedChangeStatusCategoryController, injectedChangeTitleAndImageController, injectedClientUnblockController, injectedCreateCategoryController, injectedFindAdminWalletDetailsController, injectedFindAllCategoryController, injectedFindAllPendingVendorController, injectedFindAllRejectedVendorController, injectedFindAllVendorController, injectedFindEventsInAdminSideController, injectedRejectVendorController, injectedShowBookingsInAdminController, injectedVendorBlockController, injectedVendorUnblockController } from "../../Di/adminInject";
import { injectedFindAllClientController } from "../../Di/adminInject";
import { checkAdminMiddleWare, injectedTokenExpiryValidationChecking, injectedVerifyTokenAndCheckBlacklistMiddleWare } from "../../Di/serviceInject";
import { upload } from "../../../adapters/middlewares/multerMiddleware/multerMiddleware";

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
        this.adminRoute.get('/vendors', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedFindAllVendorController.findAllVendor(req, res)
        })
        this.adminRoute.get('/pendingVendors', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedFindAllPendingVendorController.findPendingVendor(req, res)
        })
        this.adminRoute.patch('/updateVendorStatus', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedApproveVendorStatus.handleApproveVendorUseCase(req, res)
        })
        this.adminRoute.get('/clients', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedFindAllClientController.findAllClient(req, res)
        })
        this.adminRoute.patch('/rejectVendor', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedRejectVendorController.handleRejectVendor(req, res)
        })
        this.adminRoute.get('/rejectedVendors', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedFindAllRejectedVendorController.handleFindAllRejectedVendor(req, res)
        })
        this.adminRoute.get('/categories', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedFindAllCategoryController.handleFindCategory(req, res)
        })
        this.adminRoute.post('/createCategory', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, upload.array('image', 1), (req: Request, res: Response) => {
            injectedCreateCategoryController.handleCreatecategory(req, res)
        })
        this.adminRoute.patch('/changeStatusCategory', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            InjectedChangeStatusCategoryController.handleChangeStatusOfCategory(req, res)
        })
        this.adminRoute.patch('/blockClient', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedBlockClientController.handleClientBlock(req, res)
        })
        this.adminRoute.patch('/unblockClient', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedClientUnblockController.handleClientUnblock(req, res)
        })
        this.adminRoute.patch('/blockVendor', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedVendorBlockController.handleVendorBlock(req, res)
        })
        this.adminRoute.patch('/unblockVendor', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedVendorUnblockController.handleVendorUnblock(req, res)
        })
        this.adminRoute.patch('/updateCategory/:categoryId', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, upload.array('image', 1), (req: Request, res: Response) => {
            injectedChangeTitleAndImageController.handleChangeTitleAndImage(req, res)
        })
        this.adminRoute.get('/wallet/:userId/:pageNo', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedFindAdminWalletDetailsController.handleFindWalletDetails(req, res)
        })
        this.adminRoute.get('/bookingDetails', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedShowBookingsInAdminController.handleShowBookingInAdmin(req, res)
        })
        this.adminRoute.get('/eventDetails', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedFindEventsInAdminSideController.handleListingEventsInAdminSide(req, res)
        })
        this.adminRoute.get('/dashboardDetails', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedAdminDashboardController.handleAdminDashboardata(req, res)
        })
        this.adminRoute.post('/adminLogout', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
            injectedAdminLogoutController.handleAdminLogout(req, res)
        })
    }
}