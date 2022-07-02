import { StaticBackgroundContainer } from "./StaticBackground.styles"
import React from 'react'

interface StaticBackgroundProps {

}
export const StaticBackground = () => {
    return <StaticBackgroundContainer   $backgroundUrl={`url(../assets/textures/MarshBg.jpg)`}  />
}