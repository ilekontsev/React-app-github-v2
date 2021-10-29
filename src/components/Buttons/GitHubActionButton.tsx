import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { ActionButtonProps } from "../../Interfaces/Interfaces";

const GitHubActionButton = (props: ActionButtonProps) => {
  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <Menu as="div" className="relative inline-block text-left mr-2">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-customGray text-sm font-medium text-gray-400 hover:border-gray-200  ">
              {props.title}
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition show={open} as={Fragment}>
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                {props.options?.length &&
                  props.options.map((item, index) => (
                    <Menu.Item key={item + index}>
                      {({ active }) => (
                        <p
                          onClick={() => props.action(item)}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {item}
                        </p>
                      )}
                    </Menu.Item>
                  ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default GitHubActionButton;
