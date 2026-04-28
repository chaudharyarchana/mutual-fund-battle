import { searchSchemes } from "@/services/fundService";
import { useEffect, useState } from "react";

export const useSearch = (query) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await searchSchemes(query);
        setSearchResults(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce as required

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return { searchResults, isSearching };
};
