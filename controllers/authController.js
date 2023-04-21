import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  CustomAPIError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js';
import attachCookies from '../utils/attachCookies.js';

const register = async (req, res) => {
  // res.send('register user');
  // try {
  //   const user = await User.create(req.body);
  //   res.status(201).json({ user });
  // } catch (error) {
  //   // res.status(500).json({ msg: 'there was an error' });
  //   next(error);
  // }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError('please provide all values');
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }
  // const user = await User.create(req.body);
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  // res.status(201).json({ user });
  attachCookies({ res, token });
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    // token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }
  // console.log(user);
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }
  const token = user.createJWT();
  user.password = undefined;
  attachCookies({ res, token });

  // first cookie
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE.ENV === 'production',
  });
  // res.status(200)
  res
    .status(StatusCodes.OK)
    .json({ user, /* token, */ location: user.location });
  // res.send('login user');
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  attachCookies({ res, token });
  // console.log(req.user);
  // res.send('updateUser');
  res
    .status(StatusCodes.OK)
    .json({ user, /* token, */ location: user.location });
};
// commit
const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};


export { register, login, updateUser, getCurrentUser, logout };
