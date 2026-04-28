import { getAllSchemes } from "@/services/fundService";
import { transformSchemeToCard } from "@/utils/transformers";
import { useCallback, useEffect, useState } from "react";

export const useFunds = (limit = 4) => {
  const [allFunds, setAllFunds] = useState([]); 
  const [displayedFunds, setDisplayedFunds] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [page, setPage] = useState(1); 
  const [refreshing, setRefreshing] = useState(false); 

  const fetchFunds = async () => {
    try {
      setLoading(true); 
      setError(null); 
      const data = await getAllSchemes(); 

      const transformed = (Array.isArray(data.data) ? data.data : []).map(
        transformSchemeToCard,
      ); 
      setAllFunds(transformed); 

      setDisplayedFunds(transformed.slice(0, limit)); 
    } catch (err) {
      setError(err.message || "Failed to fetch funds"); 
    } finally {
      setLoading(false); 
      setRefreshing(false); 
    }
  };

  const loadMore = useCallback(() => {
    if (displayedFunds.length < allFunds.length) {
      const nextPage = page + 1; 
      const nextRange = nextPage * limit; 

      setDisplayedFunds(allFunds.slice(0, nextRange)); 
      setPage(nextPage); 
    }
  }, [allFunds, displayedFunds, page, limit]);

  const refetch = useCallback(async () => {
    setRefreshing(true); 
    setPage(1); 
    await fetchFunds(); 
  }, []);

  useEffect(() => {
    fetchFunds(); 
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
