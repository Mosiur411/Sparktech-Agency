import { StatusCodes } from 'http-status-codes'
import { userService } from './user.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

const createStudeent = catchAsync(
  async (req, res) => {
    const payload = req.body
    const result = await userService.createStudentsIntoDB(payload)
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Student created successfully',
      data: result,
    }
    )
  });

const createFaculty = catchAsync(
  async (req, res) => {
    const payload = req.body
    const result = await userService.createFacultysIntoDB(payload)
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Student created successfully',
      data: result,
    }
    )
});


const createGuest = catchAsync(
  async (req, res) => {
    const payload = req.body
    const result = await userService.createStudentsIntoDB(payload)
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Student created successfully',
      data: result,
    }
    )
  });
const createAdmin = catchAsync(
  async (req, res) => {
    const payload = req.body
    const result = await userService.createAdminIntoDB(payload)
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Student created successfully',
      data: result,
    }
    )
  });

const createCanteenStaff = catchAsync(
  async (req, res) => {
    const payload = req.body
    const result = await userService.createCanteenStaffsIntoDB(payload)
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'Student created successfully',
      data: result,
    }
    )
});



const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getUSers();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Users getting successfully',
    data: result,
  })
})

const deleteUsers = catchAsync(async (req, res) => {
  const result = await userService.deleteUser();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User Deleted successfully',
    data: result,
  })
})




  const getProfile = catchAsync(async (req, res) => {
    const data = req.user;
    // console.log(data);

    const result = await userService.getPofile(data?.gmail); // Assuming userServices.getProfile is defined
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Profile get successfully',
      data: result,
    })
});




export const userController = {
  createStudeent,
  createFaculty,
  getAllUsers,
  deleteUsers,
  getProfile,
  createAdmin,
  createGuest,
  createCanteenStaff


}
