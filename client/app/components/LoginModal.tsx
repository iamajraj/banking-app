import React, { FormEvent, useState } from 'react';
import Modal from './Modal';
import InputField from './InputField';

type Props = {
  open: boolean;
  onClose: () => void;
};

function LoginModal({ open, onClose }: Props) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
        }),
      });

      if (!response.ok) {
        const message =
          (await response.json()).message ??
          'Nothing happened wrong just the login was failed';
        throw new Error(message);
      } else {
        const code = await response.json();
        localStorage.setItem('sec_c', JSON.stringify(code.code));
        setCode('');
        setError('');
        onClose();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const close = () => {
    setError('');
    setCode('');
    onClose();
  };

  return (
    <Modal
      open={open}
      title="Login"
      onClose={close}
      body={
        <>
          <form onSubmit={login} className="mt-5">
            <InputField
              placeholder="***"
              label="Enter your secret code"
              name="code"
              onChange={(e) => setCode(e.target.value)}
            />
            <p className="mt-4 text-[13px] text-red-500">{error}</p>
            <div className="mt-5 flex items-center gap-4">
              <button
                type="submit"
                className="px-6 py-1 border rounded-full text-[15px] cursor-pointer hover:border-gray-400 transition-[border] w-full"
              >
                Login
              </button>
            </div>
          </form>
        </>
      }
    />
  );
}

export default LoginModal;
