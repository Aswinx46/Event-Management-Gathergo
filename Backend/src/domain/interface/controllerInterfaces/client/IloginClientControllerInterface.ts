import { Request, Response } from "express";
import { clientEntity } from "../../../entities/clientEntity";

export interface IloginClientControllerInterface{
    handleLogin(req:Request,res:Response):Promise<void>
}