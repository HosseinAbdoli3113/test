import React from "react";

const InputForm = ({
  label,
  onChange,
  type,
  id,
  classnameLabel,
  name,
  classnameInput,
  value,
  errorMessage,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-sm font-medium leading-6 text-gray-900 undefined ${classnameLabel}`}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          onChange={(e) => onChange(e.target.value)}
          id={id}
          name={name}
          type={type}
          value={value}
          autoComplete="current-password"
          className={`px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${classnameInput}`}
          placeholder={placeholder}
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default InputForm;
