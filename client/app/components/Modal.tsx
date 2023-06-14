import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type Props = {
  open: boolean;
  body: React.ReactNode;
  title: string;
  onClose: () => void;
};

function Modal({ open, body, title, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>();

  function handleClickOutside(ev: MouseEvent) {
    if (overlayRef.current) {
      if (overlayRef.current.isEqualNode(ev.target as Node)) {
        onClose();
      }
    }
  }

  useEffect(() => {
    if (!open) {
      document.removeEventListener('click', handleClickOutside);
    } else {
      document.addEventListener('click', handleClickOutside);
    }
  }, [open]);

  return (
    open && (
      <div
        className={`flex bg-white/60 fixed inset-0 w-full h-screen items-center justify-center backdrop-blur-[2px]`}
        ref={overlayRef as React.RefObject<HTMLDivElement>}
      >
        <motion.div
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
            dur: 100,
          }}
          className={`relative flex flex-col rounded-xl w-full max-w-[400px] h-max bg-white shadow-md border px-10 pt-5 pb-10`}
        >
          <button className="absolute right-10 top-6" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 stroke-gray-600 hover:stroke-gray-700"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="border-b pb-4 text-[18px]">{title}</h1>
          {body}
        </motion.div>
      </div>
    )
  );
}

export default Modal;
