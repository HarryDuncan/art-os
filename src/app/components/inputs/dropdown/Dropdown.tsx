import React, { useState } from "react";

interface Option {
  id: number;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (selectedOption: Option) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : "Select an option"}
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li key={option.id} onClick={() => handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
