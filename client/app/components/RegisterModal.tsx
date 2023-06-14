import React, { FormEvent, useState } from 'react';
import Modal from './Modal';
import InputField from './InputField';

type Props = {
  open: boolean;
  onClose: () => void;
};

function RegisterModal({ open, onClose }: Props) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      if (!response.ok) {
        const message =
          (await response.json()).message ??
          'Nothing happened wrong just the registration was failed';
        throw new Error(message);
      } else {
        const code = await response.json();
        setCode(code.code);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Modal
      open={open}
      title="Register"
      onClose={() => {
        setError('');
        setName('');
        setCode('');
        onClose();
      }}
      body={
        <>
          {code ? (
            <p className="mt-3">
              Please save this <i>access code</i> this will not show again
              <br />
              <code className="bg-gray-100 mt-2 block w-max">{code}</code>
            </p>
          ) : (
            <form onSubmit={register} className="mt-5">
              <InputField
                placeholder="e.g raaj"
                label="Enter your name"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <p className="mt-4 text-[13px] text-red-500">{error}</p>
              <div className="mt-5 flex items-center gap-4">
                <button
                  type="submit"
                  className="px-6 py-1 border rounded-full text-[15px] cursor-pointer hover:border-gray-400 transition-[border] w-full"
                >
                  Register
                </button>
              </div>
            </form>
          )}
        </>
      }
    />
  );
}

export default RegisterModal;
