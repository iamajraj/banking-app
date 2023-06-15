'use client';

import Nav from './components/Nav';
import { Teko } from 'next/font/google';
import UsersBox from './components/UsersBox';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../utils/queries/getUser';

const font = Teko({
  weight: '500',
  subsets: ['latin'],
});

export default function Home() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
  return (
    <>
      <main className="h-screen w-full max-w-4xl mx-auto flex flex-col">
        <Nav />

        <div className="mt-5 border-t pt-8">
          <h1 className="text-3xl">
            Your balance:{' '}
            <span className={`${font.className} text-5xl`}>
              {isLoading ? 'Loading...' : isError ? '$0' : `$${data.balance}`}
            </span>
          </h1>
          <div className="flex gap-5 justify-between mt-10">
            <div className="w-max  flex flex-col gap-2">
              <button className="px-6 py-1 border rounded-full text-[15px] cursor-pointer hover:border-gray-400 transition-[border]">
                Withdraw
              </button>
              <button className="px-6 py-1 border rounded-full text-[15px] cursor-pointer hover:border-gray-400 transition-[border]">
                Deposit
              </button>
            </div>
            <UsersBox refetchLoggedInUser={refetch} />
          </div>
        </div>
      </main>
    </>
  );
}
