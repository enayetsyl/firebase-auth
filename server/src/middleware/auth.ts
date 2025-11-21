import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const verifySessionCookie = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const sessionCookie = req.cookies.session || '';

  if (!sessionCookie) {
    // Check for Bearer token as fallback (from proxy)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      // If it's a session cookie passed as bearer
      try {
        const decodedClaims = await admin.auth().verifySessionCookie(token, true /** checkRevoked */);
        req.user = decodedClaims;
        return next();
      } catch (error) {
        // If it fails, maybe it's an ID token? (Optional, depending on requirements)
        // For now, strictly enforce session cookie verification as per plan
      }
    }

    res.status(401).json({ error: 'Unauthorized: No session cookie found' });
    return;
  }

  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */);
    req.user = decodedClaims;
    next();
  } catch (error) {
    console.error('Verify Session Cookie Error:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid session' });
  }
};
