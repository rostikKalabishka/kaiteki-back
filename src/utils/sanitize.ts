import { User } from 'src/users/schemas/user.schemas';

export const sanitize = (user: User) => {
  const sanitizedUser = user.toObject();
  delete sanitizedUser.password;

  return sanitizedUser;
};
