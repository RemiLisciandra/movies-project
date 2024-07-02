import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const useQueryState = (key) => {
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get(key) || "");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialValue = urlParams.get(key);
    if (initialValue) {
      setValue(initialValue);
    }
  }, [key]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (value) {
      urlParams.set(key, value);
    } else {
      urlParams.delete(key);
    }
    const newUrl = `${window.location.pathname}${
      urlParams.toString() ? `?${urlParams.toString()}` : ""
    }`;
    window.history.replaceState(null, "", newUrl);
  }, [value, key]);

  return [value, setValue];
};

export default useQueryState;
