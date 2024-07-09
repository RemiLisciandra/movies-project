import useSWR from "swr";

const useMovieQuery = (search = null, apiKey) => {
  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await response.json();
      error.status = response.status;
      throw error;
    }
    return response.json();
  };

  const { data, error } = useSWR(
    search ? `http://www.omdbapi.com/?s=${search}&apikey=${apiKey}` : null,
    fetcher
  );

  if (error) {
    console.error("Failed to fetch movies:", error.info);
    if (error.status === 401) {
      console.error("Unauthorized access. Please check your API key.");
    }
  }

  return {
    movies: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useMovieQuery;
