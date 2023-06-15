export type TUser = {
  name: string;
  id: number;
  balance: number;
};

export const getUsers = async () => {
  const res = await fetch('http://localhost:5000/users');
  const users = (await res.json()).users as TUser[];

  return users;
};
