import { VendorAuthenticationController } from "../../adapters/controllers/vendor/authentication/registerVendor";
import { VendorDatabase } from "../../adapters/repository/vendor/vendorDatabase";
import { SendOtpVendorUsecase } from "../../useCases/vendor/authentication/sendOtpVendorUseCase";
import { VendorLoginUsecase } from "../../useCases/vendor/authentication/registerVendorUseCase";
import { emailService } from "../services/emailService";
import { OtpService } from "../services/genarateOtp";
import { userExistance } from "../services/userExistenceChecking";
import { clientRepository } from "../../adapters/repository/client/clientRepository";
import { LoginVendorUseCase } from "../../useCases/vendor/authentication/loginVendorUseCase";
import { JwtService } from "../services/jwtService";
import { RedisService } from "../services/redisService";
import { LoginVendorController } from "../../adapters/controllers/vendor/authentication/loginVendorController";
import { ResendOtpVendorUsecase } from "../../useCases/vendor/authentication/resendOtpVendorUseCase";
import { ResendOtpVendorController } from "../../adapters/controllers/vendor/authentication/resendOtpController";
import { ProfileImageUpdateUseCase } from "../../useCases/vendor/profileUpdations/profileImageUpdate";
import { UpdateImageVendorController } from "../../adapters/controllers/vendor/profile/updateImageController";
import { CreateServiceUseCase } from "../../useCases/vendor/service/createServiceUseCase";
import { ServiceRepository } from "../../adapters/repository/service/serviceRepository";
import { CreateServiceController } from "../../adapters/controllers/vendor/service/createServiceController";
import { CategoryDatabaseRepository } from "../../adapters/repository/category/categoryRepository";
import { FindCategoryForServiceController } from "../../adapters/controllers/vendor/service/findCategoryForServiceController";
import { FindCategoryForServiceUseCase } from "../../useCases/vendor/service/findCategoryForServiceUseCase";
import { FindServiceUseCase } from "../../useCases/vendor/service/findServiceUseCase";
import { FindServiceController } from "../../adapters/controllers/vendor/service/findServiceController";
import { EditServiceUseCase } from "../../useCases/vendor/service/editServiceUseCase";
import { EditServiceController } from "../../adapters/controllers/vendor/service/editServiceController";
import { ChangeStatusServiceUseCase } from "../../useCases/vendor/service/changeStatusServiceUseCase";
import { ChangestatusServiceController } from "../../adapters/controllers/vendor/service/changeStatusServiceController";
import { ShowBookingsInVendorUseCase } from "../../useCases/vendor/bookings/showBookingsInVendorUseCase";
import { BookingRepository } from "../../adapters/repository/booking/bookingRepository";
import { ShowBookingsInVendorController } from "../../adapters/controllers/vendor/bookings/showBookingsInVendorController";
import { ApproveBookingUseCase } from "../../useCases/vendor/bookings/approveBookingInVendorUseCase";
import { ApproveBookingInVendorController } from "../../adapters/controllers/vendor/bookings/approveBookingInVendorController";
import { RejectBookingInVendorUseCase } from "../../useCases/vendor/bookings/rejectBookingInVendorUseCcase";
import { RejectBookingInVendorController } from "../../adapters/controllers/vendor/bookings/rejectBookingInVendorController";
import { VendorLogoutUseCase } from "../../useCases/vendor/authentication/vendorLogoutUseCase";
import { VendorLogoutController } from "../../adapters/controllers/vendor/authentication/vendorLogoutController";
import { updateAboutAndPhoneUseCase } from "../../useCases/vendor/profileUpdations/updateAboutAndPhoneUseCase";
import { UpdateAboutAndPhoneVendorController } from "../../adapters/controllers/vendor/profile/updateAboutAndPhoneVendorController";
import { ChangePasswordVendorUseCase } from "../../useCases/vendor/profileUpdations/changePasswordUseCase";
import { hashPassword } from "../hashPassword/hashpassword";
import { ChangePasswordVendorControler } from "../../adapters/controllers/vendor/profile/changePasswordVendorController";
import { WorkSampleCreationUseCase } from "../../useCases/vendor/workSamples/workSampleCreationUseCase";
import { WorkSampleRepository } from "../../adapters/repository/workSamples/workSampleRepository";
import { CreateWorkSampleController } from "../../adapters/controllers/vendor/workSamples/addWorkSamplesController";
import { EventRepository } from "../../adapters/repository/event/eventRepository";
import { EventCreationUseCase } from "../../useCases/vendor/event/eventCreationUseCase";
import { EventCreationController } from "../../adapters/controllers/vendor/event/eventCreationController";
import { FindAllEventsVendorUseCase } from "../../useCases/vendor/event/findAllEventsUseCase";
import { FindAllEventsVendorController } from "../../adapters/controllers/vendor/event/findAlllEventsVendorController";
import { UpdateEventUseCase } from "../../useCases/vendor/event/udpateEventUseCase";
import { UpdateEventController } from "../../adapters/controllers/vendor/event/updateEventController";
import { TicketVerificationUseCase } from "../../useCases/vendor/event/ticketVerificationUseCase";
import { TicketRepository } from "../../adapters/repository/ticket/ticketRepository";
import { TicketVerificationController } from "../../adapters/controllers/vendor/event/ticketConfirmationController";
import { FindUserWalletUseCase } from "../../useCases/wallet/findWalletOfClientUseCase";
import { WalletRepository } from "../../adapters/repository/wallet/walletRepository";
import { FindWalletDetailsVendorController } from "../../adapters/controllers/vendor/wallet/showWalletDetailsAndTransactions";
import { TransactionRepository } from "../../adapters/repository/transaction/transactionRepository";
import { FindTransactionsUseCase } from "../../useCases/transactions/findTransactionsUseCase";


//-----------------Register vendor-------------------//
const EmailService = new emailService()
const otpService = new OtpService()
const vendorRespository = new VendorDatabase()
const clientDatabase = new clientRepository()
const UserExistance = new userExistance(clientDatabase, vendorRespository)
const injectedVendorUseCase = new VendorLoginUsecase(vendorRespository)
const sendOtpVendorUsecase = new SendOtpVendorUsecase(EmailService, otpService, UserExistance)
export const injectedVendorAuthenticationController = new VendorAuthenticationController(injectedVendorUseCase, sendOtpVendorUsecase)

//-------------------Resend OTP-----------------------//
const resendOtpVendorUseCase = new ResendOtpVendorUsecase(EmailService, otpService)
export const injectedResendOtpVendorController = new ResendOtpVendorController(resendOtpVendorUseCase)

//-----------------------Login Vendor---------------------//
const vendorLoginUseCase = new LoginVendorUseCase(vendorRespository)
const jwtService = new JwtService()
const redisService = new RedisService()
export const injectedVendorLoginController = new LoginVendorController(vendorLoginUseCase, jwtService, redisService)

//-----------------------Update profile image in vendor side-----------------------
const updateImageVendorUseCase = new ProfileImageUpdateUseCase(vendorRespository)
export const injectedUpdateImageVendorController = new UpdateImageVendorController(updateImageVendorUseCase)

//-------------------------Service creation-----------------------------
const serviceRepository = new ServiceRepository()
const createServiceUseCase = new CreateServiceUseCase(serviceRepository)
export const injectedCreateServiceController = new CreateServiceController(createServiceUseCase)

//-----------------------Finding categories -------------------------------
const categoryRepository = new CategoryDatabaseRepository()
const findCategoryForServiceUseCase = new FindCategoryForServiceUseCase(categoryRepository)
export const injectedFindCategoryForServiceController = new FindCategoryForServiceController(findCategoryForServiceUseCase)

//-----------------------Find Services---------------------------------------
const findServiceUseCase = new FindServiceUseCase(serviceRepository)
export const injectedFindServiceController = new FindServiceController(findServiceUseCase)

//------------------------Edit service---------------------------
const editService = new EditServiceUseCase(serviceRepository)
export const injectedEditServiceController = new EditServiceController(editService)

//----------------------- Change status of service---------------------------
const changeStatusServiceUseCase = new ChangeStatusServiceUseCase(serviceRepository)
export const injectedChangeStatusServiceController = new ChangestatusServiceController(changeStatusServiceUseCase)

//-------------------------show bookings in vendor side---------------------
const bookingsDatabase = new BookingRepository()
const showBookingsInVendorUseCase = new ShowBookingsInVendorUseCase(bookingsDatabase)
export const injectedShowBookingsInVendorController = new ShowBookingsInVendorController(showBookingsInVendorUseCase)

//-------------------------------Approving Bookings----------------------------
const approveBookingUseCase = new ApproveBookingUseCase(bookingsDatabase)
export const injectedApproveBookingController = new ApproveBookingInVendorController(approveBookingUseCase)

//-------------------------------Reject Bookings---------------------------------
const rejectBookingUseCase = new RejectBookingInVendorUseCase(bookingsDatabase)
export const injectedRejectBookingInVendor = new RejectBookingInVendorController(rejectBookingUseCase)

//-----------------------------Vendor logout---------------------------
const vendorLogoutUsecase = new VendorLogoutUseCase(redisService, jwtService)
export const injectedVendorLogoutController = new VendorLogoutController(vendorLogoutUsecase)

//------------------------Update about and phone vendor----------------------------------
const UpdateAboutAndPhoneUseCase = new updateAboutAndPhoneUseCase(vendorRespository)
export const injectedUpdateAboutAndPhoneController = new UpdateAboutAndPhoneVendorController(UpdateAboutAndPhoneUseCase)

//----------------------- Change password-----------------------
const HashPassword = new hashPassword()
const changePasswordUseCase = new ChangePasswordVendorUseCase(vendorRespository, HashPassword)
export const injectedChangePasswordVendorController = new ChangePasswordVendorControler(changePasswordUseCase)

//---------------------------Creating workSamples------------------------
const worksampleDatabase = new WorkSampleRepository()
const createWorkSampleUseCase = new WorkSampleCreationUseCase(worksampleDatabase)
export const injectedCreateWorkSampleController = new CreateWorkSampleController(createWorkSampleUseCase)

//----------------------------Create event-----------------------------------
const eventRepository = new EventRepository()
const eventCreationUseCase = new EventCreationUseCase(eventRepository)
export const injectedEventCreationController = new EventCreationController(eventCreationUseCase)

//-------------------------------Find all events in vendor side--------------------------
const findAllEventsVendorUseCase = new FindAllEventsVendorUseCase(eventRepository)
export const injectedFindAllEventsVendorController = new FindAllEventsVendorController(findAllEventsVendorUseCase)

//-------------------------------Update Event---------------------------
const updateEventUseCase = new UpdateEventUseCase(eventRepository)
export const injectedUpdateEventController = new UpdateEventController(updateEventUseCase)

//-----------------------------Ticket verification---------------
const ticketdatabase = new TicketRepository()
const ticketVerificationUseCase = new TicketVerificationUseCase(ticketdatabase, eventRepository)
export const injectedTicketVerificationController = new TicketVerificationController(ticketVerificationUseCase)

//--------------------------Vendor wallet details---------------------
const walletDatabase = new WalletRepository()
const transactionDatabase = new TransactionRepository()
const walletDetailsUseCase = new FindUserWalletUseCase(walletDatabase)
const findTransactionUseCase = new FindTransactionsUseCase(transactionDatabase)
export const injectedWalletDetailsVendorController = new FindWalletDetailsVendorController(walletDetailsUseCase, findTransactionUseCase)
