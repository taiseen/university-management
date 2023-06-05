import { User } from './Model';

const findLastUserId = async () => {
  const lastUserId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUserId?.id;
};

export const currentId = async () => {
  // create new user id || find existing user id...
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0');

  // increment id by 1
  const incrementalId = (+currentId + 1).toString().padStart(5, '0');
  return incrementalId;
};
