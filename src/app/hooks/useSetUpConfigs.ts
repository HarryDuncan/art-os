import { ROOT } from "app/constants";
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

const DEFAULT_CONFIG_URL = "config/scenes.json";
const BARBA_URL = "config/scenes.barba.json";
const BLACKOUT_URL = "config/scenes.blackout.json";
const LTW_URL = "config/scenes.ltw.json";
export const useAppConfigs = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const retrieveAppData = async () => {
      const sceneConfigsUrl = `${ROOT}${BLACKOUT_URL}`;
      const sceneConfigs = await fetchData(sceneConfigsUrl);
      dispatch(setSceneConfigs(sceneConfigs));
      const defaultSceneConfigsUrl = `${ROOT}config/defaults/scenes.json`;
      const defaultScenes = await fetchData(defaultSceneConfigsUrl);
      dispatch(setDefaultSceneConfigs(defaultScenes));
    };
    retrieveAppData();
  }, []);
};
