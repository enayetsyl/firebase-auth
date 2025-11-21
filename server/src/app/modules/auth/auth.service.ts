import * as admin from 'firebase-admin';
import config from '../../../config';
import AppError from '../../../shared/AppError';

const loginUser = async (idToken: string) => {
  try {
    // Verify the ID token first
    await admin.auth().verifyIdToken(idToken);

    // Create session cookie (valid for 5 days)
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    return {
      sessionCookie,
      expiresIn,
    };
  } catch (error) {
    throw new AppError(401, 'Invalid or expired token');
  }
};

const registerUser = async (payload: { email: string; password: string; displayName: string }) => {
  try {
    const userRecord = await admin.auth().createUser({
      email: payload.email,
      password: payload.password,
      displayName: payload.displayName,
    });

    return {
      uid: userRecord.uid,
    };
  } catch (error: any) {
    throw new AppError(400, error.message || 'Error creating user');
  }
};

const refreshToken = async (sessionCookie: string) => {
  try {
    await admin.auth().verifySessionCookie(sessionCookie, true);
    return {
      message: 'Session is valid',
    };
  } catch (error) {
    throw new AppError(401, 'Invalid session');
  }
};

export const AuthService = {
  loginUser,
  registerUser,
  refreshToken,
};
