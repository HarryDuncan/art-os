import { useAppDispatch } from "app/redux/store";
import { useEffect } from "react";
import { setSceneConfigs } from "app/redux/scene-data/actions";
export const useAppConfigs = () => {
  const dispatch = useAppDispatch();
  //TODO - toggle test vs production data
  const isTest = true;
  const filePath = `config/scenes${isTest ? ".test" : ""}.json`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error("Failed to fetch JSON file");
        }
        const jsonData = await response.json();
        dispatch(setSceneConfigs(jsonData));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [filePath]);
};
