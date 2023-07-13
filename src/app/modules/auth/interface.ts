import { ENUM_USER_ROLE } from '../../../enums/user';

export type TLoginUser = {
  id: string;
  password: string;
};

export type TLoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};

export type TRefreshTokenResponse = {
  accessToken: string;
};

export type TVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_ROLE;
};

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
};
