import { TUser } from './getUsers';

export const getUser = async () => {
  const code = JSON.parse(localStorage.getItem('sec_c') ?? '');
  if (!code) {
    throw new Error('Not logged in');
  }
  const res = await fetch(`http://localhost:5000/users?code=${code}`);
  const user = (await res.json()).users as TUser;

  return user;
};
