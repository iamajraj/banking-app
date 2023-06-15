import React, { FormEvent, useState } from 'react';
import Modal from './Modal';
import InputField from './InputField';
import { TUser } from '../../utils/queries/getUsers';

type Props = {
  transferUser: TUser | null;
  open: boolean;
  onClose: () => void;
  refetchLoggedInUser: () => void;
  refetchUsers: () => void;
};

function TransferModal({
  transferUser,
  open,
  onClose,
  refetchLoggedInUser,
  refetchUsers,
}: Props) {
  const [code, setCode] = useState('');
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('');

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/transfer-money', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          amount: amount,
          transferId: transferUser?.id,
        }),
      });

      if (!response.ok) {
        const message =
          (await response.json()).message ??
          'Nothing happened wrong just the login was failed';
        throw new Error(message);
      } else {
        setCode('');
        setError('');
        onClose();
        refetchLoggedInUser();
        refetchUsers();
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
      title={`Transfer to ${transferUser?.name}:${transferUser?.id}`}
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
            <InputField
              placeholder="***"
              label="Enter the amount"
              name="amount"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <p className="mt-4 text-[13px] text-red-500">{error}</p>
            <div className="mt-5 flex items-center gap-4">
              <button
                type="submit"
                className="px-6 py-1 border rounded-full text-[15px] cursor-pointer hover:border-gray-400 transition-[border] w-full"
              >
                Transfer
              </button>
            </div>
          </form>
        </>
      }
    />
  );
}

export default TransferModal;
