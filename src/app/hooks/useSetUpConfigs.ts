import { ROOT } from "app/constants";
import {
  setDefaultSceneConfigs,
  setSceneConfigs,
} from "app/redux/scene-data/actions";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import { useEffect, useMemo } from "react";

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

const WORK_SPACES = [
  { id: "barba", text: "Barba", url: "scenes.barba.json" },
  { id: "hjd-art", text: "HJD Experiments", url: "scenes.experiments.json" },
  { id: "hjd-website", text: "HJD Production", url: "scenes.production.json" },
  { id: "blackout", text: "Blackout", url: "scenes.blackout.json" },
  { id: "others", text: "Others", url: "scenes.others.json" },
];

export const useAppConfigs = () => {
  const dispatch = useAppDispatch();
  const { workspaceId } = useAppSelector((state) => state.sceneData);
  const workspaceConfig = useMemo(
    () => WORK_SPACES.find((workspace) => workspaceId === workspace.id),
    [workspaceId]
  );
  useEffect(() => {
    const retrieveAppData = async () => {
      const sceneConfigsUrl = `${ROOT}config/${workspaceConfig?.url ??
        "scenes.experiments.json"}`;
      const sceneConfigs = await fetchData(sceneConfigsUrl);
      dispatch(setSceneConfigs(sceneConfigs));
      const defaultSceneConfigsUrl = `${ROOT}config/defaults/scenes.json`;
      const defaultScenes = await fetchData(defaultSceneConfigsUrl);
      dispatch(setDefaultSceneConfigs(defaultScenes));
    };
    retrieveAppData();
  }, [workspaceConfig]);
};
