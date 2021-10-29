import React, { ChangeEvent, useState } from "react";

import { InputProps } from "../../Interfaces/Interfaces";

const Input = (props: InputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    props.action(e.target.value);
  };

  return (
    <input
      type="text"
      className={`${props.class} mr-6 flex-grow bg-customBlack border-gray-600 border focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md text-gray-100  px-4`}
      placeholder={props.placeholder}
      onInput={handleInput}
      value={inputValue}
    />
  );
};
export default Input;
