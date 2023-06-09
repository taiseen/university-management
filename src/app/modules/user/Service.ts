// DataBase Logic...
import ApiError from '../../../error/ApiError';
import config from '../../../config';
import { TUser } from './Interface';
import { currentId } from './utils';
import { User } from './Model';

const createNewUser = async (user: TUser): Promise<TUser | null> => {
  // set default password
  if (!user.password) {
    user.password = config.defaultUserPass as string;
  }

  // auto generate incremental id
  user.id = await currentId();

  const createNewUser = await User.create(user);

  if (!createNewUser) {
    throw new ApiError(400, 'Failed to create a new user...');
  }

  return createNewUser;
};

export const userService = {
  createNewUser,
};
