import { useMemo } from "react"
import { SceneConfig } from "visual/set-up/config/config.types"

export const EditorContent = (sceneConfig: SceneConfig) => {
    const {meshComponentConfigs} = sceneConfig
    
    return useMemo(() => {
        return {...sceneConfig}
    },[sceneConfig])
}