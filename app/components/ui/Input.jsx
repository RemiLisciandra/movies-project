"use client";

export const Input = ({ type, className = "", name, ...props }) => {
  return <input className={className} type={type} name={name} {...props} />;
};

export default Input;
