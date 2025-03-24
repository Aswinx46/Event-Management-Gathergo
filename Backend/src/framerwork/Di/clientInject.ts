import { ClientAuthenticationController } from "../../adapters/controllers/client/authentication/clientAuthenticationController";
import { clientRepository } from "../../adapters/repository/client/clientRepository";
import { CreateClientUseCase } from "../../useCases/client/authentication/createClientUsecase";
import { emailService } from "../services/emailService";
import { OtpService } from "../services/genarateOtp";
import { sendOtpClientUseCase } from "../../useCases/client/authentication/sendOtpClientUseCase";
import { LoginClientUseCase } from "../../useCases/client/authentication/loginClientUseCase";
import { ClientLoginController } from "../../adapters/controllers/client/authentication/clientLoginController.";
import { JwtService } from "../services/jwtService";
import {RedisService} from '../services/redisService'
import { FindAllClientUseCase } from "../../useCases/admin/findAllClientUseCase";
import { FindAllClientsController } from "../../adapters/controllers/admin/findAllClientsController";
import { GoogleLoginClientUseCase } from "../../useCases/client/authentication/googleLoginClientUseCase";
import { GoogleLoginClient } from "../../adapters/controllers/client/authentication/clientGoogleLogin";
// -----------------------register client ----------------------------//
const otpService=new OtpService()
const EmailService=new emailService()
const SendOtpClientUseCase=new sendOtpClientUseCase(otpService,EmailService)
const ClientRepository=new clientRepository()
const createClientUseCase=new CreateClientUseCase(ClientRepository)
export const clientAuthenticationController=new ClientAuthenticationController(createClientUseCase,SendOtpClientUseCase)


//----------------------------- Login client ------------------------------//
const jwtService=new JwtService()
const redisService=new RedisService()
const loginClientUseCase=new LoginClientUseCase(ClientRepository)
export const injectedClientLoginController=new ClientLoginController(loginClientUseCase,jwtService,redisService)

//------------------------------Find all Clients-----------------------
const findAllClientUseCase=new FindAllClientUseCase(ClientRepository)
export const injectedFindAllClientController=new FindAllClientsController(findAllClientUseCase)

//-----------------------------google login-------------------------
const googleLoginClientUseCase=new GoogleLoginClientUseCase(ClientRepository)
export const injectedGoogleLogincontroller=new GoogleLoginClient(googleLoginClientUseCase)