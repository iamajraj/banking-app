import React from 'react';
import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

type Props = {};

function Nav({}: Props) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  return (
    <>
      <div className="py-4 px-10 w-max ml-auto flex items-center gap-5">
        <button
          onClick={() => setLoginModalOpen(true)}
          className="px-6 py-1 border rounded-full text-[15px] cursor-pointer hover:border-gray-400 transition-[border]"
        >
          Login
        </button>
        <button
          onClick={() => setRegisterModalOpen(true)}
          className="px-6 py-1 border rounded-full text-[15px] cursor-pointer hover:border-gray-400 transition-[border]"
        >
          Register
        </button>
      </div>
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
      <RegisterModal
        open={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />
    </>
  );
}

export default Nav;
