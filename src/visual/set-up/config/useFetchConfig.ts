import { useEffect, useState } from "react";
import { SceneDataConfig } from "./config.types";
import { DEFAULT_CONFIG } from "./config.constants";

export const useFetchConfig = (filePath: string) => {
  const [data, setData] = useState<SceneDataConfig[]>([DEFAULT_CONFIG]);
  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, [filePath]);

  return data;
};
