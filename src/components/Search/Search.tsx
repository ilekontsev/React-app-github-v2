import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { InputProps } from "../../Interfaces/Interfaces";

const Search = (props: InputProps) => {
  const [inputValue, setInputValue] = useState("");

  const debounced = useDebouncedCallback((value) => {
    props.action(value);
  }, 300);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debounced(e.target.value);
  };

  return (
    <input
      aria-label="search-input"
      type="text"
      className={`${props.class} mr-6 flex-grow bg-customBlack border-gray-600 border focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md text-gray-100  px-4`}
      placeholder={props.placeholder}
      onChange={handleInput}
      value={inputValue}
    />
  );
};

export default Search;
