import { useState, useEffect } from "react";

const useApiKeyRequired = () => {
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    const getApiKey = () => {
      let storedApiKey = localStorage.getItem("omdbApiKey");

      while (!storedApiKey) {
        const userApiKey = prompt("Please enter your API key to fetch movies");
        if (userApiKey) {
          localStorage.setItem("omdbApiKey", userApiKey);
          storedApiKey = userApiKey;
        }
      }

      setApiKey(storedApiKey);
    };

    if (typeof window !== "undefined") {
      getApiKey();
    }
  }, []);

  return apiKey;
};

export default useApiKeyRequired;
