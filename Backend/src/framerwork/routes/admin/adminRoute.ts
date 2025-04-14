import { Request, Response, Router } from "express";
import { injectedAdminLoginController, injectedApproveVendorStatus, injectedBlockClientController, InjectedChangeStatusCategoryController, injectedClientUnblockController, injectedCreateCategoryController, injectedFindAllCategoryController, injectedFindAllPendingVendorController, injectedFindAllRejectedVendorController, injectedFindAllVendorController, injectedRejectVendorController, injectedVendorBlockController, injectedVendorUnblockController } from "../../Di/adminInject";
import { injectedFindAllClientController } from "../../Di/adminInject";
import { checkAdminMiddleWare, injectedTokenExpiryValidationChecking, injectedVerifyTokenAndCheckBlacklistMiddleWare } from "../../Di/serviceInject";

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
        this.adminRoute.post('/createCategory', injectedVerifyTokenAndCheckBlacklistMiddleWare, injectedTokenExpiryValidationChecking, checkAdminMiddleWare, (req: Request, res: Response) => {
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
    }
}