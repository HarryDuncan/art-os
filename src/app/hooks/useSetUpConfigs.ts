import {
  setDefaultSceneConfigs,
  setSceneConfigs,
} from "app/redux/scene-data/actions";
import { useAppDispatch } from "app/redux/store";
import { useEffect } from "react";

const fetchData = async (filePath: string) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Failed to fetch JSON file");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(error);
  }
};

export const useAppConfigs = () => {
  const dispatch = useAppDispatch();
  // TODO - toggle test vs production data
  const isTest = true;

  useEffect(() => {
    const retrieveAppData = async () => {
      const sceneConfigsUrl = `config/scenes${isTest ? ".test" : ""}.json`;
      const sceneConfigs = await fetchData(sceneConfigsUrl);
      dispatch(setSceneConfigs(sceneConfigs));
      const defaultSceneConfigsUrl = "configs/defaults/scenes.json";
      const defaultScenes = await fetchData(defaultSceneConfigsUrl);
      dispatch(setDefaultSceneConfigs(defaultScenes));
    };
    retrieveAppData();
  }, []);
};
