import { ClientAuthenticationController } from "../../adapters/controllers/client/authentication/clientAuthenticationController";
import { clientRepository } from "../../adapters/repository/client/clientRepository";
import { CreateClientUseCase } from "../../useCases/client/createClientUsecase";
import { emailService } from "../services/emailService";
import { OtpService } from "../services/genarateOtp";
import { sendOtpClientUseCase } from "../../useCases/client/authentication/sendOtpClientUseCase";
// -----------------------register client ----------------------------//
const otpService=new OtpService()
const EmailService=new emailService()
const SendOtpClientUseCase=new sendOtpClientUseCase(otpService,EmailService)
const ClientRepository=new clientRepository()
const createClientUseCase=new CreateClientUseCase(ClientRepository)
export const clientAuthenticationController=new ClientAuthenticationController(createClientUseCase,SendOtpClientUseCase)