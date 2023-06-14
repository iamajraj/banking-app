import React from 'react';

type Props = {
  name: string | null;
  id: number | null;
};

function User({ id, name }: Props) {
  return (
    <div className="flex items-center justify-between p-5 mx-2 border rounded-lg">
      <p className="flex items-center gap-4">
        <span className="rounded-full border block px-3 py-1">{id}</span> {name}
      </p>
      <button className="px-6 py-1 border rounded-full text-[15px] cursor-pointer hover:border-gray-400 transition-[border]">
        Transfer money
      </button>
    </div>
  );
}

export default User;
