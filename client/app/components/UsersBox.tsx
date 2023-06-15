import React, { useMemo, useState } from 'react';

import User from './User';
import { useQuery } from '@tanstack/react-query';
import { TUser, getUsers } from '../../utils/queries/getUsers';
import TransferModal from './TransferModal';

type Props = {
  refetchLoggedInUser: () => void;
};

function UsersBox({ refetchLoggedInUser }: Props) {
  const [transferUser, setTransferUser] = useState<TUser | null>(null);
  const {
    isLoading,
    data: users,
    isError,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ['get-users'],
    queryFn: getUsers,
  });

  const open = useMemo(() => {
    return transferUser !== null;
  }, [transferUser]);

  const onClose = () => {
    setTransferUser(null);
  };

  return (
    <>
      <div className="border min-h-[500px] w-[60%] rounded-lg pt-4 flex flex-col gap-4">
        {isLoading ? (
          <p className="text-center uppercase font-bold">Loading...</p>
        ) : isError ? (
          <p className="text-center uppercase font-bold">
            Something went wrong...
          </p>
        ) : (
          users &&
          users.map((user) => (
            <User
              onTransfer={(user: TUser) => setTransferUser(user)}
              key={`${user.id}-${user.name}`}
              user={user}
            />
          ))
        )}
      </div>
      <TransferModal
        open={open}
        onClose={onClose}
        transferUser={transferUser}
        refetchLoggedInUser={refetchLoggedInUser}
        refetchUsers={refetchUsers}
      />
    </>
  );
}

export default UsersBox;
