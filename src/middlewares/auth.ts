import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../module/user/user.interface';
import { UserModel } from '../module/user/user.model';
import { USER_ROLE, USER_STATUS } from '../module/user/user.constants';

// Extend Request type to include user
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const authUser = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('You are not authorized!');
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, "primarytestkey") as JwtPayload;
    const { role, email } = decoded;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('This user is not found!');
    }
    if (user.role === USER_STATUS.blocked as string) {
      throw new Error('This user is blocked!');
    }
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized!');
    }
    req.user = decoded; // Attach decoded token to req.user
    next();
  });
};

const onlyAdmin = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !user.role) {
      throw new Error("Access denied. No token provided or invalid format.");
    }
    if (user.role !== USER_ROLE.admin) {
      throw new Error("Access denied only admin");
    }
    if (requiredRoles.length && !requiredRoles.includes(user?.role)) {
      throw new Error('You are not authorized!');
    }
    next();
  });
};
const onlyStudent = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !user.role) {
      throw new Error("Access denied. No token provided or invalid format.");
    }
    if (user.role !== USER_ROLE.student) {
      throw new Error("Access denied only student");
    }
    if (requiredRoles.length && !requiredRoles.includes(user?.role)) {
      throw new Error('You are not authorized!');
    }
    next();
  });
};
const onlyFaculty = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !user.role) {
      throw new Error("Access denied. No token provided or invalid format.");
    }
    if (user.role !== USER_ROLE.faculty) {
      throw new Error("Access denied only faculty");
    }
    if (requiredRoles.length && !requiredRoles.includes(user?.role)) {
      throw new Error('You are not authorized!');
    }
    next();
  });
};
const onlyGuest = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !user.role) {
      throw new Error("Access denied. No token provided or invalid format.");
    }
    if (user.role !== USER_ROLE.guest) {
      throw new Error("Access denied only guest");
    }
    if (requiredRoles.length && !requiredRoles.includes(user?.role)) {
      throw new Error('You are not authorized!');
    }
    next();
  });
};
const onlyCanteenStaff = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !user.role) {
      throw new Error("Access denied. No token provided or invalid format.");
    }
    if (user.role !== USER_ROLE.guest) {
      throw new Error("Access denied only oCanteenStaff");
    }
    if (requiredRoles.length && !requiredRoles.includes(user?.role)) {
      throw new Error('You are not authorized!');
    }
    next();
  });
};

export const auth = { authUser, onlyAdmin, onlyStudent, onlyFaculty, onlyGuest, onlyCanteenStaff };

