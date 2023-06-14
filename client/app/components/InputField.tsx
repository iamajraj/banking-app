import React, { ChangeEvent } from 'react';

type Props = {
  placeholder?: string;
  label?: string;
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
};

function InputField({ label, name, onChange, placeholder, value }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <label>{label}</label>
      <input
        type="text"
        onChange={onChange}
        name={name}
        value={value}
        placeholder={placeholder}
        className="border rounded-md py-3 px-3 w-full outline-none"
      />
    </div>
  );
}

export default InputField;
