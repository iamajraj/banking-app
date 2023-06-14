type User = {
  name: string;
  id: number;
};

export const getUsers = async () => {
  const res = await fetch('http://localhost:5000/users');
  const users = (await res.json()).users as User[];

  return users;
};
