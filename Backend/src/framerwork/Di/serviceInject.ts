import { verifyTokenAndCheckBlackList } from "../../adapters/middlewares/tokenValidationMiddleWare";
import { JwtService } from "../services/jwtService";
import { RedisService } from "../services/redisService";
import { TokenService } from "../services/tokenService";
const redisService = new RedisService()
const jwtService = new JwtService()
const ACCESSTOKEN_SECRET_KEY = process.env.ACCESSTOKEN_SECRET_KEY
const tokenService = new TokenService(redisService, jwtService, ACCESSTOKEN_SECRET_KEY!)

export const injectedVerifyTokenAndCheckBlacklistMiddleWare = verifyTokenAndCheckBlackList(tokenService)

