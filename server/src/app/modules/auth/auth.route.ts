import express from 'express';
import validateRequest from '../../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerZodSchema),
  AuthController.registerUser
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post('/logout', AuthController.logoutUser);

router.post('/refresh-token', AuthController.refreshToken);

router.post(
  '/forgot-password',
  validateRequest(AuthValidation.forgotPasswordZodSchema),
  AuthController.forgotPassword
);

export const AuthRoutes = router;
