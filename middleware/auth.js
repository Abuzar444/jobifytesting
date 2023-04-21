import { UnAuthenticatedError } from '../errors/index.js';
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith('Bearer')) {
  //   throw new UnAuthenticatedError('Authentication Invalid');
  // }
  // const token = authHeader.split(' ')[1];

  // console.log(req.cookies);
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenticatedError('Authentication Invalid!');
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // TEST USER
    const testUser = payload.userId === '643c2f872c557c1411b9e5b1';
    // const testUser = payload.userId === 'testUserID';
    req.user = { userId: payload.userId, testUser };
    // TEST USER
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};

export default auth;
