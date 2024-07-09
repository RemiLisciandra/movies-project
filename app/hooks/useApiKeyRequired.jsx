import { useState, useEffect } from "react";

const useApiKeyRequired = () => {
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    const getApiKey = () => {
      const storedApiKey = localStorage.getItem("omdbApiKey");

      if (!storedApiKey) {
        const userApiKey = prompt("Please enter your API key to fetch movies");
        if (userApiKey) {
          localStorage.setItem("omdbApiKey", userApiKey);
          setApiKey(userApiKey);
        }
      } else {
        setApiKey(storedApiKey);
      }
    };

    if (typeof window !== "undefined") {
      getApiKey();
    }
  }, []);

  return apiKey;
};

export default useApiKeyRequired;
