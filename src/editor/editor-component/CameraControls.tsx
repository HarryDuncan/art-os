import React, { useState } from "react";
import { Stack, Slider, Dropdown, IDropdownOption } from "@fluentui/react";

// Define options for camera axes
const axisOptions: IDropdownOption[] = [
  { key: "x", text: "X" },
  { key: "y", text: "Y" },
  { key: "z", text: "Z" },
];

export const CameraControls = ({
  cameraPosition,
  setCameraPosition,
  zoom,
  setZoom,
}) => {
  const [selectedAxis, setSelectedAxis] = useState("x");

  const onPositionChange = (value: number) => {
    setCameraPosition((prev) => ({ ...prev, [selectedAxis]: value }));
  };

  const onAxisChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ) => {
    if (option) {
      setSelectedAxis(option.key as string);
    }
  };

  const onZoomChange = (value: number) => {
    setZoom(value);
  };

  return (
    <Stack tokens={{ childrenGap: 20 }}>
      <h2>Camera Controls</h2>

      <Dropdown
        label="Select Axis"
        options={axisOptions}
        selectedKey={selectedAxis}
        onChange={onAxisChange}
      />
      <Slider
        label={`Camera Position (${selectedAxis.toUpperCase()})`}
        min={-100}
        max={100}
        step={1}
        value={cameraPosition[selectedAxis]}
        onChange={onPositionChange}
        showValue
      />

      <Slider
        label="Zoom"
        min={10}
        max={100}
        step={1}
        value={zoom}
        onChange={onZoomChange}
        showValue
      />
    </Stack>
  );
};
