import { useEffect, useState } from "react";

export const useFetchData = (filePath: string) => {
  const [data, setData] = useState<Record<string, unknown>[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (!data) {
        try {
          const response = await fetch(filePath);
          if (!response.ok) {
            throw new Error("Failed to fetch JSON file");
          }
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [filePath, data]);
  return data;
};
