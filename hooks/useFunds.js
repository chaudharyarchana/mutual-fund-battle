import { getAllSchemes } from "@/services/fundService"; //
import { transformSchemeToCard } from "@/utils/transformers"; //
import { useCallback, useEffect, useState } from "react"; //

export const useFunds = (limit = 4) => {
  const [allFunds, setAllFunds] = useState([]); // Master list of all data
  const [displayedFunds, setDisplayedFunds] = useState([]); // Subset shown on UI
  const [loading, setLoading] = useState(true); //
  const [error, setError] = useState(null); //
  const [page, setPage] = useState(1); //
  const [refreshing, setRefreshing] = useState(false); //

  const fetchFunds = async () => {
    try {
      setLoading(true); //
      setError(null); //
      const data = await getAllSchemes(); // One-time fetch for all funds

      const transformed = (Array.isArray(data.data) ? data.data : []).map(
        transformSchemeToCard,
      ); //
      setAllFunds(transformed); //

      // Initialize with the first page (e.g., first 4 items)
      setDisplayedFunds(transformed.slice(0, limit)); //
    } catch (err) {
      setError(err.message || "Failed to fetch funds"); //
    } finally {
      setLoading(false); //
      setRefreshing(false); //
    }
  };

  const loadMore = useCallback(() => {
    // Only load more if the master list has items we haven't displayed yet
    if (displayedFunds.length < allFunds.length) {
      const nextPage = page + 1; //
      const nextRange = nextPage * limit; //

      setDisplayedFunds(allFunds.slice(0, nextRange)); //
      setPage(nextPage); //
    }
  }, [allFunds, displayedFunds, page, limit]);

  const refetch = useCallback(async () => {
    setRefreshing(true); //
    setPage(1); //
    await fetchFunds(); //
  }, []);

  useEffect(() => {
    fetchFunds(); //
  }, []);

  return {
    funds: displayedFunds,
    loading,
    error,
    refetch,
    loadMore,
    hasMore: displayedFunds.length < allFunds.length,
    refreshing,
  };
};
