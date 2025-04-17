import { StatusCodes } from 'http-status-codes'
import { userService } from './user.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

const createUser = catchAsync(
  async (req, res) => {
    const payload = req.body
    const result = await userService.createUserIntoDB(payload)
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Student created successfully',
      data: result,
    }
    )
  });

const getProfile = catchAsync(async (req, res) => {
  const data = req.user;
  const result = await userService.getProfile(data?._id); 
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Profile get successfully',
    data: result,
  })

});




export const userController = {
  createUser,
  getProfile,

}
