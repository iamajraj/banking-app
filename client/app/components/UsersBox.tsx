import React from 'react';

import User from './User';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../utils/queries/getUsers';

type Props = {};

function UsersBox({}: Props) {
  const {
    isLoading,
    data: users,
    isError,
  } = useQuery({
    queryKey: ['get-users'],
    queryFn: getUsers,
  });
  return (
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
          <User key={`${user.id}-${user.name}`} name={user.name} id={user.id} />
        ))
      )}
    </div>
  );
}

export default UsersBox;
