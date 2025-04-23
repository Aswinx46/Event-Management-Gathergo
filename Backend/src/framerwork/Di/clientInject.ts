import { ClientAuthenticationController } from "../../adapters/controllers/client/authentication/clientAuthenticationController";
import { clientRepository } from "../../adapters/repository/client/clientRepository";
import { CreateClientUseCase } from "../../useCases/client/authentication/createClientUsecase";
import { emailService } from "../services/emailService";
import { OtpService } from "../services/genarateOtp";
import { sendOtpClientUseCase } from "../../useCases/client/authentication/sendOtpClientUseCase";
import { LoginClientUseCase } from "../../useCases/client/authentication/loginClientUseCase";
import { ClientLoginController } from "../../adapters/controllers/client/authentication/clientLoginController.";
import { JwtService } from "../services/jwtService";
import { RedisService } from '../services/redisService'
import { GoogleLoginClientUseCase } from "../../useCases/client/authentication/googleLoginClientUseCase";
import { GoogleLoginClient } from "../../adapters/controllers/client/authentication/clientGoogleLogin";
import { SendOtpForForgetPassword } from "../../useCases/client/authentication/sendOtpForForgetPassword";
import { SendOtpToClientForgetPassword } from "../../adapters/controllers/client/authentication/sendOtpForForgetPasswordControllerts";
import { ForgetPasswordClientUseCase } from "../../useCases/client/authentication/forgetPasswordUseCase";
import { ForgetPasswordClientController } from "../../adapters/controllers/client/authentication/forgetPasswordController";
import { userExistance } from "../services/userExistenceChecking";
import { VendorDatabase } from "../../adapters/repository/vendor/vendorDatabase";
import { VerifyForgetPasswordOtp } from "../../useCases/client/authentication/verifyForgetPasswordOtp";
import { VerifyForgetPasswordOtpClientController } from "../../adapters/controllers/client/authentication/verifyForgetPasswordOtpClientController";
import { FindCategoryClientUseCase } from "../../useCases/client/category/findCategoryUseCase";
import { CategoryDatabaseRepository } from "../../adapters/repository/category/categoryRepository";
import { FindCategoryClientController } from "../../adapters/controllers/client/category/findCategoryClientController";
import { FindVendorForClientUseCase } from "../../useCases/client/vendorFetching/findVendorsForClientSIdeCarousalUseCase";
import { FindVendorForClientCarousalController } from "../../adapters/controllers/vendor/forClient/findVendorForClientCarousalUseCase";
import { FindServiceUseCaseClient } from "../../useCases/client/service/findServiceUseCase";
import { ServiceRepository } from "../../adapters/repository/service/serviceRepository";
import { FindServiceForClientController } from "../../adapters/controllers/client/service/findServiceForClientController";
import { BookingRepository } from "../../adapters/repository/booking/bookingRepository";
import { CreateBookingUseCase } from "../../useCases/client/booking/createBookingUseCase";
import { CreateBookingController } from "../../adapters/controllers/client/booking/createBookingController";
import { ServiceWithVendorUseCase } from "../../useCases/client/booking/showServiceWIthVendorUseCase";
import { ShowServiceWithVendorController } from "../../adapters/controllers/client/booking/showServiceWithVendorController";
import { ShowBookingsInClientUseCase } from "../../useCases/client/booking/showBookingsInClientUseCase";
import { ShowBookingsInClientController } from "../../adapters/controllers/client/booking/showBookingsInClientController";
import { ClientLogoutUseCase } from "../../useCases/client/authentication/clientLogoutUseCase";
import { ClientLogoutController } from "../../adapters/controllers/client/authentication/clientLogoutController";
import { FindServiceOnCategorybasisUseCase } from "../../useCases/client/service/findServiceBasedOnCategory";
import { FindServiceBasedOnCategoryController } from "../../adapters/controllers/client/service/findServiceBasedOnCategory";
import { ChangeProfileImageClientUseCase } from "../../useCases/client/profile/changeProfileImageUseCase";
import { ChangeProfileImageClientController } from "../../adapters/controllers/client/profile/changeProfileImageClientController";
import { ShowProfileDetailsInClientUseCase } from "../../useCases/client/profile/showProfileDetailsInClientUseCase";
import { ShowProfileClientController } from "../../adapters/controllers/client/profile/showProfileClientControlller";
import { UpdateProfileClientUseCase } from "../../useCases/client/profile/updateProfileDataClientUseCase";
import { UpdateProfileClientController } from "../../adapters/controllers/client/profile/updateProfileClientController";
import { ChangePasswordClientUseCase } from "../../useCases/client/profile/changePasswordClientUseCase";
import { hashPassword } from "../hashPassword/hashpassword";
import { ChangePasswordClientController } from "../../adapters/controllers/client/profile/changePasswordClientController";
import { SearchCategoryUseCase } from "../../useCases/client/category/searchCategoryUseCase";
import { SearchCategoryController } from "../../adapters/controllers/client/category/searchCategoryController";
import { EventRepository } from "../../adapters/repository/event/eventRepository";
import { FindAllEventsUseCase } from "../../useCases/client/events/findAllEventsUseCase";
import { FindAllEventsClientController } from "../../adapters/controllers/client/events/findAllEventsController";
import { FindEventByIdUseCase } from "../../useCases/client/events/findEventByIdUseCase";
import { FindEventByIdClientController } from "../../adapters/controllers/client/events/findEventByIdClientController";
import { CreateTicketUseCase } from "../../useCases/client/ticket/ticketCreationUseCase";
import { TicketRepository } from "../../adapters/repository/ticket/ticketRepository";
import { PaymentService } from "../services/payementService";
import { QrService } from "../services/qrService";
import { PaymentRepository } from "../../adapters/repository/payment/paymentRepository";
import { CreateTicketController } from "../../adapters/controllers/client/ticketPayment/createTicketController";
import { WalletRepository } from "../../adapters/repository/wallet/walletRepository";
import { ConfirmTicketAndPaymentUseCase } from "../../useCases/client/ticket/confirmTicketAndPaymentUseCase";
import { TransactionRepository } from "../../adapters/repository/transaction/transactionRepository";
import { ConfirmTicketAndPaymentController } from "../../adapters/controllers/client/ticketPayment/confirmTicketAndPaymentController";
import { ShowTicketAndEventClientUseCase } from "../../useCases/client/ticket/showTicketAndEventClientUse";
import { TicketAndEventDetailsClientController } from "../../adapters/controllers/client/profile/ticketAndEvent/ticketAndEventDetailsClientController";
import { FindUserWalletUseCase } from "../../useCases/wallet/findWalletOfClientUseCase";
import { FindClientWalletController } from "../../adapters/controllers/client/wallet/findClientWalletController";
import { FindTransactionsUseCase } from "../../useCases/transactions/findTransactionsUseCase";
import { InitiateBookingPaymentUseCase } from "../../useCases/client/booking/initiateBookingPaymentUseCase";
import { CreateBookingPaymentController } from "../../adapters/controllers/client/booking/createBookingPaymentController";
import { ConfirmBookingPaymentUseCase } from "../../useCases/client/booking/confirmBookingPaymentUseCase";
import { ConfirmBookingPaymentController } from "../../adapters/controllers/client/booking/confirmBookingPaymentController";

// -----------------------register client ----------------------------//
const otpService = new OtpService()
const EmailService = new emailService()
const ClientRepository = new clientRepository()
const vendorDatabase = new VendorDatabase()
const walletDatabase = new WalletRepository()
const useExistance = new userExistance(ClientRepository, vendorDatabase)
const SendOtpClientUseCase = new sendOtpClientUseCase(otpService, EmailService, useExistance)
const createClientUseCase = new CreateClientUseCase(ClientRepository, walletDatabase)
export const clientAuthenticationController = new ClientAuthenticationController(createClientUseCase, SendOtpClientUseCase)


//----------------------------- Login client ------------------------------//
const jwtService = new JwtService()
const redisService = new RedisService()
const loginClientUseCase = new LoginClientUseCase(ClientRepository)
export const injectedClientLoginController = new ClientLoginController(loginClientUseCase, jwtService, redisService)



//-----------------------------google login-------------------------
const googleLoginClientUseCase = new GoogleLoginClientUseCase(ClientRepository)
export const injectedGoogleLogincontroller = new GoogleLoginClient(googleLoginClientUseCase, jwtService, redisService)

//------------------------------send otp for forget password-------------------
const sendOtpForForgetPasswordUseCase = new SendOtpForForgetPassword(EmailService, otpService, ClientRepository)
export const injectedSendOtpForgetPasswordController = new SendOtpToClientForgetPassword(sendOtpForForgetPasswordUseCase)

//-----------------------------changing password through forget password -------------------------
const forgetPasswordClientUseCase = new ForgetPasswordClientUseCase(ClientRepository)
export const injectedForgetPasswordClientController = new ForgetPasswordClientController(forgetPasswordClientUseCase)

//------------------------------ Verifying forget password otp-------------------------------
const verifyingForgetPasswordClientUseCase = new VerifyForgetPasswordOtp(otpService)
export const injectedVerifyingForgetOtpClientController = new VerifyForgetPasswordOtpClientController(verifyingForgetPasswordClientUseCase)

//------------------------------- Find category------------------------------------
const categoryDatabase = new CategoryDatabaseRepository()
const findCategoryUseCase = new FindCategoryClientUseCase(categoryDatabase)
export const injectedFindCategoryForClientController = new FindCategoryClientController(findCategoryUseCase)


//--------------------------------- Fetching vendor for client carousal---------------------------
const findVendorsForclientCarousalUsecase = new FindVendorForClientUseCase(vendorDatabase)
export const injectedFindVendosForClientCarousalController = new FindVendorForClientCarousalController(findVendorsForclientCarousalUsecase)

//--------------------------------Find Services in client side--------------------------
const serviceDatabase = new ServiceRepository()
const findServicesUseCase = new FindServiceUseCaseClient(serviceDatabase)
export const injectedFindServiceForClientController = new FindServiceForClientController(findServicesUseCase)

//----------------------------------Create booking for service--------------------
const bookingDatabase = new BookingRepository()
const createBookingUseCase = new CreateBookingUseCase(bookingDatabase)
export const injectedCreateBookingController = new CreateBookingController(createBookingUseCase)

//----------------------------------show service data with vendor-----------------------
const showServiceWithVendorUseCase = new ServiceWithVendorUseCase(serviceDatabase)
export const injectedShowServiceWithVendorCController = new ShowServiceWithVendorController(showServiceWithVendorUseCase)

//----------------------------------Fetch all bookings of client ------------------
const showBookingsInClientUseCase = new ShowBookingsInClientUseCase(bookingDatabase)
export const injectedShowBookingInClientController = new ShowBookingsInClientController(showBookingsInClientUseCase)

//-----------------------------------Client logout----------------------------------
const clientLogoutUseCase = new ClientLogoutUseCase(redisService, jwtService)
export const injectedClientLogoutController = new ClientLogoutController(clientLogoutUseCase)

//----------------------------------Find services on basis of category-------------------------
const findServiceOnBasisOfCategoryUseCase = new FindServiceOnCategorybasisUseCase(serviceDatabase)
export const injectedFindServiceOncategoryBasis = new FindServiceBasedOnCategoryController(findServiceOnBasisOfCategoryUseCase)

//----------------------------------Update profile image client---------------------------
const changeProfileImageClientUseCase = new ChangeProfileImageClientUseCase(ClientRepository)
export const injectedChangeProfileImageClientController = new ChangeProfileImageClientController(changeProfileImageClientUseCase)

//---------------------------------- Show profile client ----------------------------------
const showProfileClientUseCase = new ShowProfileDetailsInClientUseCase(ClientRepository)
export const showProfileClientController = new ShowProfileClientController(showProfileClientUseCase)

//---------------------------------- Update client profile data---------------------------
const updateProfileClientUseCase = new UpdateProfileClientUseCase(ClientRepository)
export const injectedUpdateProfileClientController = new UpdateProfileClientController(updateProfileClientUseCase)

//---------------------------------- Client password change---------------
const HashPassword = new hashPassword()
const changeClientPasswordUseCase = new ChangePasswordClientUseCase(ClientRepository, HashPassword)
export const injectedChangeClientPasswordController = new ChangePasswordClientController(changeClientPasswordUseCase)

//---------------------------------Client Searching category
const searchCategoryUseCase = new SearchCategoryUseCase(categoryDatabase)
export const injectedSearchCategoryController = new SearchCategoryController(searchCategoryUseCase)


//----------------------------------find events in client side---------------------
const eventDatabase = new EventRepository()
const findEventsClientUseCase = new FindAllEventsUseCase(eventDatabase)
export const injectedFindEventsClientController = new FindAllEventsClientController(findEventsClientUseCase)

//--------------------------------Find event by id---------------------------
const findEventByIdUseCase = new FindEventByIdUseCase(eventDatabase)
export const injectedFindEventByIdClientController = new FindEventByIdClientController(findEventByIdUseCase)

//------------------------------Ticket payment creation-------------------------------------
const ticketDatabase = new TicketRepository()
const stripeService = new PaymentService()
const generateQrService = new QrService()
const paymentDatabase = new PaymentRepository()
const createTicketUseCase = new CreateTicketUseCase(ticketDatabase, stripeService, generateQrService, paymentDatabase)
export const injectedCreateTicketController = new CreateTicketController(createTicketUseCase)

//------------------------------Confirm ticket and payment confirmation----------------------
const transactionDatabase = new TransactionRepository()
const confirmTicketAndPaymentUseCase = new ConfirmTicketAndPaymentUseCase(stripeService, eventDatabase, ticketDatabase, walletDatabase, transactionDatabase)
export const injectedConfirmTicketAndPaymentController = new ConfirmTicketAndPaymentController(confirmTicketAndPaymentUseCase)

//--------------------------------find ticket and event details for profile------------------------
const ticketAndEventDetailsUseCase = new ShowTicketAndEventClientUseCase(ticketDatabase)
export const injectedTicketAndEventDetailsCientController = new TicketAndEventDetailsClientController(ticketAndEventDetailsUseCase)

//---------------------------------find client wallet-----------------
const findClientWallet = new FindUserWalletUseCase(walletDatabase)
const findTransactionUseCase = new FindTransactionsUseCase(transactionDatabase)
export const injectedFindClientWalletController = new FindClientWalletController(findClientWallet, findTransactionUseCase)

//---------------------------------Client booking payment inititation----------------
const bookingPaymentInititaionUseCase = new InitiateBookingPaymentUseCase(bookingDatabase, stripeService, paymentDatabase)
export const InjectedInititateBookingPaymentController = new CreateBookingPaymentController(bookingPaymentInititaionUseCase)


//-----------------------------------Confirm booking payment-----------------------------------
const confirmBookingPaymentUseCase = new ConfirmBookingPaymentUseCase(bookingDatabase, paymentDatabase, walletDatabase, transactionDatabase, stripeService)
export const injectedConfirmBookingPaymentController = new ConfirmBookingPaymentController(confirmBookingPaymentUseCase)
