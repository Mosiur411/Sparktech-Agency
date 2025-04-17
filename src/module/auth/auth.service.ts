import { CustomError } from '../../helpers/handleCustomError'
import { IUser } from '../user/user.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../user/user.model'



const login = async (payload: { email: string; password: string }) => {
 

  if (!payload.email || !payload.password) {
    throw { message: 'email and password are required', statusCode: 400 };
  }

  const user = await UserModel.findOne({email: payload.email }).select('+password');

  if (!user) {
    throw new Error('User not found!'); 
  }


  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatched) {
    throw new Error('Invalid password' );
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    _id: user._id.toString(),
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET || 'primarytestkey', { expiresIn: '10d' });

  
  return { token, user };
};


export const AuthService = {
  login,
}
