"use client";

export const Fieldset = ({ text, children }) => {
  return (
    <fieldset className="border p-4 w-full rounded-lg border-neutral">
      <legend className="bg-base-100">{text}</legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
