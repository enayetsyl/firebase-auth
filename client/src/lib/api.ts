import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
  baseURL: '/api/proxy',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: You might not need this if using cookies, 
// but if you were sending ID token directly, you'd add it here.
// Since we use proxy + cookies, we just ensure credentials are sent if needed (though proxy handles it).
// However, for client-side Firebase interactions or if we mix approaches:
api.interceptors.request.use(
  async (config) => {
    // Optional: If we needed to send ID token for some specific non-proxy routes
    // const user = auth.currentUser;
    // if (user) {
    //   const token = await user.getIdToken();
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle global errors like 401
    if (error.response && error.response.status === 401) {
      // Redirect to login or refresh token logic
      // Since we use session cookies, if 401, it means session expired.
      // We might want to trigger a re-login or check auth state.
      if (typeof window !== 'undefined') {
        // window.location.href = '/login'; // Optional: auto redirect
      }
    }
    return Promise.reject(error);
  }
);

export const forgotPassword = async (email: string) => {
  return api.post('/auth/forgot-password', { email });
};

export default api;
