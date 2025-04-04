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
import { FindAllClientUseCase } from "../../useCases/admin/findAllClientUseCase";
import { FindAllClientsController } from "../../adapters/controllers/admin/findAllClientsController";
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
// -----------------------register client ----------------------------//
const otpService = new OtpService()
const EmailService = new emailService()
const ClientRepository = new clientRepository()
const vendorDatabase = new VendorDatabase()
const useExistance = new userExistance(ClientRepository, vendorDatabase)
const SendOtpClientUseCase = new sendOtpClientUseCase(otpService, EmailService, useExistance)
const createClientUseCase = new CreateClientUseCase(ClientRepository)
export const clientAuthenticationController = new ClientAuthenticationController(createClientUseCase, SendOtpClientUseCase)


//----------------------------- Login client ------------------------------//
const jwtService = new JwtService()
const redisService = new RedisService()
const loginClientUseCase = new LoginClientUseCase(ClientRepository)
export const injectedClientLoginController = new ClientLoginController(loginClientUseCase, jwtService, redisService)

//------------------------------Find all Clients-----------------------
const findAllClientUseCase = new FindAllClientUseCase(ClientRepository)
export const injectedFindAllClientController = new FindAllClientsController(findAllClientUseCase)

//-----------------------------google login-------------------------
const googleLoginClientUseCase = new GoogleLoginClientUseCase(ClientRepository)
export const injectedGoogleLogincontroller = new GoogleLoginClient(googleLoginClientUseCase)

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
