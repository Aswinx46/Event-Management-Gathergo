import { Jwt } from "jsonwebtoken"

export interface ItokenService {
    checkTokenBlacklist(token: string): Promise<boolean>
    verifyToken(token: string): Promise<string | JwtPayload>
}