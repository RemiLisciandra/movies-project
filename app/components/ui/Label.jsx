"use client";

export const Label = ({ children }) => {
  return (
    <label className="input input-bordered flex items-center gap-2">
      {children}
    </label>
  );
};

export default Label;
