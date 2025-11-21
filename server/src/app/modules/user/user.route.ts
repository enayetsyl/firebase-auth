import express from 'express';
import { UserController } from './user.controller';
import { verifySessionCookie } from '../../../middleware/auth';

const router = express.Router();

router.get('/profile', verifySessionCookie, UserController.getMyProfile);

export const UserRoutes = router;
