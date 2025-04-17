import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


const login = catchAsync(async(req: Request, res: Response)=>{
    const result = await AuthService.login(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.ACCEPTED,
        status: true,
        message: "Login successful", 
        data: {
          token: result?.token || "", 
          user: result?.user || {}
        },
      });
})


export const AuthControllers = {
    login
}