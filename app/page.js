"use client";

import { useEffect, useState } from "react";
import { SearchInput } from "./components/input/SearchInput";
import { Message } from "./components/message/Message";
import { useQueryState } from "nuqs";

export default function Home() {
  const [name, setName] = useQueryState("search");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const searchParam = name ? `?search=${name}` : "";
    setUrl(`${baseUrl}${searchParam}`);
  }, [name]);

  return (
    <div className="min-h-full">
      <div className="flex flex-col min-h-full py-8 gap-4 items-start m-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-center w-full">MoveFinder</h1>
        <SearchInput
          name="search"
          title="Search"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <Message text={`URL : ${url}`} />
      </div>
    </div>
  );
}
