"use client";

import { useEffect, useState } from "react";
import { SearchInput } from "./components/input/SearchInput";
import { Message } from "./components/message/Message";
import { useQueryState } from "nuqs";
import useDebounceValue from "./hooks/useDebounceValue";
import useApiKeyRequired from "./hooks/useApiKeyRequired";

export default function Home() {
  const [searchValue, setSearchValue] = useQueryState("search");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const debounceValue = useDebounceValue(searchValue, 500);
  const apiKey = useApiKeyRequired();

  useEffect(() => {
    if (!apiKey) {
      setError("Error : Failed to fetch API key");
      return;
    }

    if (debounceValue === null || debounceValue.length < 3) {
      setError("Error : Please enter at least 3 characters");
      setUrl("");
      return;
    }

    setError("");
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const searchParam = debounceValue
      ? `?search=${encodeURIComponent(debounceValue).replace(/%20/g, "+")}`
      : "";
    setUrl(`${baseUrl}${searchParam}`);
  }, [debounceValue, apiKey]);

  return (
    <div className="min-h-full">
      <div className="flex flex-col min-h-full py-8 gap-4 items-start m-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-center w-full">MoveFinder</h1>
        <SearchInput
          name="search"
          title="Search"
          value={searchValue || ""}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {error ? <Message text={error} /> : <Message text={`URL: ${url}`} />}
      </div>
    </div>
  );
}
