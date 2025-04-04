import { Request, Response, Router } from "express";
import { injectedAdminLoginController, injectedApproveVendorStatus, InjectedChangeStatusCategoryController, injectedCreateCategoryController, injectedFindAllCategoryController, injectedFindAllPendingVendorController, injectedFindAllRejectedVendorController, injectedFindAllVendorController, injectedRejectVendorController } from "../../Di/adminInject";
import { injectedFindAllClientController } from "../../Di/clientInject";

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
        this.adminRoute.get('/vendors', (req: Request, res: Response) => {
            injectedFindAllVendorController.findAllVendor(req, res)
        })
        this.adminRoute.get('/pendingVendors', (req: Request, res: Response) => {
            injectedFindAllPendingVendorController.findPendingVendor(req, res)
        })
        this.adminRoute.patch('/updateVendorStatus', (req: Request, res: Response) => {
            injectedApproveVendorStatus.handleApproveVendorUseCase(req, res)
        })
        this.adminRoute.get('/clients', (req: Request, res: Response) => {
            injectedFindAllClientController.findAllClient(req, res)
        })
        this.adminRoute.patch('/rejectVendor', (req: Request, res: Response) => {
            injectedRejectVendorController.handleRejectVendor(req, res)
        })
        this.adminRoute.get('/rejectedVendors', (req: Request, res: Response) => {
            injectedFindAllRejectedVendorController.handleFindAllRejectedVendor(req, res)
        })
        this.adminRoute.get('/categories', (req: Request, res: Response) => {
            injectedFindAllCategoryController.handleFindCategory(req, res)
        })
        this.adminRoute.post('/createCategory', (req: Request, res: Response) => {
            injectedCreateCategoryController.handleCreatecategory(req, res)
        })
        this.adminRoute.patch('/changeStatusCategory', (req: Request, res: Response) => {
            InjectedChangeStatusCategoryController.handleChangeStatusOfCategory(req, res)
        })
    }
}