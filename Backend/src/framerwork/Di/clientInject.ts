import { ClientAuthenticationController } from "../../adapters/controllers/client/authentication/clientAuthenticationController";
import { clientRepository } from "../../adapters/repository/client/clientRepository";
import { CreateClientUseCase } from "../../useCases/client/authentication/createClientUsecase";
import { emailService } from "../services/emailService";
import { OtpService } from "../services/genarateOtp";
import { sendOtpClientUseCase } from "../../useCases/client/authentication/sendOtpClientUseCase";
import { LoginClientUseCase } from "../../useCases/client/authentication/loginClientUseCase";
import { ClientLoginController } from "../../adapters/controllers/client/authentication/clientLoginController.";
import { JwtService } from "../services/jwtService";
// -----------------------register client ----------------------------//
const otpService=new OtpService()
const EmailService=new emailService()
const SendOtpClientUseCase=new sendOtpClientUseCase(otpService,EmailService)
const ClientRepository=new clientRepository()
const createClientUseCase=new CreateClientUseCase(ClientRepository)
export const clientAuthenticationController=new ClientAuthenticationController(createClientUseCase,SendOtpClientUseCase)


//----------------------------- Login client ------------------------------//
const jwtService=new JwtService()
const loginClientUseCase=new LoginClientUseCase(ClientRepository)
export const injectedClientLoginController=new ClientLoginController(loginClientUseCase,jwtService)