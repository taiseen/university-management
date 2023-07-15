import { TLoginUser, TLoginUserResponse } from './interface';
import { jwtHelpers } from '../../../utils/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import { userModel } from '../user/model';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';
import config from '../../../config';

const loginUser = async (payload: TLoginUser): Promise<TLoginUserResponse> => {
  // eslint-disable-next-line no-unused-vars
  const { id, password } = payload;

  // access to our instance methods
  const isUserExist = await userModel.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await userModel.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // 🟩🟩🟩 create access token...
  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expiresIn as string
  );

  // 🟩🟩🟩 create refresh token...
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refreshSecret as Secret,
    config.jwt.refreshExpiresIn as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

// const refreshToken = async (token: string): Promise<TRefreshTokenResponse> => {
//   //verify token
//   // invalid token - synchronous
//   let verifiedToken = null;
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret
//     );
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }

//   const { userId } = verifiedToken;

//   // tumi delete hye gso  kintu tumar refresh token ase
//   // checking deleted user's refresh token

//   const isUserExist = await User.isUserExist(userId);
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   //generate new token

//   const newAccessToken = jwtHelpers.createToken(
//     {
//       id: isUserExist.id,
//       role: isUserExist.role,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );

//   return {
//     accessToken: newAccessToken,
//   };
// };

// const changePassword = async (
//   user: JwtPayload | null,
//   payload: TChangePassword
// ): Promise<void> => {
//   const { oldPassword, newPassword } = payload;

// checking is user exist
// const isUserExist = await User.isUserExist(user?.userId);

//alternative way
//   const isUserExist = await User.findOne({ id: user?.userId }).select(
//     '+password'
//   );

//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }

// checking old password
//   if (
//     isUserExist.password &&
//     !(await User.isPasswordMatched(oldPassword, isUserExist.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
//   }

// hash password before saving
// const newHashedPassword = await bcrypt.hash(
//   newPassword,
//   Number(config.bycrypt_salt_rounds)
// );

// const query = { id: user?.userId };
// const updatedData = {
//   password: newHashedPassword,  //
//   needsPasswordChange: false,
//   passwordChangedAt: new Date(), //
// };

// await User.findOneAndUpdate(query, updatedData);
// data update
//   isUserExist.password = newPassword;
//   isUserExist.needsPasswordChange = false;

//   // updating using save()
//   isUserExist.save();
// };

export const authService = {
  loginUser,
  //   refreshToken,
  //   changePassword,
};
