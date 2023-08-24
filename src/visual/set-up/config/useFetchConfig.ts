import { useEffect, useState } from "react";
import { SceneConfig } from "./config.types";
import { useAssetLocation } from "visual/compat/asset-location/useAssetLocation";

export const useFetchConfig = (filePath: string) => {
  const [data, setData] = useState<SceneConfig[] | null>(null);
  const configuredData = useAssetLocation(data);
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
  return configuredData;
};
