import React from "react";

import { ButtonProps } from "../../Interfaces/Interfaces";

const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.action}
      className={`inline-flex ml-4  items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white ${props.class}`}
    >
      {props.title}
    </button>
  );
};

export default Button;
