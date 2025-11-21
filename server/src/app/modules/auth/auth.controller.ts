import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { idToken } = req.body;
  const result = await AuthService.loginUser(idToken);

  // We don't set the cookie here because the proxy (Next.js) handles the actual cookie setting for the browser.
  // However, if we were hitting this directly from a client that supports cookies (and same domain), we could.
  // But the requirement is "Next api route to set token in the cookies and use proxy".
  // So we just return the session cookie to the Next.js API route.

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie('session');
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logged out successfully',
    data: null,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const sessionCookie = req.cookies.session || '';
  if (!sessionCookie) {
    sendResponse(res, {
      statusCode: 401,
      success: false,
      message: 'No session cookie',
      data: null,
    });
    return;
  }

  const result = await AuthService.refreshToken(sessionCookie);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Session is valid',
    data: result,
  });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await AuthService.forgotPassword(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password reset link generated successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  registerUser,
  logoutUser,
  refreshToken,
  forgotPassword,
};
