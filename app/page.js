"use client";

import { useEffect, useState } from "react";
import { SearchInput } from "./components/input/SearchInput";
import { Message } from "./components/message/Message";
import { useQueryState } from "nuqs";
import useDebounceValue from "./hooks/useDebounceValue";
import useApiKeyRequired from "./hooks/useApiKeyRequired";
import useMovieQuery from "./hooks/useMovieQuery";
import Image from "next/image";
import Spinner from "./components/loading/Spinner";

export default function Home() {
  const [searchValue, setSearchValue] = useQueryState("search");
  const [statusMessage, setStatusMessage] = useState("");
  const debounceValue = useDebounceValue(searchValue, 500);
  const apiKey = useApiKeyRequired();

  const { movies, isLoading, isError } = useMovieQuery(debounceValue, apiKey);

  useEffect(() => {
    const updateState = () => {
      if (!apiKey) {
        setStatusMessage("Error: Failed to fetch API key");
        return;
      }

      if (!debounceValue || debounceValue.length < 3) {
        setStatusMessage("Error: Please enter at least 3 characters");
        return;
      }

      if (isError) {
        setStatusMessage("Error: Failed to fetch movies");
        return;
      }

      if (!movies || !movies.Search || movies.Search.length === 0) {
        setStatusMessage(`No results found for "${debounceValue}"`);
        return;
      }

      setStatusMessage("");
    };

    updateState();
  }, [debounceValue, apiKey, isError, isLoading, movies]);

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
        {statusMessage && <Message text={statusMessage} />}
        {debounceValue?.length >= 3 && isLoading ? (
          <Spinner />
        ) : (
          <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {movies?.Search?.map((movie, index) => (
              <div key={movie.imdbID}>
                <Image
                  src={movie.Poster !== "N/A" ? movie.Poster : "/default.png"}
                  alt="poster"
                  width={200}
                  height={300}
                  priority={index === 0}
                  className="w-full h-auto"
                />
                <p className="text-white">{movie.Title}</p>
                <div className="text-gray-300">
                  <span>{`${movie.Year} | ${movie.Type}`}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
