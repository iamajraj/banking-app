import React from 'react';
import { TUser } from '../../utils/queries/getUsers';

type Props = {
  user: TUser | null;
  onTransfer: (user: TUser) => void;
};

function User({ user, onTransfer }: Props) {
  return (
    <div className="flex items-center justify-between p-5 mx-2 border rounded-lg">
      <p className="flex items-center gap-4">
        <span className="rounded-full border block px-3 py-1">{user?.id}</span>{' '}
        {user?.name}
      </p>
      <p className="">${user?.balance}</p>
      <button
        onClick={() => onTransfer(user!)}
        className="px-6 py-1 border rounded-full text-[15px] cursor-pointer hover:border-gray-400 transition-[border]"
      >
        Transfer money
      </button>
    </div>
  );
}

export default User;
