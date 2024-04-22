import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useApi = () => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    if (!url) return; // Do not fetch if URL is not set
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.get(url);
      setData(response.data.data);
    } catch (error) {
      console.error("API fetch error:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, isError, setUrl };
};

export default useApi;
