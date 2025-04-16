import { CustomError } from '../../helpers/handleCustomError'
import { IUser } from '../user/user.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../user/user.model'

const register = async (payload: IUser) => {
  const result = await UserModel.create(payload)
  if (!result) {
    throw new CustomError('Failed to create user', 500);
  }
  return result

  
}

const login = async (payload: { gmail: string; password: string }) => {
 

  if (!payload.gmail || !payload.password) {
  
    throw { message: 'Gmail and password are required', statusCode: 400 };
  }

  const user = await UserModel.findOne({ gmail: payload.gmail }).select('+password');


  if (!user) {

    throw new Error('User not found!'); 

  }

  if (user.status === 'blocked') {
  
    throw new Error('This user is blocked!' );
  }

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatched) {
  
    throw new Error('Invalid password' );
  }

  const jwtPayload = {
    gmail: user.gmail,
    role: user.role,
    _id: user._id.toString(),
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET || 'primarytestkey', { expiresIn: '10d' });

  
  return { token, user };
};




export const AuthService = {
  register,
  login,
}
