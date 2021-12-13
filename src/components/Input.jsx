import React from 'react';

const Input = ({ label, name, defaultValue, type, required,labelstyle,inputstyle }) => {
  return (
    <label htmlFor={name} className={labelstyle}>
      <span>{label}</span>
      <input
        required={required}
        type={type}
        name={name}
        className={inputstyle}
        defaultValue={defaultValue}
      />
    </label>
  );
};

export default Input;
