import { useEffect, useState } from "react";

const useDebounceValue = (value, time = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, time);

    return () => clearTimeout(handler);
  }, [value, time]);

  return debouncedValue;
};

export default useDebounceValue;
