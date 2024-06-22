import * as React from "react";
import {
  Dropdown as FluentUiDropdown,
  IDropdownStyles,
  IDropdownOption,
  DropdownMenuItemType,
  IDropdownProps,
} from "@fluentui/react/lib/Dropdown";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

interface DropdownProps {
  options: IDropdownOption[];
  value?: string;
  placeholder?: string;
  label?: string;
  onSelect: (value: string) => void;
}

export const Dropdown: React.FunctionComponent<DropdownProps> = ({
  options,
  value,
  placeholder,
  label,
  onSelect,
}) => {
  const handleChange = (
    _event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ): void => {
    if (option) {
      onSelect(option.key as string);
    }
  };

  return (
    <FluentUiDropdown
      selectedKey={value}
      placeholder={placeholder}
      label={label ?? ""}
      options={options}
      onChange={handleChange}
      styles={dropdownStyles}
    />
  );
};
