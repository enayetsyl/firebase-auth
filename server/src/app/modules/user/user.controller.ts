import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import { AuthRequest } from '../../../middleware/auth';

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;
  // const result = await UserService.getMyProfile(user?.uid as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile retrieved successfully',
    data: user,
  });
});

export const UserController = {
  getMyProfile,
};
