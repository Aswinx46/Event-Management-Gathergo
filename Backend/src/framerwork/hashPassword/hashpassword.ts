import bcrypt from 'bcrypt'
import { IhashPassword } from '../../domain/interface/serviceInterface/IhashPassword'
export class hashPassword implements IhashPassword {
    public async hashPassword(password: string): Promise<string> {
        const hashPassword = await bcrypt.hash(password, 10)
        return hashPassword
    }
    public async comparePassword(password: string, passwordInDb: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordInDb)
    }
}