// DataBase Logic...
import { TUser } from './Interface';
import { User } from './Model';

const createUser = async (user: TUser): Promise<TUser | null> => {
  // TODO: auto generate incremental id
  if (!user.id)
    // TODO: default password

    const createdUser = await User.create(user);

  if (!createdUser) {
    throw new Error('Failed to create a new user...');
  }

  return createdUser;
};

export default {
  createUser,
};
