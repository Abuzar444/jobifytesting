import express from 'express';
import rateLimiter from 'express-rate-limit';

const router = express.Router();

const apiLimiter = rateLimiter({
  windowMS: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout
} from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';
// TEST USER
import testUser from '../middleware/testUser.js';

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/logout').get(logout);
router.route('/updateUser').patch(authenticateUser, testUser, updateUser);
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);

export default router;
